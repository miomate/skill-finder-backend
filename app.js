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
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS
    credentials: true
}));

// Handle preflight requests
app.options('*', cors()); // Allow preflight requests for all routes

// ℹ️ Load middleware configurations
require('./config')(app);

// 👇 Start handling routes
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const skillRoutes = require("./routes/skills.routes");
app.use("/api/skills", skillRoutes);


// ❗ Handle errors
require('./error-handling')(app);

module.exports = app;
