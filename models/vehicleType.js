const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleTypeSchema = new Schema({
  type: {
    type: String,
    required: true
  }
});

const VehicleType = mongoose.model('VehicleType', vehicleTypeSchema);

module.exports = VehicleType;
