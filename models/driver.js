const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  licenseNumber: { // Số bằng lái
    type: String,
    required: true,
    unique: true
  },
  state: { // Tài xế có thể ở trạng thái "available" hoặc "unavailable"
    type: String,
    required: true
  },
  rating: { // Đánh giá của khách hàng
    type: Number,
    default: 0
  },
  latitude: Number, // Vĩ độ
  longitude: Number, // Kinh độ
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
