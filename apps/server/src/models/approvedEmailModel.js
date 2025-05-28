const mongoose = require('mongoose');

const approvedEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'rider', 'customer'],
      default: 'customer'
    }
  },
  {
    timestamps: true
  }
);

const ApprovedEmail = mongoose.model('ApprovedEmail', approvedEmailSchema);

module.exports = ApprovedEmail;