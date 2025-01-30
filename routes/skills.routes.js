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
      const cityObj = await City.findOne({
        name: { $regex: `^${city}$`, $options: "i" },
      });
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
    if (!skill || !user || !city) {
      return res
        .status(400)
        .json({ message: "Skill, user, and city are required" });
    }

    const userObj = await User.findOne({ username: user });
    if (!userObj) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const normalizedCity = city.toLowerCase();
    let cityObj = await City.findOne({
      name: { $regex: `^${normalizedCity}$`, $options: "i" },
    });

    if (!cityObj) {
      cityObj = new City({ name: normalizedCity });
      await cityObj.save();
    }

    const existingSkill = await Skill.findOne({
      skill,
      user: userObj._id,
      city: cityObj._id,
    });

    if (existingSkill) {
      return res
        .status(400)
        .json({
          message: "This skill already exists for this user in this city",
        });
    }

    const newSkill = new Skill({ skill, user: userObj._id, city: cityObj._id });
    await newSkill.save();

    res.status(201).json(newSkill);
  } catch (error) {
    console.error("Error while adding skill:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
