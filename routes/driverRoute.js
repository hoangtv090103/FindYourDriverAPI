const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driverController');

router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);
router.post('/add', driverController.addDriver);
router.put('/update/:id', driverController.updateDriver);
router.delete('/delete/:id', driverController.deleteDriver);

module.exports = router;
