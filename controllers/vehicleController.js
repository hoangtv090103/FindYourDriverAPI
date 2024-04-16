const Vehicle = require("../models/vehicle");

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicleId = await Vehicle.findById(req.params.id);
    res.status(200).json(vehicleId);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const addVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle({
      typeId: req.body.typeId,
      licensePlate: req.body.licensePlate,
      make: req.body.make,
      model: req.body.model,
      color: req.body.color,
    });
    await vehicle.save();
    res.status(200).json(`Vehicle {${vehicle.licensePlate}} added!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
