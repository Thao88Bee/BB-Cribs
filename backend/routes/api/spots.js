const express = require('express');
const { Op, Sequelize, ValidationError } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');
const { check }= require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot.js')
const { route } = require('./session.js')

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
         .exists({checkFalse: true})
         .isLength({max: 50})
         .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
];

//CREATE SPOT
router.post('/spots', requireAuth, validateSpot, async (req, res, next) => {
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
//edit a spot
router.put('/spots/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    const { address, city, state, country, lat, lng, name, description, price} = req.body;
    if(address) {
        spot.address = address;
    }
    if(city) {
        spot.city = city;
    }
    if(state) {
        spot.state = state;
    }
    if(country) {
        spot.country = country;
    }
    if(lat) {
        spot.lat = lat
    }
    if(lng) {
        spot.lng = lng;
    }
    if(name) {
        spot.name = name;
    }
    if(description) {
        spot.description = description;
    }
    if(price) {
        spot.price = price;
    }

    await spot.save();
    res.json(spot)
});


//////////////////////////////////////////////////////////////////////////////
//DELETE SPOT
router.delete('/spots/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
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
