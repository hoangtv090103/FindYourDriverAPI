const Driver = require("../models/driver");
const User = require("../models/user");
const { computeDriverRating } = require("../utils/computeDriverRating");
const { hashPassword } = require("../utils/hashPassword");

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.status(200).json(drivers);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(Number.parseInt(req.params.id));
    res.status(200).json(driver);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const addDriver = async (req, res) => {
  let user;
  try {
    if (!req.body.userId) {
      const newUser = new User({
        email: req.body.email,
        phone: req.body.phone,
        password: await hashPassword(req.body.password),
        isDriver: true,
      });
      user = await newUser.save();
    } else {
      user = await User.findById(req.body.userId).catch((err) => {
        res.status(400).json(`Error: ${err}`);
      });
    }

    const { fullName, licenseNumber } = req.body;

    const newDriver = new Driver({
      fullName: fullName,
      licenseNumber: licenseNumber,
      userId: user._id,
    });

    await newDriver.save();
    res.status(200).json(`Driver {${fullName}} added!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(`Driver {${driver.fullName}} updated!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.status(200).json("Driver deleted!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getDriverLocation = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.status(200).json({
      latitude: driver.latitude,
      longitude: driver.longitude,
    });
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateDriverLocation = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    driver.latitude = req.body.latitude;
    driver.longitude = req.body.longitude;
    driver.save();
    res.status(200).json(`Driver ${driver.fullName} location updated!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getDriverRatings = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    computeDriverRating(driver._id);

    res.status(200).json(driver);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  addDriver,
  updateDriver,
  deleteDriver,
  getDriverLocation,
  updateDriverLocation,
  getDriverRatings,
};
