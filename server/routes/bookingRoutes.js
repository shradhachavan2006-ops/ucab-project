const express = require('express');
const router = express.Router();
const {
  bookCab,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  getStats,
} = require('../controllers/bookingController');
const { authUser, authAdmin } = require('../middlewares/authMiddleware');

router.get('/stats', authAdmin, getStats);
router.get('/my', authUser, getMyBookings);
router.get('/', authAdmin, getAllBookings);
router.get('/:id', authUser, getBookingById);
router.post('/', authUser, bookCab);
router.put('/:id', authAdmin, updateBookingStatus);
router.put('/:id/cancel', authUser, cancelBooking);

module.exports = router;
