const express = require('express');
const { Op, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');
const { check }= require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot.js')
const { route } = require('./session.js')

const router = express.Router();


router.get('/spots', async (req, res, next) => {

})

module.exports = router;
