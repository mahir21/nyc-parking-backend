const express = require('express');
const router = express.Router();
const ParkingSpot = require('../models/ParkingSpot');
const Booking = require('../models/Booking');
const User = require('../models/User');

// Get all parking spots
router.get('/parking-spots', async (req, res) => {
  try {
    const parkingSpots = await ParkingSpot.find({ isActive: true });
    res.json({
      success: true,
      count: parkingSpots.length,
      data: parkingSpots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching parking spots',
      error: error.message
    });
  }
});

// Get parking spot by ID
router.get('/parking-spots/:id', async (req, res) => {
  try {
    const parkingSpot = await ParkingSpot.findById(req.params.id);
    if (!parkingSpot) {
      return res.status(404).json({
        success: false,
        message: 'Parking spot not found'
      });
    }
    res.json({
      success: true,
      data: parkingSpot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching parking spot',
      error: error.message
    });
  }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('parkingSpot', 'name address borough hourlyRate');
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

module.exports = router;
