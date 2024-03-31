const Driver = require('../models/driver');
const User = require('../models/user');

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.json(drivers);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.json(driver);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const addDriver = async (req, res) => {
  try {

    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password

    });

    await user.save();

    const { licenseNumber } = req.body;

    const newDriver = new Driver({
      userId: user._id,
      licenseNumber: licenseNumber
    });

    await newDriver.save();
    res.json('Driver added!');
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    driver.userId = req.body.userId;
    driver.defaultAddress = req.body.defaultAddress;
    driver.save();
    res.json('Driver updated!');
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json('Driver deleted!');
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const getDriverLocation = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.json({
      latitude: driver.latitude,
      longitude: driver.longitude
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
    res.json('Driver location updated!');
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
  updateDriverLocation
};
