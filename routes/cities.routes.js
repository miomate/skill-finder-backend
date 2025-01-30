const express = require('express');
const City = require('../models/City.model');
const router = express.Router();

// GET city by name
router.get('/api/cities', async (req, res) => {
  const { city } = req.query;
  try {
    const cityData = await City.findOne({ city });
    if (!cityData) {
      return res.status(404).json({ message: 'City does not exist' });
    }
    res.status(200).json(cityData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;