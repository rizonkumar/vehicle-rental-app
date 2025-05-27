"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const [vehicleTypes] = await queryInterface.sequelize.query(
      `SELECT id, name FROM "VehicleTypes";`
    );

    const typeMap = vehicleTypes.reduce((acc, type) => {
      acc[type.name] = type.id;
      return acc;
    }, {});

    if (
      !typeMap["Hatchback"] ||
      !typeMap["SUV"] ||
      !typeMap["Sedan"] ||
      !typeMap["Cruiser"] ||
      !typeMap["Sports"]
    ) {
      console.error(
        "Could not find all required vehicle types. Please run the vehicle-types seeder first."
      );
      return;
    }

    // 2. Insert Vehicles [cite: 8]
    await queryInterface.bulkInsert(
      "Vehicles",
      [
        {
          name: "Volkswagen Golf",
          vehicleTypeId: typeMap["Hatchback"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ford Focus",
          vehicleTypeId: typeMap["Hatchback"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Toyota RAV4",
          vehicleTypeId: typeMap["SUV"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jeep Wrangler",
          vehicleTypeId: typeMap["SUV"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Honda Civic",
          vehicleTypeId: typeMap["Sedan"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Toyota Camry",
          vehicleTypeId: typeMap["Sedan"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Harley-Davidson Sportster",
          vehicleTypeId: typeMap["Cruiser"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Royal Enfield Classic 350",
          vehicleTypeId: typeMap["Cruiser"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Sports Bikes
        {
          name: "Yamaha R6",
          vehicleTypeId: typeMap["Sports"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kawasaki Ninja 650",
          vehicleTypeId: typeMap["Sports"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vehicles", null, {});
  },
};
