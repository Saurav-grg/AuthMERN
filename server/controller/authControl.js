const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = {
  signup,
};
