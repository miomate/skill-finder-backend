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

    if (!skill || !user || !city) {
      return res
        .status(400)
        .json({ message: "Skill, user, and city are required." });
    }

    // Check if the skill already exists for this user and city
    const existingSkill = await Skill.findOne({ skill, user, city });
    if (existingSkill) {
      return res
        .status(400)
        .json({ message: "Skill already exists for this user in this city." });
    }

    // Create and save the new skill
    const newSkill = new Skill({ skill, user, city });
    await newSkill.save();

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

module.exports = router;
