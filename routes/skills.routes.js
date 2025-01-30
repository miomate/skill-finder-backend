const express = require("express");
const Skill = require("../models/Skill.model");
const User = require("../models/User.model");
const City = require("../models/City.model");

const router = express.Router();

// POST /skills - Add a new skill
router.post("/", async (req, res) => {
  const { skill, user, city } = req.body;

  try {
    if (!skill || !user || !city) {
      return res.status(400).json({ message: "Skill, user, and city are required" });
    }

    // Find user by ID
    const userObj = await User.findById(user);
    if (!userObj) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Find or create the city
    let cityObj = await City.findOne({ name: city });
    if (!cityObj) {
      cityObj = new City({ name: city });
      await cityObj.save();
    }

    // Check if the skill already exists for this user in this city
    const existingSkill = await Skill.findOne({ skill, user: userObj._id, city: cityObj._id });
    if (existingSkill) {
      return res.status(400).json({ message: "This skill already exists for this user in this city" });
    }

    // Create and save the new skill
    const newSkill = new Skill({ skill, user: userObj._id, city: cityObj._id });
    await newSkill.save();

    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /skills - Fetch all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().populate("user city");
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
