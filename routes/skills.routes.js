const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill.model");

// Get all skills
router.get("/", async (req, res, next) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    next(error);
  }
});

// Add a new skill
router.post("/", async (req, res, next) => {
  try {
    const newSkill = await Skill.create(req.body);
    res.status(201).json(newSkill);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
