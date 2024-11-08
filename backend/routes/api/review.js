const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User, Spot, Review } = require('../../db/models');
const { Op } = require('sequelize');
const { route } = require('./session.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');
const { Sequelize } = require('sequelize');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//all reviews of current user
router.get('/users/:userId/reviews', requireAuth, async (req, res, next) => {
    const id = req.users.userId
    const reviews = await Review.findAll({
        where: {
            userId: id
        },
        raw: true
    });
    for(let review of reviews) {
        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']
            }
        });
        review.User = user;
        const spots = await Spot.findAll({
            where: {
                ownerId: id
            },
            raw: true
        });
    }
    res.json({ "Reviews": reviews})
});


module.exports = router
