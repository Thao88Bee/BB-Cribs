'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Spots', [
      {
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": 'United States of America',
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123
      },
      {
        "ownerId": 2,
        "address": "456 Tech Drive",
        "city": "Austin",
        "state": "Texas",
        "country": "United States of America",
        "lat": 30.267153,
        "lng": -97.7430608,
        "name": "Code Camp",
        "description": "Immersive coding bootcamp for aspiring developers",
        "price": 499
      },
      {
        "ownerId": 3,
        "address": "789 Silicon Valley Rd",
        "city": "Mountain View",
        "state": "California",
        "country": "United States of America",
        "lat": 37.3861,
        "lng": -122.0838,
        "name": "Tech Innovators Hub",
        "description": "A collaborative space for tech entrepreneurs and developers",
        "price": 350
      },
      {
        "ownerId": 1,
        "address": "101 Innovation Ave",
        "city": "New York",
        "state": "New York",
        "country": "United States of America",
        "lat": 40.712776,
        "lng": -74.005974,
        "name": "DevWorks Inc.",
        "description": "Helping developers build the next big thing",
        "price": 150
      },
      {
        "ownerId": 2,
        "address": "202 Startup Blvd",
        "city": "Los Angeles",
        "state": "California",
        "country": "United States of America",
        "lat": 34.052235,
        "lng": -118.243683,
        "name": "LaunchPad Academy",
        "description": "Accelerating the growth of the next generation of tech startups",
        "price": 275
      },
      {
        "ownerId": 3,
        "address": "303 Code Alley",
        "city": "Chicago",
        "state": "Illinois",
        "country": "United States of America",
        "lat": 41.878113,
        "lng": -87.629799,
        "name": "The Coding Factory",
        "description": "Hands-on training for full-stack web development",
        "price": 199
      },
      {
        "ownerId": 1,
        "address": "404 Cloud Lane",
        "city": "Seattle",
        "state": "Washington",
        "country": "United States of America",
        "lat": 47.606209,
        "lng": -122.332071,
        "name": "Cloud Dev Institute",
        "description": "Master cloud computing and DevOps tools for the modern era",
        "price": 499
      }
     ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
