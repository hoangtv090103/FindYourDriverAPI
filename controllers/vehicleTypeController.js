const vehicleType = require("../models/vehicleType");

const getAllVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await vehicleType.find({});
    res.json(vehicleTypes);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getVehicleTypeById = async (req, res) => {
  try {
    const vehicleTypeId = await vehicleType.findById(req.params.id);
    res.json(vehicleTypeId);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const addVehicleType = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newVehicleType = new vehicleType({
      name,
      description,
    });

    await newVehicleType.save();
    res.json("Vehicle type added!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateVehicleType = async (req, res) => {
  try {
    const vehicleTypeId = await vehicleType.findById(req.params.id);
    vehicleTypeId.name = req.body.name;
    vehicleTypeId.description = req.body.description;
    vehicleTypeId.save();
    res.json("Vehicle type updated!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const deleteVehicleType = async (req, res) => {
  try {
    const vehicleTypeId = await vehicleType.findById(req.params.id);
    vehicleTypeId.delete();
    res.json("Vehicle type deleted!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

module.exports = {
  getAllVehicleTypes,
  getVehicleTypeById,
  addVehicleType,
  updateVehicleType,
  deleteVehicleType,
};
