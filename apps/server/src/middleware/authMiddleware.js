const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModel');
const ApprovedEmail = require('../models/approvedEmailModel');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verify Google token and attach user to request
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    
    // Check if user exists in database
    let user = await User.findOne({ googleId: payload.sub });

    // If user doesn't exist, create a new one
    if (!user) {
      // Check if email is in approved emails for admin or rider
      const approvedEmail = await ApprovedEmail.findOne({ email: payload.email });
      
      let role = 'customer';
      let isApproved = true; // Default customers are always approved
      
      if (approvedEmail) {
        role = approvedEmail.role;
        isApproved = true;
      } else if (role !== 'customer') {
        isApproved = false;
      }

      // Create new user
      user = await User.create({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        googleId: payload.sub,
        role,
        isApproved
      });
    }

    // Check if user is approved
    if (!user.isApproved) {
      return res.status(403).json({ message: 'Account not approved yet' });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Check if user is admin
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

/**
 * Check if user is rider
 */
const isRider = (req, res, next) => {
  if (req.user && req.user.role === 'rider') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as rider' });
  }
};

module.exports = { authenticate, isAdmin, isRider };
