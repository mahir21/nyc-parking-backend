const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const ParkingSpot = require('./models/ParkingSpot');
const Booking = require('./models/Booking');

// Sample data
const users = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-0101',
    vehicleNumber: 'ABC1234'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-0102',
    vehicleNumber: 'XYZ5678'
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '555-0103',
    vehicleNumber: 'DEF9012'
  }
];

const parkingSpots = [
  {
    name: 'Times Square Parking Garage',
    address: '234 W 42nd St, New York, NY 10036',
    borough: 'Manhattan',
    location: {
      type: 'Point',
      coordinates: [-73.9877, 40.7580] // [longitude, latitude]
    },
    totalSpots: 150,
    availableSpots: 45,
    hourlyRate: 25,
    amenities: ['24/7 Access', 'Security Cameras', 'EV Charging', 'Valet Service']
  },
  {
    name: 'Central Park South Parking',
    address: '160 Central Park S, New York, NY 10019',
    borough: 'Manhattan',
    location: {
      type: 'Point',
      coordinates: [-73.9799, 40.7670]
    },
    totalSpots: 100,
    availableSpots: 30,
    hourlyRate: 30,
    amenities: ['Indoor Parking', 'Security Cameras', 'Restrooms']
  },
  {
    name: 'Brooklyn Heights Garage',
    address: '56 Henry St, Brooklyn, NY 11201',
    borough: 'Brooklyn',
    location: {
      type: 'Point',
      coordinates: [-73.9926, 40.6961]
    },
    totalSpots: 80,
    availableSpots: 25,
    hourlyRate: 15,
    amenities: ['Covered Parking', '24/7 Access', 'Security']
  },
  {
    name: 'Queens Center Mall Parking',
    address: '90-15 Queens Blvd, Queens, NY 11373',
    borough: 'Queens',
    location: {
      type: 'Point',
      coordinates: [-73.8698, 40.7339]
    },
    totalSpots: 200,
    availableSpots: 120,
    hourlyRate: 10,
    amenities: ['Free WiFi', 'Shopping Access', 'Security Cameras']
  },
  {
    name: 'Yankee Stadium Parking',
    address: '1 E 161st St, Bronx, NY 10451',
    borough: 'Bronx',
    location: {
      type: 'Point',
      coordinates: [-73.9266, 40.8296]
    },
    totalSpots: 300,
    availableSpots: 200,
    hourlyRate: 12,
    amenities: ['Event Parking', 'Security', '24/7 Access']
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Clear existing data
    await User.deleteMany({});
    await ParkingSpot.deleteMany({});
    await Booking.deleteMany({});
    console.log('Cleared existing data');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} users`);

    // Insert parking spots
    const createdSpots = await ParkingSpot.insertMany(parkingSpots);
    console.log(`✓ Created ${createdSpots.length} parking spots`);

    // Create sample bookings
    const now = new Date();
    const bookings = [
      {
        user: createdUsers[0]._id,
        parkingSpot: createdSpots[0]._id,
        startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        endTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
        totalHours: 4,
        totalCost: 100,
        status: 'active',
        vehicleNumber: 'ABC1234'
      },
      {
        user: createdUsers[1]._id,
        parkingSpot: createdSpots[1]._id,
        startTime: new Date(now.getTime() + 1 * 60 * 60 * 1000), // 1 hour from now
        endTime: new Date(now.getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
        totalHours: 3,
        totalCost: 90,
        status: 'pending',
        vehicleNumber: 'XYZ5678'
      },
      {
        user: createdUsers[2]._id,
        parkingSpot: createdSpots[2]._id,
        startTime: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
        endTime: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        totalHours: 4,
        totalCost: 60,
        status: 'completed',
        vehicleNumber: 'DEF9012'
      }
    ];

    const createdBookings = await Booking.insertMany(bookings);
    console.log(`✓ Created ${createdBookings.length} bookings`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSummary:');
    console.log(`- Users: ${createdUsers.length}`);
    console.log(`- Parking Spots: ${createdSpots.length}`);
    console.log(`- Bookings: ${createdBookings.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
