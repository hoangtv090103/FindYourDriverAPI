const User = require("../models/user");
const Customer = require("../models/customer");
const Driver = require("../models/driver");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { phoneEmail, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: phoneEmail }, { phone: phoneEmail }],
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or phone is wrong",
      });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        success: false,
        message: "Password is wrong",
      });
    }

    const data = {
      success: true,
      userId: user._id,
      isDriver: user.isDriver,
    };

    if (user.isDriver) {
      const driver = await Driver.findOne({ userId: user._id });
      data.driver = driver || null;
    } else {
      const customer = await Customer.findOne({ userId: user._id });
      data.customer = customer || null;
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: `Error: ${err}` });
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
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json(`User {${fullName}} added!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

module.exports = {
  login,
  register,
};
