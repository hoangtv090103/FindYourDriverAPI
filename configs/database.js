const mongoose = require('mongoose');

const connect = async () => {
  try {
    const connectionStr = process.env.MONGO_URI;

    console.log(connectionStr);

    await mongoose.connect(connectionStr);

    console.log('Connected to the database');
  } catch (err) {
    console.log('Error: ' + err);
  }
};

module.exports = { connect };
