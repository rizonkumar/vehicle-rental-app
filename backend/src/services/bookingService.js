const { Booking, User, Vehicle, sequelize } = require("../models");
const { Op, where } = require("sequelize");

// Custom Error Classes for specific issues
class BookingConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "BookingConflictError";
    this.statusCode = 409;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

/**
 * Creates a new vehicle booking.
 * @param {object} bookingData - Contains firstName, lastName, vehicleId, startDate, endDate.
 * @returns {Promise<object>} - A promise that resolves to the newly created booking object.
 * @throws {ValidationError|NotFoundError|BookingConflictError|Error} - Throws specific errors on failure.
 */

const createNewBooking = async (bookingData) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = bookingData;

  // Validation
  if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
    throw new ValidationError("All fields are required.");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new ValidationError("Invalid date format. Please use YYYY-MM-DD.");
  }

  if (start.getTime() === end.getTime()) {
    throw new ValidationError("Start Date and End Date cannot be same.");
  }
  if (start > end) {
    throw new ValidationError("End date must be after start date.");
  }

  const t = await sequelize.transaction();

  try {
    // Check Vehicle Existence ---
    const vehicle = await Vehicle.findByPk(vehicleId, { transaction: t });
    if (!vehicle) {
      throw new NotFoundError("Vehicle not found.");
    }

    // Concurrence Check ---
    const existingBooking = await Booking.findOne({
      where: {
        vehicleId: vehicleId,
        startDate: { [Op.lt]: end },
        endDate: { [Op.gt]: start },
      },
      transaction: t,
    });

    if (existingBooking) {
      const existingStart =
        existingBooking.startDate.toLocaleDateString("en-US");
      const existingEnd = existingBooking.endDate.toLocaleDateString("en-EN");

      throw new BookingConflictError(
        `Vehicle is already booked from ${existingStart} to ${existingEnd}. Please select different dates.`
      );
    }
    // Find or Create User ---
    const [user] = await User.findOrCreate({
      where: { firstName, lastName },
      defaults: { firstName, lastName },
      transaction: t,
    });
    // Create Booking
    const newBooking = await Booking.create(
      {
        userId: user.id,
        vehicleId: vehicleId,
        startDate: start,
        endDate: end,
      },
      { transaction: t }
    );
    await t.commit();
    return newBooking;
  } catch (error) {
    await t.rollback();
    if (
      error instanceof BookingConflictError ||
      error instanceof NotFoundError ||
      error instanceof ValidationError
    ) {
      throw error;
    }
    console.error("Internal booking service error:", error);
    throw new Error("An internal error occurred while creating the booking.");
  }
};

module.exports = {
  createNewBooking,
  BookingConflictError,
  NotFoundError,
  ValidationError,
};
