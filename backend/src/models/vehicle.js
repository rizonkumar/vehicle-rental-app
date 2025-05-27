"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {
      // Vehicle belongs to one VehicleType
      Vehicle.belongsTo(models.VehicleType, {
        foreignKey: "vehicleTypeId",
        as: "type",
      });
      // Vehicle has many Bookings
      Vehicle.hasMany(models.Booking, {
        foreignKey: "vehicleId",
        as: "bookings",
      });
    }
  }
  Vehicle.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      vehicleTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
