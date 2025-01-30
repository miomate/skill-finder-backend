const express = require("express");
const Skill = require("../models/Skill.model");
const User = require("../models/User.model");
const City = require("../models/City.model");

const router = express.Router();

// GET /cities - Fetch city by name or all cities (if no name is provided)
router.get("/cities", async (req, res) => {
  const { city } = req.query;

  try {
    if (city) {
      // Search for a city by name (case-insensitive)
      const cityObj = await City.findOne({ name: { $regex: `^${city}$`, $options: "i" } });
      if (!cityObj) {
        return res.status(404).json({ message: "City not found" });
      }
      return res.json(cityObj);
    } else {
      // If no city query is provided, return all cities
      const cities = await City.find();
      return res.json(cities);
    }
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ message: "Error fetching city" });
  }
});

// POST /skills - Add a new skill
router.post("/", async (req, res) => {
  const { skill, user, city } = req.body;

  try {
    // Validate input
    if (!skill || !user || !city) {
      return res.status(400).json({ message: "Skill, user, and city are required" });
    }

    // Find user by username
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
