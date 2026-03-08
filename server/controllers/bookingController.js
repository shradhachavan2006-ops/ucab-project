const Booking = require('../models/MyBookingSchema');
const Car = require('../models/CarSchema');

// Simple fare estimator (base fare + per km)
const estimateFare = (pricePerKm, distance) => {
  const baseFare = 30;
  return Math.round(baseFare + pricePerKm * distance);
};

// @desc    Book a cab
// @route   POST /api/bookings
const bookCab = async (req, res) => {
  try {
    const { carId, pickup, destination, bookingDate, estimatedDistance, paymentMethod, notes } = req.body;

    if (!carId || !pickup || !destination || !bookingDate) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ success: false, message: 'Car not found.' });
    if (!car.isAvailable) {
      return res.status(409).json({ success: false, message: 'Car is not available.' });
    }

    const distance = estimatedDistance || Math.floor(Math.random() * 20 + 5);
    const fare = estimateFare(car.pricePerKm, distance);

    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      pickup,
      destination,
      bookingDate,
      estimatedDistance: distance,
      estimatedFare: fare,
      paymentMethod: paymentMethod || 'Cash',
      notes,
    });

    await booking.populate(['user', 'car']);
    res.status(201).json({ success: true, message: 'Cab booked successfully!', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('car', 'name model cabType image driverName driverPhone')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('car', 'name model cabType plateNumber')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('car');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status (admin)
// @route   PUT /api/bookings/:id
const updateBookingStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    ).populate('user', 'name email').populate('car', 'name model');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    res.json({ success: true, message: 'Booking updated.', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel booking (user)
// @route   PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });

    if (['Completed', 'Cancelled'].includes(booking.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this booking.' });
    }

    booking.status = 'Cancelled';
    await booking.save();
    res.json({ success: true, message: 'Booking cancelled.', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get stats (admin dashboard)
// @route   GET /api/bookings/stats
const getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'Completed' });
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const cancelledBookings = await Booking.countDocuments({ status: 'Cancelled' });

    const revenueData = await Booking.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$estimatedFare' } } },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      success: true,
      stats: { totalBookings, completedBookings, pendingBookings, cancelledBookings, totalRevenue },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { bookCab, getMyBookings, getAllBookings, getBookingById, updateBookingStatus, cancelBooking, getStats };
