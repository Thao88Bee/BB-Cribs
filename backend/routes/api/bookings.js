const express = require("express");
const bcrypt = require("bcryptjs");
const { Op, DATE, json } = require("sequelize");
const { requireAuth } = require("../../utils/auth");

const { Booking, User } = require("../../db/models");
const { now } = require("sequelize/lib/utils");

const router = express.Router();

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const data = req.body;

  const booking = await Booking.findByPk(bookingId);
  await Booking.update(
    {
      startDate: data.startDate,
      createdAt: data.startDate,
      endDate: data.endDate,
    },
    { where: { id: bookingId } }
  );

  await booking.save();
  res.json(booking);
});

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const bookingId = req.params.bookingId;

  const booking = await Booking.findOne({
    where: {
      id: bookingId,
      userId: userId,
    },
  });

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
