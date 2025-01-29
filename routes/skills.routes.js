const express = require('express');
const Skill = require('../models/Skill.model');
const User = require('../models/User.model');
const City = require('../models/City.model');
const router = express.Router();

// POST /api/skills
router.post('/', async (req, res) => {
  const { skill, user, city } = req.body;

  try {
    // Find the user and city by name (this can be adjusted based on your data models)
    const userObj = await User.findOne({ username: user });
    const cityObj = await City.findOne({ city: city });

    if (!userObj || !cityObj) {
      return res.status(400).json({ message: 'Invalid user or city' });
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
    console.error(error);
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

module.exports = router;
