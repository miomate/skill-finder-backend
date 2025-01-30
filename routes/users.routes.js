const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

// GET user by username
router.get('/api/users', async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;