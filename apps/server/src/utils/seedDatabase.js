const Product = require('../models/productModel');
const User = require('../models/userModel');
const ApprovedEmail = require('../models/approvedEmailModel');
const Order = require('../models/orderModel');

const products = [
  {
    name: 'Arctic Breeze Ceiling Fan',
    description: 'High-performance ceiling fan with remote control and 5 speed settings',
    category: 'fan',
    brand: 'ChillBreeze',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi3joVm0P7ocnsOgZribO6iA4EmPIGIKC--Q&s',
    rating: 4.5,
    numReviews: 12,
    features: ['Remote Control', 'LED Light', 'Reverse Mode', 'Energy Efficient'],
    variants: [
      { color: 'White', size: '42 inch', price: 129.99, stock: 15 },
      { color: 'White', size: '52 inch', price: 149.99, stock: 10 },
      { color: 'Black', size: '42 inch', price: 129.99, stock: 8 },
      { color: 'Black', size: '52 inch', price: 149.99, stock: 12 },
      { color: 'Brown', size: '52 inch', price: 149.99, stock: 7 }
    ]
  },
  {
    name: 'WindChaser Tower Fan',
    description: 'Oscillating tower fan with ionizer and air purifier',
    category: 'fan',
    brand: 'ChillBreeze',
    image: 'https://ankurelectricals.com/cdn/shop/files/4_746797eb-1f67-4b46-a6fe-74529c537355_1024x1024.png?v=1730016844',
    rating: 4.0,
    numReviews: 8,
    features: ['Oscillation', 'Remote Control', 'Timer', 'Air Purifier'],
    variants: [
      { color: 'White', size: '36 inch', price: 79.99, stock: 20 },
      { color: 'Black', size: '36 inch', price: 79.99, stock: 15 },
      { color: 'White', size: '42 inch', price: 99.99, stock: 10 }
    ]
  },
  {
    name: 'FrostMaster Inverter AC',
    description: 'Energy-efficient inverter air conditioner with smart controls',
    category: 'ac',
    brand: 'FrostMaster',
    image: 'https://rukminim2.flixcart.com/fk-p-image/850/400/cf-chitrakaar-prod/a7e55b55c6b78227a4eb51505e65d362.jpeg?q=90',
    rating: 4.8,
    numReviews: 22,
    features: ['Inverter Technology', 'Wi-Fi Control', 'Air Purification', 'Energy Saving'],
    variants: [
      { color: 'White', size: '1.0 Ton', price: 549.99, stock: 8 },
      { color: 'White', size: '1.5 Ton', price: 649.99, stock: 12 },
      { color: 'White', size: '2.0 Ton', price: 749.99, stock: 6 }
    ]
  },
  {
    name: 'ChillZone Portable AC',
    description: 'Compact portable air conditioner for rooms up to 400 sq ft',
    category: 'ac',
    brand: 'ChillZone',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUpbfalfKZqAUFJ74jeeDmVqU_uTfuUlNgg&s',
    rating: 4.2,
    numReviews: 15,
    features: ['Portable', 'Dehumidifier', 'Remote Control', 'Easy Installation'],
    variants: [
      { color: 'White', size: '8,000 BTU', price: 329.99, stock: 10 },
      { color: 'Black', size: '8,000 BTU', price: 329.99, stock: 8 },
      { color: 'White', size: '10,000 BTU', price: 399.99, stock: 5 },
      { color: 'Black', size: '10,000 BTU', price: 399.99, stock: 7 }
    ]
  },
  {
    name: 'PolarWind Window AC',
    description: 'Window-mounted air conditioner with energy-saving mode',
    category: 'ac',
    brand: 'PolarisWind',
    image: 'https://consumer.bluestarindia.com/cdn/shop/files/INV_L-series_1.png?v=1724314353',
    rating: 3.9,
    numReviews: 11,
    features: ['Window Mount', 'Energy Saving', 'Remote Control', 'Sleep Mode'],
    variants: [
      { color: 'White', size: '5,000 BTU', price: 199.99, stock: 15 },
      { color: 'White', size: '8,000 BTU', price: 249.99, stock: 10 },
      { color: 'White', size: '12,000 BTU', price: 299.99, stock: 8 }
    ]
  },
  {
    name: 'BreezeMaster Table Fan',
    description: 'Compact and powerful table fan with oscillation',
    category: 'fan',
    brand: 'BreezingMaster',
    image: 'https://www.havai.in/cdn/shop/files/2_2500x2500_c231b6eb-1ccd-4a7f-8cc0-ff34344796ba.png?v=1726130300&width=3840',
    rating: 4.3,
    numReviews: 9,
    features: ['Oscillation', '3 Speed Settings', 'Adjustable Tilt', 'Portable'],
    variants: [
      { color: 'White', size: '12 inch', price: 34.99, stock: 25 },
      { color: 'Black', size: '12 inch', price: 34.99, stock: 20 },
      { color: 'Blue', size: '12 inch', price: 39.99, stock: 15 }
    ]
  }
];

const approvedEmails = [
  { email: 'admin@chillease.com', role: 'admin' },
  { email: 'manishym946@gmail.com', role: 'admin' },
  { email: 'rider1@chillease.com', role: 'rider' },
  { email: 'knightlord956@gmail.com', role: 'rider' }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await ApprovedEmail.deleteMany();
    
    // Don't delete users and orders in production
    // await User.deleteMany();
    // await Order.deleteMany();

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded');

    // Insert approved emails
    await ApprovedEmail.insertMany(approvedEmails);
    console.log('Approved emails seeded');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { seedDatabase };