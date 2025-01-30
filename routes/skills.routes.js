const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill.model");

// GET route to fetch all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().populate("user").populate("city");
    res.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// POST route to create a new skill
router.post("/", async (req, res) => {
  try {
    const { skill, user, city } = req.body;

    console.log("Received skill data:", { skill, user, city });

    if (!skill || !user || !city) {
      console.error("Missing required fields");
      return res
        .status(400)
        .json({ message: "Skill, user, and city are required." });
    }

    // Convert `user` and `city` to ObjectIds if they aren't already
    const mongoose = require("mongoose");
    const userId = new mongoose.Types.ObjectId(user);
    const cityId = new mongoose.Types.ObjectId(city);

    // Check if the skill already exists for the user and city
    const existingSkill = await Skill.findOne({
      skill,
      user: userId,
      city: cityId,
    });
    if (existingSkill) {
      console.error("Skill already exists:", skill);
      return res
        .status(400)
        .json({ message: "Skill already exists for this user in this city." });
    }

    // Create and save the new skill
    const newSkill = new Skill({ skill, user: userId, city: cityId });
    await newSkill.save();

    console.log("Skill created successfully:", newSkill);
    res.status(201).json(newSkill);
  } catch (err) {
    console.error("Error creating skill:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Skill = require("../models/Skill.model");

// // GET route to fetch all skills
// router.get("/", async (req, res) => {
//   try {
//     const skills = await Skill.find().populate("user city");
//     res.json(skills);
//   } catch (error) {
//     console.error("Error fetching skills:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // POST route to create a new skill
// router.post("/", async (req, res) => {
//   try {
//     const { skill, user, city } = req.body;

//     console.log("Received skill data:", { skill, user, city });

//     if (!skill || !user || !city) {
//       console.error("Missing required fields");
//       return res
//         .status(400)
//         .json({ message: "Skill, user, and city are required." });
//     }

//     // Check if the skill already exists for the user and city
//     const existingSkill = await Skill.findOne({ skill, user, city });
//     if (existingSkill) {
//       console.error("Skill already exists:", skill);
//       return res
//         .status(400)
//         .json({ message: "Skill already exists for this user in this city." });
//     }

//     // Create and save the new skill
//     const newSkill = new Skill({ skill, user, city });
//     await newSkill.save();

//     console.log("Skill created successfully:", newSkill);
//     res.status(201).json(newSkill);
//   } catch (err) {
//     console.error("Error creating skill:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Skill = require("../models/Skill.model"); // Assuming this is your skill model

// // POST route to create a skill
// router.post("/", async (req, res) => {
//   try {
//     const { skill, user, city } = req.body;

//     console.log("Received skill data:", { skill, user, city }); // Log received data

//     if (!skill || !user || !city) {
//       console.error("Missing required fields");
//       return res
//         .status(400)
//         .json({ message: "Skill, user, and city are required." });
//     }

//     // Check if skill already exists for the user and city
//     const existingSkill = await Skill.findOne({ skill, user, city });
//     if (existingSkill) {
//       console.error("Skill already exists:", skill);
//       return res
//         .status(400)
//         .json({ message: "Skill already exists for this user in this city." });
//     }

//     const newSkill = new Skill({ skill, user, city });
//     await newSkill.save();

//     console.log("Skill created successfully:", newSkill);
//     res.status(201).json(newSkill); // Send back the created skill
//   } catch (err) {
//     console.error("Error creating skill:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Skill = require("../models/Skill.model");
// const User = require("../models/User.model"); // Assuming user model is needed for validation

// // POST route to create a skill
// router.post("/", async (req, res) => {
//   const { skill, city, userId } = req.body;

//   // Ensure that userId exists
//   if (!userId) {
//     return res.status(400).json({ message: "User ID is required" });
//   }

//   try {
//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if city exists (or add it if needed)
//     const existingCity = await City.findOne({ name: city });
//     if (!existingCity) {
//       const newCity = new City({ name: city });
//       await newCity.save();
//     }

//     // Check if skill already exists for the user in this city
//     const existingSkill = await Skill.findOne({ skill, city, userId });
//     if (existingSkill) {
//       return res
//         .status(400)
//         .json({ message: "Skill already exists for this user in this city" });
//     }

//     // Create and save the skill
//     const newSkill = new Skill({
//       skill,
//       city,
//       userId,
//     });

//     await newSkill.save();
//     res.status(201).json(newSkill);
//   } catch (error) {
//     console.error("Error creating skill:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to create skill", error: error.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const Skill = require("../models/Skill.model");
// const User = require("../models/User.model");
// const City = require("../models/City.model");

// const router = express.Router();

// // GET /cities - Fetch city by name or all cities (if no name is provided)
// router.get("/cities", async (req, res) => {
//   const { city } = req.query;

//   try {
//     if (city) {
//       // Search for a city by name (case-insensitive)
//       const cityObj = await City.findOne({
//         name: { $regex: `^${city}$`, $options: "i" },
//       });
//       if (!cityObj) {
//         return res.status(404).json({ message: "City not found" });
//       }
//       return res.json(cityObj);
//     } else {
//       // If no city query is provided, return all cities
//       const cities = await City.find();
//       return res.json(cities);
//     }
//   } catch (error) {
//     console.error("Error fetching city:", error);
//     res.status(500).json({ message: "Error fetching city" });
//   }
// });

// // POST /skills - Add a new skill
// router.post("/", async (req, res) => {
//   const { skill, user, city } = req.body;

//   try {
//     if (!skill || !user || !city) {
//       return res
//         .status(400)
//         .json({ message: "Skill, user, and city are required" });
//     }

//     const userObj = await User.findOne({ username: user });
//     if (!userObj) {
//       return res.status(400).json({ message: "User does not exist" });
//     }

//     const normalizedCity = city.toLowerCase();
//     let cityObj = await City.findOne({
//       name: { $regex: `^${normalizedCity}$`, $options: "i" },
//     });

//     if (!cityObj) {
//       cityObj = new City({ name: normalizedCity });
//       await cityObj.save();
//     }

//     const existingSkill = await Skill.findOne({
//       skill,
//       user: userObj._id,
//       city: cityObj._id,
//     });

//     if (existingSkill) {
//       return res
//         .status(400)
//         .json({
//           message: "This skill already exists for this user in this city",
//         });
//     }

//     const newSkill = new Skill({ skill, user: userObj._id, city: cityObj._id });
//     await newSkill.save();

//     res.status(201).json(newSkill);
//   } catch (error) {
//     console.error("Error while adding skill:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
