const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModel');
const ApprovedEmail = require('../models/approvedEmailModel');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route   POST /api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if email is in approved emails for admin or rider
    let role = 'customer';
    let isApproved = true; // Default customers are approved

    // Check if the email belongs to admin or rider
    const approvedEmail = await ApprovedEmail.findOne({ email });
    if (approvedEmail) {
      role = approvedEmail.role;
    }

    // Find or create user
    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
        googleId,
        role,
        isApproved
      });
    } else {
      // Update user info if needed
      user.name = name;
      user.picture = picture;
      
      // If role in approvedEmail is different from user's role, update it
      if (approvedEmail && approvedEmail.role !== user.role) {
        user.role = approvedEmail.role;
        user.isApproved = true;
      }
      
      await user.save();
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      role: user.role,
      isApproved: user.isApproved
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;