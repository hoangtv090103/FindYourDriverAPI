const express = require('express');

const vehicleTypeController = require('../controllers/vehicleTypeController');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('In the vehicleType route!');
  next();
}, vehicleTypeController.getAllVehicleTypes);

module.exports = router;
