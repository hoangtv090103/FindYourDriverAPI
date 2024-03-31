const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driverController');

router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);
router.post('/', driverController.addDriver);
router.put('/:id', driverController.updateDriver);
router.delete('/:id', driverController.deleteDriver);

module.exports = router;
