const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill.model");
const City = require("../models/City.model");
const { isAuthenticated } = require("../middlewares/router-guard.middleware");

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
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { skill, user, city } = req.body;

    if (!skill || !user || !city) {
      return res
        .status(400)
        .json({ message: "Skill, user, and city are required." });
    }

    // Find or create city by name
    let cityDoc = await City.findOne({ name: city });
    if (!cityDoc) {
      cityDoc = new City({ name: city });
      await cityDoc.save();
    }

    // Check if the skill already exists for this user in this city
    const existingSkill = await Skill.findOne({
      skill,
      user,
      city: cityDoc._id,
    });
    if (existingSkill) {
      return res
        .status(400)
        .json({ message: "Skill already exists for this user in this city." });
    }

    // Create and save the new skill
    const newSkill = new Skill({ skill, user, city: cityDoc._id });
    await newSkill.save();

    res.status(201).json(newSkill);
  } catch (err) {
    console.error("Error creating skill:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// DELETE route to remove a skill by ID
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.status(204).json({ message: "Skill deleted successfully." });
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// GET all skills of a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const userSkills = await Skill.find({ user: req.params.userId })
      .populate("user")
      .populate("city");

    if (!userSkills || userSkills.length === 0) {
      return res
        .status(404)
        .json({ message: "No skills found for this user." });
    }

    res.json(userSkills);
  } catch (error) {
    console.error("Error fetching user skills:", error);
    res.status(500).json({ message: "Error fetching user skills" });
  }
});

// PATCH route to update a skill by ID
router.patch("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { skill, city } = req.body;

    // Check if the skill exists
    const existingSkill = await Skill.findById(id);
    if (!existingSkill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    // If city is updated, find or create the city document
    if (city) {
      let cityDoc = await City.findOne({ name: city });
      if (!cityDoc) {
        // Create the city if it doesn't exist
        cityDoc = new City({ name: city });
        await cityDoc.save();
      }
      existingSkill.city = cityDoc._id;
    }

    // Update the skill name if provided
    if (skill) {
      existingSkill.skill = skill;
    }

    // Save the updated skill
    const updatedSkill = await existingSkill.save();
    res.json(updatedSkill);
  } catch (err) {
    console.error("Error updating skill:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
