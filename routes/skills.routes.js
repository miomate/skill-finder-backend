const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill.model");
const mongoose = require("mongoose");

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
      return res.status(400).json({ message: "Skill, user, and city are required." });
    }

    // Create and save the new skill
    // We assume that 'user' and 'city' are valid ObjectId strings.
    const newSkill = new Skill({ skill, user, city });
    await newSkill.save();

    console.log("Skill created successfully:", newSkill);
    res.status(201).json(newSkill);
  } catch (err) {
    console.error("Error creating skill:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// DELETE route to remove a skill by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received DELETE request for skill ID:", id);

    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) {
      console.error("Skill not found:", id);
      return res.status(404).json({ message: "Skill not found." });
    }

    console.log("Skill deleted successfully:", deletedSkill);
    res.status(204).json({ message: "Skill deleted successfully." });
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Skill = require("../models/Skill.model");
// const mongoose = require("mongoose");

// // GET route to fetch all skills
// router.get("/", async (req, res) => {
//   try {
//     const skills = await Skill.find().populate("user").populate("city");
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
//       return res.status(400).json({ message: "Skill, user, and city are required." });
//     }

//     // Convert `user` and `city` to ObjectIds if they aren't already
//     const userId = new mongoose.Types.ObjectId(user);
//     const cityId = new mongoose.Types.ObjectId(city);

//     // Check if the skill already exists for the user and city
//     const existingSkill = await Skill.findOne({
//       skill,
//       user: userId,
//       city: cityId,
//     });
//     if (existingSkill) {
//       console.error("Skill already exists:", skill);
//       return res.status(400).json({ message: "Skill already exists for this user in this city." });
//     }

//     // Create and save the new skill
//     const newSkill = new Skill({ skill, user: userId, city: cityId });
//     await newSkill.save();

//     console.log("Skill created successfully:", newSkill);
//     res.status(201).json(newSkill);
//   } catch (err) {
//     console.error("Error creating skill:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // DELETE route to remove a skill by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Received DELETE request for skill ID:", id);

//     const deletedSkill = await Skill.findByIdAndDelete(id);
//     if (!deletedSkill) {
//       console.error("Skill not found:", id);
//       return res.status(404).json({ message: "Skill not found." });
//     }

//     console.log("Skill deleted successfully:", deletedSkill);
//     res.status(204).json({ message: "Skill deleted successfully." });
//   } catch (err) {
//     console.error("Error deleting skill:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// module.exports = router;
//by chat gtp 03-02-25
// const express = require("express");
// const router = express.Router();
// const Skill = require("../models/Skill.model");

// // GET route to fetch all skills
// router.get("/", async (req, res) => {
//   try {
//     const skills = await Skill.find().populate("user").populate("city");
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
//       return res.status(400).json({ message: "Skill, user, and city are required." });
//     }

//     // If necessary, you can convert user and city to ObjectIds here
//     const newSkill = new Skill({ skill, user, city });
//     await newSkill.save();

//     console.log("Skill created successfully:", newSkill);
//     res.status(201).json(newSkill);
//   } catch (err) {
//     console.error("Error creating skill:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // DELETE route to remove a skill by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Received DELETE request for skill ID:", id);

//     const deletedSkill = await Skill.findByIdAndDelete(id);
//     if (!deletedSkill) {
//       console.error("Skill not found:", id);
//       return res.status(404).json({ message: "Skill not found." });
//     }

//     console.log("Skill deleted successfully:", deletedSkill);
//     res.status(204).json({ message: "Skill deleted successfully." });
//   } catch (err) {
//     console.error("Error deleting skill:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// module.exports = router;



//old
// const express = require("express");
// const router = express.Router();
// const Skill = require("../models/Skill.model");

// // GET route to fetch all skills
// router.get("/", async (req, res) => {
//   try {
//     const skills = await Skill.find().populate("user").populate("city");
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

//     // Convert `user` and `city` to ObjectIds if they aren't already
//     const mongoose = require("mongoose");
//     const userId = new mongoose.Types.ObjectId(user);
//     const cityId = new mongoose.Types.ObjectId(city);

//     // Check if the skill already exists for the user and city
//     const existingSkill = await Skill.findOne({
//       skill,
//       user: userId,
//       city: cityId,
//     });
//     if (existingSkill) {
//       console.error("Skill already exists:", skill);
//       return res
//         .status(400)
//         .json({ message: "Skill already exists for this user in this city." });
//     }

//     // Create and save the new skill
//     const newSkill = new Skill({ skill, user: userId, city: cityId });
//     await newSkill.save();

//     console.log("Skill created successfully:", newSkill);
//     res.status(201).json(newSkill);
//   } catch (err) {
//     console.error("Error creating skill:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// module.exports = router;
