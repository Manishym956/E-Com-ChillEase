const express = require('express');
const Product = require('../models/productModel');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, sort } = req.query;
    
    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (brand) {
      query.brand = brand;
    }
    
    // Price filtering needs to be done on the variants
    let priceFilter = {};
    if (minPrice) {
      priceFilter.$gte = Number(minPrice);
    }
    if (maxPrice) {
      priceFilter.$lte = Number(maxPrice);
    }
    
    if (Object.keys(priceFilter).length > 0) {
      query['variants.price'] = priceFilter;
    }
    
    // Sorting
    let sortOption = {};
    if (sort) {
      switch (sort) {
        case 'price-low':
          sortOption = { 'variants.price': 1 };
          break;
        case 'price-high':
          sortOption = { 'variants.price': -1 };
          break;
        case 'newest':
          sortOption = { createdAt: -1 };
          break;
        case 'rating':
          sortOption = { rating: -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }
    } else {
      sortOption = { createdAt: -1 };
    }
    
    const products = await Product.find(query).sort(sortOption);
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Admin
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Admin
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;