const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/add', bookingController.addBooking);
router.put('/update/:id', bookingController.updateBooking);
router.delete('/delete/:id', bookingController.deleteBooking);

module.exports = router;
