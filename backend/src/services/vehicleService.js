const { VehicleType, Vehicle } = require("../models");

/**
 * Fetches vehicle types based on the number of wheels.
 * @param {number} wheels - The number of wheels (2 or 4).
 * @returns {Promise<Array>} - A promise that resolves to an array of vehicle types.
 */

const getTypesByWheels = async (wheels) => {
  if (isNaN(wheels)) {
    throw new Error("Wheels parameter must be a number.");
  }
  return await VehicleType.findAll({
    where: { wheels: wheels },
  });
};

/**
 * Fetches vehicles based on their type ID.
 * @param {number} typeId - The ID of the vehicle type.
 * @returns {Promise<Array>} - A promise that resolves to an array of vehicles.
 */

const getVehiclesByType = async (typeId) => {
  if (isNaN(typeId)) {
    throw new Error("Type ID parameter must be a number.");
  }
  return await Vehicle.findAll({
    where: { vehicleTypeId: typeId },
  });
};

module.exports = {
  getTypesByWheels,
  getVehiclesByType,
};
