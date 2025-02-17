require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// CORS Configuration
const allowedOrigins = ["https://glittery-empanada-71e129.netlify.app"];
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load middleware configurations (ensure this exists)
require("./config")(app);

// Routes
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const skillRoutes = require("./routes/skills.routes");
app.use("/api/skills", skillRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/api/users", usersRoutes);

const citiesRoutes = require("./routes/cities.routes");
app.use("/api/cities", citiesRoutes);

// Error handling
require("./error-handling")(app);

module.exports = app;
