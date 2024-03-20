const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  licensePlate: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
