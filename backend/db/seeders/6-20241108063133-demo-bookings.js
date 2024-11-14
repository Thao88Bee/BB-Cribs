"use strict";

const { Booking } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const bookings = [
  {
    spotId: 3,
    userId: 2,
    startDate: "2024-10-17",
    endDate: "2024-10-18",
  },
  {
    spotId: 2,
    userId: 1,
    startDate: "2024-12-19",
    endDate: "2024-12-20",
  },
  {
    spotId: 1,
    userId: 3,
    startDate: "2024-11-21",
    endDate: "2024-11-22",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(bookings);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: bookings });
  },
};
