"use strict";

const { Review } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const reviews = [
  {
    spotId: 1,
    userId: 2,
    review: "This was an awesome spot!",
    stars: 5,
  },
  {
    spotId: 1,
    userId: 3,
    review: "Great atmosphere, will definitely come back!",
    stars: 4,
  },
  {
    spotId: 2,
    userId: 3,
    review: "Not bad, but could use some improvements.",
    stars: 3,
  },
  {
    spotId: 3,
    userId: 2,
    review: "Absolutely terrible experience. Will not return.",
    stars: 1,
  },
  {
    spotId: 2,
    userId: 2,
    review: "Lovely spot! Staff were friendly and the food was great.",
    stars: 4,
  },
  {
    spotId: 3,
    userId: 1,
    review: "Perfect for a relaxing afternoon. Highly recommend it!",
    stars: 5,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(reviews);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: reviews });
  },
};
