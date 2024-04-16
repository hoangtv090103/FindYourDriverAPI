const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");
/**
 * Async function to find a driver based on pickup and dropoff locations.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Array} an array of drivers sorted by distance
 */
const findDriverController = async (req, res) => {
  try {
    const { pickupLat, pickupLng } = req.body;
    const { vehicleType } = req.body;

    if (!pickupLat || !pickupLng) {
      return res.status(400).json("Pickup location is required");
    }

    const vehicleTypeId = await Vehicle.find({
      name: vehicleType,
    });

    const vehicles = await Vehicle.find({
      vehicleTypeId: vehicleTypeId._id,
    });

    if (!vehicles) {
      return res.status(400).json("No vehicle found");
    }

    const drivers = await Driver.find({
      available: true,
      vehicleId: { $in: vehicles },
    });

    if (!drivers) {
      return res.status(400).json("No driver found");
    }

    const distList = drivers.map((driver) => {
      const distance = calculateDistance(
        pickupLat,
        pickupLng,
        driver.latitude,
        driver.longitude
      );

      return {
        driver,
        distance,
      };
    });

    // return the nearest driver
    distList.sort((a, b) => a.distance - b.distance);
    res.status(200).json(distList[0].driver);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

/**
 * Calculate the distance between two points on the Earth given their latitude and longitude coordinates.
 *
 * @param {number} lat1 - The latitude of the first point
 * @param {number} lon1 - The longitude of the first point
 * @param {number} lat2 - The latitude of the second point
 * @param {number} lon2 - The longitude of the second point
 * @param {string} unit - The unit of measurement for the distance (e.g., "K" for kilometers, "N" for nautical miles)
 * @return {number} The calculated distance between the two points
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  // dist = =acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371 (6371 is Earth radius in km.)

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  return dist;
};

module.exports = { findDriverController };
