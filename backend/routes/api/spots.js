const express = require('express');
const { Op, Sequelize, ValidationError } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');
const { check }= require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot.js')
const { route } = require('./session.js')

const router = express.Router();

//CREATE SPOT
router.post('/spots', requireAuth, async (req, res, next) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.json(spot)
});
/////////////////////////////////////////////////////////////////////////////////////////

//DELETE SPOT
router.delete('/spots/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = req.params.spots;
    await spot.destroy();

     if(!spot) {
        res.status(404).json({
            "message": "Spot does not exist boi",
            "statusCode": 404
        })
     } else {
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
     }
})




module.exports = router;
