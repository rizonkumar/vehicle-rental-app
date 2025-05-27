"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    static associate(models) {
      // VehicleType has many Vehicles
      VehicleType.hasMany(models.Vehicle, {
        foreignKey: "vehicleTypeId",
        as: "vehicles",
      });
    }
  }
  VehicleType.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      wheels: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "VehicleType",
    }
  );
  return VehicleType;
};
