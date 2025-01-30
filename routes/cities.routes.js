const express = require("express");
const City = require("../models/City.model");
const mongoose = require("mongoose"); 

const router = express.Router();

// GET /cities?city=Berlin - Get city by name (case insensitive)
router.get("/", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    const normalizedCity = city.toLowerCase();
    const cityData = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });

    if (!cityData) {
      return res.status(404).json({ message: "City does not exist" });
    }

    res.status(200).json(cityData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST /cities - Add a new city
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    const normalizedCity = name.toLowerCase();
    let city = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });

    if (city) {
      return res.status(400).json({ message: "City already exists" });
    }

    city = new City({ name: normalizedCity });
    await city.save();

    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
