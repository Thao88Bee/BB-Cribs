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
    startDate: new DATE(),
    endDate: new DATE(),
  },
  {
    spotId: 2,
    userId: 1,
    startDate: new DATE(),
    endDate: new DATE(),
  },
  {
    spotId: 1,
    userId: 3,
    startDate: new DATE(),
    endDate: new DATE(),
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
