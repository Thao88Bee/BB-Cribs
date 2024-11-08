const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");
const { User, Spot, Review, ReviewImage, SpotImage } = require("../../db/models");
const { Op } = require("sequelize");
const { route } = require("./session.js");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { Sequelize } = require("sequelize");

const router = express.Router();

const validatingReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//all reviews of current user
router.get("/users/:userId/reviews", requireAuth, async (req, res, next) => {
  const id = req.users.userId;
  const reviews = await Review.findAll({
    where: {
      userId: id,
    },
    raw: true,
  });
  for (let review of reviews) {
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: [
          "username",
          "hashedPassword",
          "createdAt",
          "updatedAt",
          "email",
        ],
      },
    });
    review.User = user;
    const spots = await Spot.findAll({
      where: {
        ownerId: id,
      },
      raw: true,
    });
  }
  res.json({ Reviews: reviews });
});
///////////////////////////////////////////////////////////////////////////////
//edit a review
router.put(
  "/reviews/:reviewsId",
  requireAuth,
  validatingReview,
  async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const editReview = await Review.findByPk(reviewId);
    const { review, stars } = req.body;

    if (review) {
      editReview.review = review;
    }
    if (stars) {
      editReview.stars = stars;
    }
    await editReview.save();
    res.json(editReview);
  }
);
//////////////////////////////////////////////////////////////////////////////////////////////////

//delete a review

router.delete("/reviews/:reviewsId", requireAuth, async (req, res, next) => {
  const reviewId = req.params.reviewsId;
  const deleteReview = await Review.findByPk(reviewId);

  await deleteReview.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});
///////////////////////////////////////////////////////////////////////////////////
//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if(spot) {
    const reviews = await Review.findAll({
      where: {
        spotId
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["username", "hashedPassword", "email", "createdAt", "updatedAt"]
          }
        },
        {
          model: ReviewImage,
          attributes: {
            exclude: ["reviewId", "createdAt", "updatedAt"]
          }
        },
      ]
    });
    res.json({ "Reviews": reviews })
  } else {
    res.status(404).json({
      "message": "Spot couldn't be found :("
    })
  }
});









module.exports = router;
