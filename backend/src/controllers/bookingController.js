const bookingService = require("../services/bookingService");

exports.createBooking = async (req, res, next) => {
  try {
    const bookingData = req.body;
    const newBooking = await bookingService.createNewBooking(bookingData);
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    next(error);
  }
};
