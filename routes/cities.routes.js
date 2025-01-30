const express = require("express");
const City = require("../models/City.model");

const router = express.Router();

// GET /cities?city=Berlin - Get city by name (case insensitive)
router.get("/", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    const normalizedCity = city.toLowerCase();
    console.log("Looking for city:", normalizedCity); // Log the city being searched
    const cityData = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });

    if (!cityData) {
      return res.status(404).json({ message: "City does not exist" });
    }

    console.log("City found:", cityData); // Log city data if found
    res.status(200).json(cityData);
  } catch (error) {
    console.error("Error fetching city:", error); // Log the error
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
    console.log("Normalized city name:", normalizedCity); // Log normalized city name
    let city = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });

    if (city) {
      console.log("City already exists:", city); // Log if city already exists
      return res.status(400).json({ message: "City already exists" });
    }

    city = new City({ name: normalizedCity });
    await city.save();

    console.log("New city created:", city); // Log newly created city
    res.status(201).json(city);
  } catch (error) {
    console.error("Error creating city:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
