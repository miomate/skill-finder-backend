const express = require("express");
const router = express.Router();
const City = require("../models/City.model");

// POST route to create a city
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    console.log("Received request body:", req.body); // Log entire body
    console.log("Received city name:", name); // Log the city name received

    if (!name) {
      console.error("City name is required");
      return res.status(400).json({ message: "City name is required." });
    }

    const existingCity = await City.findOne({ name });
    if (existingCity) {
      console.log("City already exists:", name);
      // Instead of returning an error, return the existing city
      return res.status(200).json(existingCity);
    }

    const city = new City({ name });
    await city.save();

    console.log("City created successfully:", city);
    res.status(201).json(city); // Send back the created city
  } catch (err) {
    console.error("Error creating city:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const City = require("../models/City.model"); // Assuming this is the model for cities

// // POST route to create a city
// router.post("/", async (req, res) => {
//   try {
//     const { name } = req.body;

//     console.log("Received request body:", req.body); // Log entire body
//     console.log("Received city name:", name); // Log the city name received

//     if (!name) {
//       console.error("City name is required");
//       return res.status(400).json({ message: "City name is required." });
//     }

//     const existingCity = await City.findOne({ name });
//     if (existingCity) {
//       console.error("City already exists:", name);
//       return res.status(400).json({ message: "City already exists." });
//     }

//     const city = new City({ name });
//     await city.save();

//     console.log("City created successfully:", city);
//     res.status(201).json(city); // Send back the created city
//   } catch (err) {
//     console.error("Error creating city:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }

//   console.log("Received city name:", req.body.name);
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const City = require("../models/City.model"); // Assuming this is the correct path to your city model

// // POST route to create a city
// router.post("/", async (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "City name is required" });
//   }

//   try {
//     // Check if the city already exists
//     const existingCity = await City.findOne({ name });
//     if (existingCity) {
//       return res.status(400).json({ message: "City already exists" });
//     }

//     // Create a new city and save it
//     const city = new City({ name });
//     await city.save(); // This is where we are saving the city to MongoDB

//     res.status(201).json(city); // Return the created city
//   } catch (error) {
//     console.error("Error creating city:", error); // Log the error for debugging
//     res
//       .status(500)
//       .json({ message: "Failed to create city", error: error.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const City = require("../models/City.model"); // Assuming this is the model for cities

// // POST route to create a city
// router.post("/", async (req, res) => {
//   const { name } = req.body;

//   try {
//     const city = new City({ name });
//     await city.save(); // Save city to the database
//     res.status(201).json(city); // Respond with the city object
//   } catch (error) {
//     console.error("Error creating city:", error);
//     res.status(500).json({ message: "Failed to create city" });
//   }
// });

// module.exports = router;

// // In cities.routes.js

// const express = require("express");
// const City = require("../models/City.model"); // The City model for the database
// const router = express.Router();

// // Route to create a new city or get an existing one
// router.post("/", async (req, res) => {
//   const { name } = req.body;

//   try {
//     console.log("Received city name:", name);  // Log to check if city name is coming through

//     // Check if the city already exists
//     let city = await City.findOne({ name });

//     // If the city does not exist, create it
//     if (!city) {
//       console.log("City not found, creating a new one.");
//       city = new City({ name });
//       await city.save();
//     }

//     // Respond with the city (either newly created or already existing)
//     res.status(200).json(city);
//   } catch (error) {
//     console.error("Error creating city:", error);  // Log the error to the server
//     res.status(500).json({ message: "Error creating or fetching city", error: error.message });
//   }
// });

// // Optional: Route to fetch a city by name (for your use case)
// router.get("/", async (req, res) => {
//   const { city } = req.query;

//   try {
//     const foundCity = await City.findOne({ name: city });
//     if (!foundCity) {
//       return res.status(404).json({ message: "City not found" });
//     }
//     res.status(200).json(foundCity);
//   } catch (error) {
//     console.error("Error fetching city:", error);  // Log the error to the server
//     res.status(500).json({ message: "Error fetching city", error: error.message });
//   }
// });

// module.exports = router;

// // const express = require("express");
// // const City = require("../models/City.model");
// // const mongoose = require("mongoose");

// // const router = express.Router();

// // // GET /cities?city=Berlin - Get city by name (case insensitive)
// // router.get("/", async (req, res) => {
// //   const { city } = req.query;

// //   if (!city) {
// //     return res.status(400).json({ message: "City name is required" });
// //   }

// //   try {
// //     const normalizedCity = city.toLowerCase();
// //     const cityData = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });

// //     if (!cityData) {
// //       return res.status(404).json({ message: "City does not exist" });
// //     }

// //     res.status(200).json(cityData);
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error", error });
// //   }
// // });

// // // POST /cities - Add a new city
// // router.post("/", async (req, res) => {
// //   const { name } = req.body;

// //   if (!name) {
// //     return res.status(400).json({ message: "City name is required" });
// //   }

// //   try {
// //     const normalizedCity = name.toLowerCase();
// //     let city = await City.findOne({ name: { $regex: `^${normalizedCity}$`, $options: "i" } });

// //     if (city) {
// //       return res.status(400).json({ message: "City already exists" });
// //     }

// //     city = new City({ name: normalizedCity });
// //     await city.save();

// //     res.status(201).json(city);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // module.exports = router;
