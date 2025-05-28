const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    picture: {
      type: String
    },
    role: {
      type: String,
      required: true,
      enum: ['customer', 'admin', 'rider'],
      default: 'customer'
    },
    googleId: {
      type: String,
      required: true,
      unique: true
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String }
    },
    phone: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;