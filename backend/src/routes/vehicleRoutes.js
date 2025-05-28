const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController.js");

router.get("/types", vehicleController.getVehicleTypes);

router.get("/:typeId", vehicleController.getVehicles);

module.exports = router;
