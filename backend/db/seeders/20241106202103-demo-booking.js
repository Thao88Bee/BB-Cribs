'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bookings = [
  {
    spotId: null,
    userId: 2,
    startDate: '2021-11-17',
    endDate: '2021-11-18',
  },
  {
    spotId: null,
    userId: 1,
    startDate: '2021-11-19',
    endDate: '2021-11-20',
  },
  {
    spotId: null,
    userId: 3,
    startDate: '2021-11-21',
    endDate: '2021-11-22',
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Booking.bulkCreate(bookings, { validate: true });
    } catch(err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: bookings });
  }
};