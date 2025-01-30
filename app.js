const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

// ℹ️ Gets access to environment variables/settings
require('dotenv').config();

// Handles HTTP requests
const express = require('express');
const cors = require('cors');
const app = express();

// ℹ️ Configure CORS
const allowedOrigins = ['https://glittery-empanada-71e129.netlify.app']; // Your Netlify frontend URL

app.use(cors({
  origin: allowedOrigins, // Ensure only the correct frontend URL is allowed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any specific headers you want to allow
  credentials: true, // Allow cookies/tokens to be sent with requests
}));

// Handle preflight requests (OPTIONS request)
app.options('*', cors()); // This is a general way to handle preflight requests for all routes

// ℹ️ Load middleware configurations
require('./config')(app);

// 👇 Start handling routes
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const skillRoutes = require('./routes/skills.routes');
app.use('/api/skills', skillRoutes);

// Add new routes for users and cities
const usersRoutes = require('./routes/users.routes'); // Add this
const citiesRoutes = require('./routes/cities.routes'); // Add this
app.use('/api/users', usersRoutes);
app.use('/api/cities', citiesRoutes);

// ❗ Handle errors
require('./error-handling')(app);

module.exports = app;
