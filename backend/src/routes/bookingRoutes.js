const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController.js");

router.post("/", bookingController.createBooking);

module.exports = router;
