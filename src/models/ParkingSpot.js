const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  borough: {
    type: String,
    enum: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  totalSpots: {
    type: Number,
    required: true,
    min: 1
  },
  availableSpots: {
    type: Number,
    required: true,
    min: 0
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a 2dsphere index for geospatial queries
parkingSpotSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);
