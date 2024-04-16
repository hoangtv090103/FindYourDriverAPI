const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  typeId: {
    type: Schema.Types.ObjectId,
    ref: "VehicleType",
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
