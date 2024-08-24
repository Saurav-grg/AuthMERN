const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const genTokenAndSetCookie = require('../utils/genTokenAndSetCookie');

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
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    genTokenAndSetCookie(res, newUser._id);
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
module.exports = {
  signup,
};
