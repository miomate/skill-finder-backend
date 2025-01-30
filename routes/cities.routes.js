// In cities.routes.js

const express = require("express");
const City = require("../models/City.model"); // The City model for the database
const router = express.Router();

// Route to create a new city or get an existing one
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    console.log("Received city name:", name);  // Log to check if city name is coming through

    // Check if the city already exists
    let city = await City.findOne({ name });

    // If the city does not exist, create it
    if (!city) {
      console.log("City not found, creating a new one.");
      city = new City({ name });
      await city.save();
    }

    // Respond with the city (either newly created or already existing)
    res.status(200).json(city);
  } catch (error) {
    console.error("Error creating city:", error);  // Log the error to the server
    res.status(500).json({ message: "Error creating or fetching city", error: error.message });
  }
});

// Optional: Route to fetch a city by name (for your use case)
router.get("/", async (req, res) => {
  const { city } = req.query;

  try {
    const foundCity = await City.findOne({ name: city });
    if (!foundCity) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json(foundCity);
  } catch (error) {
    console.error("Error fetching city:", error);  // Log the error to the server
    res.status(500).json({ message: "Error fetching city", error: error.message });
  }
});

module.exports = router;



// const express = require("express");
// const City = require("../models/City.model");
// const mongoose = require("mongoose");

// const router = express.Router();

// // GET /cities?city=Berlin - Get city by name (case insensitive)
// router.get("/", async (req, res) => {
//   const { city } = req.query;

//   if (!city) {
//     return res.status(400).json({ message: "City name is required" });
//   }

//   try {
//     const normalizedCity = city.toLowerCase();
//     const cityData = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });

//     if (!cityData) {
//       return res.status(404).json({ message: "City does not exist" });
//     }

//     res.status(200).json(cityData);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // POST /cities - Add a new city
// router.post("/", async (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "City name is required" });
//   }

//   try {
//     const normalizedCity = name.toLowerCase();
//     let city = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });

//     if (city) {
//       return res.status(400).json({ message: "City already exists" });
//     }

//     city = new City({ name: normalizedCity });
//     await city.save();

//     res.status(201).json(city);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
