const vehicleType = require("../models/vehicleType");

const getAllVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await vehicleType.find({});
    res.status(200).json(vehicleTypes);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getVehicleTypeById = async (req, res) => {
  try {
    const vehicleTypeId = await vehicleType.findById(req.params.id);
    res.status(200).json(vehicleTypeId);
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
    res.status(200).json(`Vehicle type {${name}} added!`);
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
    res.status(200).json(`Vehicle type {${vehicleTypeId.name}} updated!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const deleteVehicleType = async (req, res) => {
  try {
    const vehicleTypeId = await vehicleType.findByIdAndDelete(req.params.id);
    res.status(200).json("Vehicle type deleted!");
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
