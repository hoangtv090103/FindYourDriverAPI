const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  defaultAddress: String,
  latitude: Number,
  longitude: Number
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
