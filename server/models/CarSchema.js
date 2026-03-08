const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true,
  },
  plateNumber: {
    type: String,
    required: [true, 'Plate number is required'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  seats: {
    type: Number,
    required: [true, 'Seats count is required'],
    min: 2,
    max: 15,
  },
  cabType: {
    type: String,
    enum: ['Mini', 'Sedan', 'SUV', 'Luxury', 'XL'],
    default: 'Sedan',
  },
  pricePerKm: {
    type: Number,
    required: [true, 'Price per km is required'],
    min: 0,
  },
  image: {
    type: String,
    default: '',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  driverName: {
    type: String,
    trim: true,
  },
  driverPhone: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
