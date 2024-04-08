const Vehicle = require("../models/vehicle");

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicleId = await Vehicle.findById(req.params.id);
    res.json(vehicleId);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const addVehicle = async (
  { body: { vehicleType: type, plateNumber: plate, driverId: driver } },
  res
) => {
  try {
    const newVehicle = new Vehicle({ type, plate, driver });
    await newVehicle.save();
    res.json("Vehicle added!");
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`);
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        vehicleType: req.body.vehicleType,
        plateNumber: req.body.plateNumber,
        driverId: req.body.driverId,
      },
      { new: true } // định dạng true để trả về đối tượng đã được cập nhật
    );
    res.json("Vehicle updated!");
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`);
  }
};

const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json("Vehicle deleted!");
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
