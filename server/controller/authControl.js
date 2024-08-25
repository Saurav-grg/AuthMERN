const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const genTokenAndSetCookie = require('../utils/genTokenAndSetCookie');
const {
  sendVerificationEmail,
  sendWelcomeEmail,
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
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    genTokenAndSetCookie(res, newUser._id);
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      newUser: {
        ...newUser._doc,
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

    generateTokenAndSetCookie(res, user._id);

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
module.exports = {
  signup,
  verifyEmail,
  logout,
  login,
};
