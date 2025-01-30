const express = require("express");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/router-guard.middleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("All good in auth");
});

// POST /signup - Register a new user
router.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const salt = bcrypt.genSaltSync(13);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ username, passwordHash });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// POST /login - Authenticate user
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const payload = { userId: user._id };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.json({ token: authToken });
  } catch (error) {
    next(error);
  }
});

// GET /verify - Check user authentication
router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.tokenPayload.userId);
    res.json(currentUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
