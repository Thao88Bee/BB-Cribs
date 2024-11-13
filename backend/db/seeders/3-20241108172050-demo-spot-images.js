"use strict";

const { SpotImage } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spotImages = [
  {
    url: "image url",
    spotId: 1,
    preview: true,
  },
  {
    url: "image url",
    spotId: 2,
    preview: false,
  },
  {
    url: "image url",
    spotId: 3,
    preview: true,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: spotImages });
  },
};
