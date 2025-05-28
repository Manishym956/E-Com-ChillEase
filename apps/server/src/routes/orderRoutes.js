const express = require('express');
const Order = require('../models/orderModel');
const { authenticate, isAdmin, isRider } = require('../middleware/authMiddleware');
const User = require('../models/userModel');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', authenticate, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status: 'Paid'
    });
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/orders/myorders
// @desc    Get logged in user's orders
// @access  Private
router.get('/myorders', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('rider', 'name email phone');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user is owner of order, admin, or assigned rider
    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isOrderRider = order.rider && order.rider._id.toString() === req.user._id.toString();
    
    if (!isOwner && req.user.role !== 'admin' && !isOrderRider) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (admin only)
// @access  Admin
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('rider', 'name email')
      .sort('-createdAt');
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/orders/:id/ship
// @desc    Update order to shipped and assign rider
// @access  Admin
router.put('/:id/ship', authenticate, isAdmin, async (req, res) => {
  try {
    const { riderId } = req.body;
    
    if (!riderId) {
      return res.status(400).json({ message: 'Rider ID is required' });
    }
    
    // Verify rider exists and is a rider
    const rider = await User.findById(riderId);
    if (!rider || rider.role !== 'rider') {
      return res.status(400).json({ message: 'Invalid rider' });
    }
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.status !== 'Paid') {
      return res.status(400).json({ message: 'Order cannot be shipped' });
    }
    
    order.status = 'Shipped';
    order.rider = riderId;
    
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered (rider only)
// @access  Rider
router.put('/:id/deliver', authenticate, isRider, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if rider is assigned to this order
    if (!order.rider || order.rider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }
    
    if (order.status !== 'Shipped') {
      return res.status(400).json({ message: 'Order cannot be delivered' });
    }
    
    order.status = 'Delivered';
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/orders/:id/undeliver
// @desc    Update order to undelivered (rider only)
// @access  Rider
router.put('/:id/undeliver', authenticate, isRider, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if rider is assigned to this order
    if (!order.rider || order.rider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }
    
    if (order.status !== 'Shipped') {
      return res.status(400).json({ message: 'Order cannot be marked as undelivered' });
    }
    
    order.status = 'Undelivered';
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;