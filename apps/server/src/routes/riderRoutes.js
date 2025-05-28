const express = require('express');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const { authenticate, isAdmin, isRider } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/riders
// @desc    Get all riders (admin only)
// @access  Admin
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const riders = await User.find({ role: 'rider' }).select('-__v');
    res.json(riders);
  } catch (error) {
    console.error('Error fetching riders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/riders/orders
// @desc    Get all orders assigned to rider
// @access  Rider
router.get('/orders', authenticate, isRider, async (req, res) => {
  try {
    const orders = await Order.find({ rider: req.user._id })
      .populate('user', 'name email')
      .sort('-createdAt');
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching rider orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;