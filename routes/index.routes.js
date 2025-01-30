const express = require("express");

const authRoutes = require("./auth.routes");
const usersRoutes = require("./users.routes");
const citiesRoutes = require("./cities.routes");
const skillsRoutes = require("./skills.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

// Mount the routes
router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/cities", citiesRoutes);
router.use("/api/skills", skillsRoutes);

module.exports = router;
