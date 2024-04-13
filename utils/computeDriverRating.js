const Driver = require("../models/driver");
const Rating = require("../models/rating");

module.exports = {
  computeDriverRating: async (driverId) => {
    try {
      const driver = await Driver.findById(driverId);
      const ratings = await Rating.find({ driverId: driver._id });
      if (!ratings) {
        return 0;
      }
      let totalRating = 0;
      for (const rating of ratings) {
        totalRating += rating.rating;
      }
      const averageRating = totalRating / ratings.length;

      driver.rating = averageRating;
      driver.save();

      return averageRating;
    } catch (err) {
      console.log(err);
    }
  },
};
