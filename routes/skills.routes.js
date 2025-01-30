const express = require("express");
const Skill = require("../models/Skill.model");
const User = require("../models/User.model");
const City = require("../models/City.model");

const router = express.Router();

// POST /skills - Add a new skill
router.post("/", async (req, res) => {
  const { skill, user, city } = req.body;

  try {
    // Validate input
    if (!skill || !user || !city) {
      return res.status(400).json({ message: "Skill, user, and city are required" });
    }

    // Find user by ID
    const userObj = await User.findOne({ username: user });
    if (!userObj) {
      return res.status(400).json({ message: "User does not exist" });
    }

    console.log("User found:", userObj); // Log the found user

    // Normalize city name to lowercase
    const normalizedCity = city.toLowerCase();
    console.log("Normalized city:", normalizedCity); // Log the normalized city name

    // Find or create the city
    let cityObj = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });
    if (!cityObj) {
      console.log("City not found, creating new city:", normalizedCity); // Log when creating the city
      cityObj = new City({ name: normalizedCity });
      await cityObj.save();
      console.log("New city created:", cityObj); // Log the created city
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
    console.error("Error while adding skill:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
