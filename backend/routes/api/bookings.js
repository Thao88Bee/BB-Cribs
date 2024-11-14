const express = require("express");
const bcrypt = require("bcryptjs");
const { Op, DATE, json } = require("sequelize");
const { requireAuth } = require("../../utils/auth");

const { Booking, User, Spot, SpotImage } = require("../../db/models");
const { now } = require("sequelize/lib/utils");

const router = express.Router();

// Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const { startDate, endDate } = req.body;

  const booking = await Booking.findByPk(bookingId);

  const bookingStartDate = new Date(booking.startDate);
  const bookingEndDate = new Date(booking.endDate);
  const currDate = new Date();

  const allBookingDates = await Booking.findAll({
    where: { id: bookingId },
    attributes: ["startDate", "endDate"],
  });

  const bookingDates = allBookingDates.flatMap((booking) => [
    new Date(booking.startDate).toISOString().split("T")[0],
    new Date(booking.endDate).toISOString().split("T")[0],
  ]);

  if (!booking) {
    res.statusCode = 404;
    res.json({ message: "Booking couldn't be found" });
  } else if (currDate >= bookingEndDate) {
    res.statusCode = 403;
    res.json({ message: "Past bookings can't be modified" });
  } else if (
    new Date(startDate) <= currDate ||
    new Date(endDate) <= new Date(startDate)
  ) {
    res.statusCode = 400;
    res.json({
      message: "Bad Request",
      errors: {
        startDate: "startDate cannot be in the past",
        endDate: "endDate cannot be on or before startDate",
      },
    });
  } else if (
    bookingDates.includes(startDate) ||
    bookingDates.includes(endDate)
  ) {
    res.statusCode = 403;
    res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      error: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  } else {
    await booking.update({
      startDate: startDate,
      endDate: endDate,
    });

    await booking.save();
    res.json(booking);
  }
});

// Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const bookingId = req.params.bookingId;

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    res.statusCode = 404;
    res.json({ message: "Booking couldn't be found" });
  } else if (new Date() > new Date(booking.startDate)) {
    res.statusCode = 403;
    res.json({ message: "Bookings that have been started can't be deleted" });
  } else {
    await booking.destroy();
    res.json({ message: "Successfully deleted" });
  }
});

module.exports = router;
