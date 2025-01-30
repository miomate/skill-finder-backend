const express = require('express');
const Skill = require('../models/Skill.model');
const User = require('../models/User.model');
const City = require('../models/City.model');
const router = express.Router();

// POST /api/skills - Create a new skill
router.post('/', async (req, res) => {
  const { skill, user, city } = req.body;

  try {
    // Find the user by username
    const userObj = await User.findOne({ username: user });
    if (!userObj) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Find or create the city
    let cityObj = await City.findOne({ city: city });
    if (!cityObj) {
      cityObj = new City({ city: city });
      await cityObj.save();
    }

    // Check if the skill already exists for this user in this city
    const existingSkill = await Skill.findOne({ skill, user: userObj._id, city: cityObj._id });
    if (existingSkill) {
      return res.status(400).json({ message: 'This skill already exists for this user in this city' });
    }

    // Create the new skill document
    const newSkill = new Skill({
      skill,
      user: userObj._id,
      city: cityObj._id,
    });

    await newSkill.save(); // Save the new skill to the database
    res.status(201).json(newSkill); // Respond with the new skill

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// GET /api/skills - Fetch all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().populate('user city'); // Populate user and city if needed
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
