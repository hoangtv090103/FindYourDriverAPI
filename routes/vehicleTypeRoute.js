const express = require('express');

const vehicleTypeController = require('../controllers/vehicleTypeController');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('In the vehicleType route!');
  next();
}, vehicleTypeController.getAllVehicleTypes);

router.get('/:id', vehicleTypeController.getVehicleTypeById);
router.post('/', vehicleTypeController.addVehicleType);
router.put('/:id', vehicleTypeController.updateVehicleType);
router.delete('/:id', vehicleTypeController.deleteVehicleType);

module.exports = router;
