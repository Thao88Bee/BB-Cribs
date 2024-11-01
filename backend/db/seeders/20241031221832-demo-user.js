'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */

let options = {
  schema: {
    tableName: 'Users'
  }
};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
   await User.bulkCreate([
    {
      email: 'testing1@user.io',
      username: 'Testing-boi',
      hashedPassword: bcrypt.hashSync('password1')
    },
    {
      email: 'testing2@user.io',
      username: 'Testing-boi2',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'testing3@user.io',
      username: 'Testing-boi3',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
      email: 'testing4@user.io',
      username: 'chip-skylark4',
      hashedPassword: bcrypt.hashSync('password4')
    },
    {
      email: 'testing5@user.io',
      username: 'crim-chin5',
      hashedPassword: bcrypt.hashSync('password5')
    },
    {
      email: 'testing6@user.io',
      username: 'mordo-rig6',
      hashedPassword: bcrypt.hashSync('password6')
    }
   ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkCreate(options, {
      username: { [Op.in]: ['Testing-boi', 'Testing-boi2', 'Testing-boi3', 'chip-skylark4', 'crim-chin5', 'mordo-rig6']}
    }, {});
  }
};
