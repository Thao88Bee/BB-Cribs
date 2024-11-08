'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spots = [
  {
    ownerId: 1,
    address: "123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: 'United States of America',
    lat: 37.7645358,
    lng: -122.4730327,
    name: "App Academy",
    description: "Place where web developers are created",
    price: 123,
    avgRating: 3
  },
  {
    ownerId: 2,
    address: "456 Tech Drive",
    city: "Austin",
    state: "Texas",
    country: "United States of America",
    lat: 30.267153,
    lng: -97.7430608,
    name: "Code Camp",
    description: "Immersive coding bootcamp for aspiring developers",
    price: 499,
    avgRating: 2
  },
  {
    ownerId: 3,
    address: "789 Silicon Valley Rd",
    city: "Mountain View",
    state: "California",
    country: "United States of America",
    lat: 37.3861,
    lng: -122.0838,
    name: "Tech Innovators Hub",
    description: "A collaborative space for tech entrepreneurs and developers",
    price: 350,
    avgRating: 3
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(spots);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: spots });
  }
};
