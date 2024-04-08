const express = require('express');

const router = express.Router();

const findDriverController = require('../controllers/findDriverController');
router.get('/', findDriverController.findDriver);

module.exports = router;