// const express = require("express");
// const router = express.Router();

// router.post("/", (req, res) => {
//   const { userId, latitude, longitude, isDriver } = req.body;

//   if (!userId || !latitude || !longitude) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields",
//     });
//   }

//   if (isDriver) {
//     Driver.findOneAndUpdate(
//       { userId },
//       { latitude, longitude },
//       { new: true },
//       (err, driver) => {
//         if (err) {
//           return res.status(400).json({
//             success: false,
//             message: "Error updating driver location",
//           });
//         }

//         if (!driver) {
//           return res.status(400).json({
//             success: false,
//             message: "Driver not found",
//           });
//         }

//         return res.status(200).json({
//           success: true,
//           message: "Driver location updated",
//         });
//       }
//     );
//   }

//   Customer.findOneAndUpdate(
//     { userId },
//     { latitude, longitude },
//     { new: true },
//     (err, customer) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//           message: "Error updating customer location",
//         });
//       }

//       if (!customer) {
//         return res.status(400).json({
//           success: false,
//           message: "Customer not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Customer location updated",
//       });
//     }
//   );
// });

// route.post("/get-driver-location", (req, res) => {
//   const { driverId } = req.body;

//   if (!driverId) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields",
//     });
//   });

//   Driver.findById(driverId, (err, driver) => {
//     if (err) {
//       return res.status(400).json({
//         success: false,
//         message: "Error getting driver location",
//       });
//     }

//     if (!driver) {
//       return res.status(400).json({
//         success: false,
//         message: "Driver not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       latitude: driver.latitude,
//       longitude: driver.longitude,
//     });
//   });
  

// module.exports = router;
