const express = require("express");

const router = express.Router();

const { findDriverController } = require("../controllers/findDriverController");
router.post("/", findDriverController);

module.exports = router;
