const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/userModel');
const genTokenAndSetCookie = require('../utils/genTokenAndSetCookie');
const admin = require('../firebase/firebase');

const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} = require('../mailtrap/emails');

//sign up
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      throw new Error('User already exists');
    }
    //hash pass and generate token to send in email
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    //store user in db
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      authProvider: 'email',
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    genTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log('error in verifyEmail ', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error('All fields are required');
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }

    genTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log('Error in login ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    console.log('Error in forgotPassword ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid or expired reset token' });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.log('Error in resetPassword ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log('Error in checkAuth ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const google = async (req, res) => {
  try {
    // Verify the ID token
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // The token is valid. The user's UID and email can be trusted.
    const { uid, email, name, picture } = decodedToken;

    // Look for an existing user
    let user = await User.findOne({ email: email });

    if (user) {
      // Update user information if necessary
      user.lastLogin = new Date();
      if (!user.firebaseUID) {
        user.firebaseUID = uid;
      }
      await user.save();
    } else {
      // Create a new user
      user = new User({
        username:
          name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: email,
        firebaseUID: uid,
        profilePicture: picture,
        isVerified: true,
        authProvider: 'google',
      });
      await user.save();
    }

    // Generate token and set cookie
    genTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: user.isNew
        ? 'User created successfully'
        : 'Logged in successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error('Google authentication error:', error);
    res
      .status(400)
      .json({ success: false, message: 'Google authentication failed' });
  }
};
module.exports = {
  signup,
  verifyEmail,
  logout,
  login,
  forgotPassword,
  resetPassword,
  checkAuth,
  google,
};
