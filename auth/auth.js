const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    console.log("Logging in");
    const { email, phone, password } = req.body;
    const user = await User.findOne
      ({
        $or: [{ email: email }, { phone: phone }]
      });
    if (!user) {
      return res.status(400).json('Email or phone is wrong');
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json('Password is wrong');
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    console.log(token);
    res.header('auth-token', token).json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
};

const register = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    fullName,
    email,
    phone,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.json('User added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  login,
  register
};
