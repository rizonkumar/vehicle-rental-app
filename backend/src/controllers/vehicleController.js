const vehicleService = require("../services/vehicleService.js");

exports.getVehicleTypes = async (req, res, next) => {
  try {
    const { wheels } = req.query;
    if (!wheels) {
      return res.status(400).json({
        error: "Please select the number of wheels to see available types.",
      }); //
    }

    const wheelsInt = parseInt(wheels, 10);
    if (isNaN(wheelsInt)) {
      return res.status(400).json({
        error: "Invalid number of wheels provided. It must be a number.",
      });
    }

    const types = await vehicleService.getTypesByWheels(wheelsInt); //

    if (types.length === 0) {
      return res
        .status(404)
        .json({ message: `No vehicle types found for ${wheels} wheels.` });
    }

    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

exports.getVehicles = async (req, res, next) => {
  try {
    const { typeId } = req.params;
    if (!typeId) {
      return res.status(400).json({
        error: "Please select a vehicle type to see available models.",
      });
    }

    const typeIdInt = parseInt(typeId, 10);
    if (isNaN(typeIdInt)) {
      return res.status(400).json({
        error: "Invalid Vehicle Type ID provided. It must be a number.",
      });
    }

    const vehicles = await vehicleService.getVehiclesByType(typeIdInt); //

    if (vehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "No vehicles found for the selected type." });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    next(error); //
  }
};
