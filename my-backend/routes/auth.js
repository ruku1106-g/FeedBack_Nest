const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Import User model
const router = express.Router();

// POST route to check if email exists
router.post('/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Error checking email availability.' });
  }
});

// POST route for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;