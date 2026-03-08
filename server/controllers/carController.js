const Car = require('../models/CarSchema');

// @desc    Get all cars
// @route   GET /api/cars
const getAllCars = async (req, res) => {
  try {
    const { cabType, isAvailable } = req.query;
    const filter = {};
    if (cabType) filter.cabType = cabType;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: cars.length, cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single car
// @route   GET /api/cars/:id
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Car not found.' });
    res.json({ success: true, car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add new car (admin)
// @route   POST /api/cars
const addCar = async (req, res) => {
  try {
    const { name, model, plateNumber, seats, cabType, pricePerKm, driverName, driverPhone, rating } = req.body;

    if (!name || !model || !plateNumber || !seats || !pricePerKm) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    const carData = { name, model, plateNumber, seats, cabType, pricePerKm, driverName, driverPhone, rating };
    if (req.file) carData.image = req.file.filename;

    const car = await Car.create(carData);
    res.status(201).json({ success: true, message: 'Car added successfully.', car });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Plate number already exists.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update car (admin)
// @route   PUT /api/cars/:id
const updateCar = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    const car = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!car) return res.status(404).json({ success: false, message: 'Car not found.' });
    res.json({ success: true, message: 'Car updated.', car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete car (admin)
// @route   DELETE /api/cars/:id
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Car not found.' });
    res.json({ success: true, message: 'Car deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllCars, getCarById, addCar, updateCar, deleteCar };
