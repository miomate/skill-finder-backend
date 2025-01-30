const express = require('express');
const Skill = require('../models/Skill.model');
const User = require('../models/User.model');
const City = require('../models/City.model');
const router = express.Router();

// POST /api/skills - Create a new skill
router.post('/', async (req, res) => {
  const { skill, user, city } = req.body;

  console.log("🔍 Received data:", req.body); // Log request body for debugging

  // Check if all required fields are provided
  if (!skill || !user || !city) {
    return res.status(400).json({ message: 'Missing required fields: skill, user, or city' });
  }

  try {
    // Find the user by username
    const userObj = await User.findOne({ username: user });
    if (!userObj) {
      return res.status(400).json({ message: `User '${user}' not found` });
    }

    // Find the city by name
    const cityObj = await City.findOne({ city: city });
    if (!cityObj) {
      return res.status(400).json({ message: `City '${city}' not found` });
    }

    // Create the new skill document
    const newSkill = new Skill({
      skill,
      user: userObj._id, // Use the ObjectId of the user
      city: cityObj._id, // Use the ObjectId of the city
    });

    await newSkill.save(); // Save the new skill to the database
    res.status(201).json(newSkill); // Respond with the new skill
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// GET /api/skills - Fetch all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().populate('user city'); // Populate user and city if needed
    res.status(200).json(skills);
  } catch (error) {
    console.error("❌ Error fetching skills:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
