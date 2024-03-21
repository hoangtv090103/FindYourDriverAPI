const mongoose = require('mongoose');

const connect = async () => {
  try {
    const connectionStr = `mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`;

    console.log(connectionStr);

    await mongoose.connect(connectionStr);

    console.log('Connected to the database');
  } catch (err) {
    console.log('Error: ' + err);
  }
};

module.exports = { connect };
