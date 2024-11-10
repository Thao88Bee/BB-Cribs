"use strict";

const { ReviewImage } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const reviewImages = [
  {
    url: "image url",
    reviewId: 1,
  },
  {
    url: "image url",
    reviewId: 2,
  },
  {
    url: "image url",
    reviewId: 3,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(reviewImages);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: reviewImages });
  },
};
