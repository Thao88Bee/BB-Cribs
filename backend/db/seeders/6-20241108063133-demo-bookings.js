"use strict";

const { DATE } = require("sequelize");
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
    startDate: new DATE("2024-12-20T11:00:00.000Z"),
    endDate: new DATE("2024-12-25T11:00:00.000Z"),
  },
  {
    spotId: 2,
    userId: 1,
    startDate: new DATE("2024-07-03T11:00:00.000Z"),
    endDate: new DATE("2024-07-10T11:00:00.000Z"),
  },
  {
    spotId: 1,
    userId: 3,
    startDate: new DATE("2024-11-06T11:00:00.000Z"),
    endDate: new DATE("2024-11-10T11:00:00.000Z"),
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
