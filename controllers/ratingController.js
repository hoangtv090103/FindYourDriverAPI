const Rating = require("../models/rating");

const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    res.status(200).json(rating);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const addRating = async (req, res) => {
  const newRating = new Rating({
    userId: req.body.userId,
    driverId: req.body.driverId,
    bookingId: req.body.bookingId,
    rating: req.body.rating,
    comment: req.body.comment,
    ratingTime: req.body.ratingTime,
  });
  try {
    const savedRating = await newRating.save();

    res.status(200).json(savedRating);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateRating = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    rating.userId = req.body.userId;
    rating.driverId = req.body.driverId;
    rating.bookingId = req.body.bookingId;
    rating.rating = req.body.rating;
    rating.comment = req.body.comment;
    rating.ratingTime = req.body.ratingTime;
    rating.save();
    res.status(200).json(rating);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.json("Rating deleted!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

module.exports = {
  getAllRatings,
  getRatingById,
  addRating,
  updateRating,
  deleteRating,
};
