const express = require("express");
const cors = require("cors");
const db = require("./src/models");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

const vehicleRoutes = require("./src/routes/vehicleRoutes.js");
const bookingRoutes = require("./src/routes/bookingRoutes.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Vehicle Rental Backend!" });
});

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

module.exports = app;
