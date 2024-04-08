const express = require('express');

const router = express.Router();

const driverController = require('../controllers/driverController');
const customerController = require('../controllers/customerController');

// Tracking Driver
router.get('/driver/:id', driverController.getDriverLocation);
router.put('/driver', driverController.updateDriverLocation);

// Tracking Customer
router.get('/customer/:id', customerController.getCustomerLocation);
router.put('/customer', customerController.updateCustomerLocation);

module.exports = router;
