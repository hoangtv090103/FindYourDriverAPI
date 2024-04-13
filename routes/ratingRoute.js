const ratingController = require("../controllers/ratingController");

const express = require("express");

const router = express.Router();

router.get("/", ratingController.getAllRatings);
router.get("/:id", ratingController.getRatingById);
router.post("/", ratingController.addRating);
router.put("/:id", ratingController.updateRating);
router.delete("/:id", ratingController.deleteRating);

module.exports = router;