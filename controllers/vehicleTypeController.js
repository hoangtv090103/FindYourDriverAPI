const vehicleType = require('../models/vehicleType');

const getAllVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await vehicleType.find({});
    res.json(vehicleTypes);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

const getVehicleTypeById = async (req, res) => {
  try {
    const vehicleType = await vehicleType.findById(req.params.id);
    res.json(vehicleType);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
}

const addVehicleType = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newVehicleType = new vehicleType({
      name,
      description
    });

    await newVehicleType.save();
    res.json('Vehicle type added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
}

const updateVehicleType = async (req, res) => {
  try {
    const vehicleType = await vehicleType.findById(req.params.id);
    vehicleType.name = req.body.name;
    vehicleType.description = req.body.description;
    vehicleType.save();
    res.json('Vehicle type updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
}

const deleteVehicleType = async (req, res) => {
  try {
    const vehicleType = await vehicleType.findById(req.params.id);
    vehicleType.delete();
    res.json('Vehicle type deleted!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  getAllVehicleTypes,
  getVehicleTypeById,
  addVehicleType,
  updateVehicleType,
  deleteVehicleType
};
