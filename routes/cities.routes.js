const express = require("express");
const City = require("../models/City.model");

const router = express.Router();

// GET /cities?city=Berlin - Get city by name
router.get("/", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    const cityData = await City.findOne({ name: city });

    if (!cityData) {
      return res.status(404).json({ message: "City does not exist" });
    }

    res.status(200).json(cityData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
