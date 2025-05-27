const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Allow requests from our frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Vehicle Rental Backend!" });
});

// TODO: Add API routes (e.g., app.use('/api/vehicles', vehicleRoutes);)

// TODO: Add Global Error Handler

module.exports = app;
