const vehicleService = require("../services/vehicleService.js");
exports.getVehicleTypes = async (req, res, next) => {
  try {
    const { wheels } = req.query;
    if (!wheels) {
      return res
        .status(400)
        .json({ error: "Number of wheels must be provided." });
    }
    const types = await vehicleService.getTypesByWheels(parseInt(wheels, 10));
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

exports.getVehicles = async (req, res, next) => {
  try {
    const { typeId } = req.params;
    if (!typeId) {
      return res
        .status(400)
        .json({ error: "Vehicle type ID must be provided." });
    }
    const vehicles = await vehicleService.getVehiclesByType(
      parseInt(typeId, 10)
    );
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};
