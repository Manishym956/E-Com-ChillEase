require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const riderRoutes = require('./routes/riderRoutes');
const { seedDatabase } = require('./utils/seedDatabase');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// CORS configuration
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN_CLIENT,
    process.env.CORS_ORIGIN_ADMIN,
    process.env.CORS_ORIGIN_RIDER
  ],
  credentials: true
}));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/riders', riderRoutes);

// API status route
app.get('/', (req, res) => {
  res.json({ message: 'ChillEase API is running' });
});

// Seed database if needed (uncomment to enable seeding on startup)
seedDatabase();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});