const express = require("express");
const { Op } = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { SpotImage, Spot, User, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Delete a Spot Image





module.exports = router;
