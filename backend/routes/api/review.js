const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth.js");
const {
  User,
  Spot,
  Review,
  ReviewImage,
  sequelize,
  SpotImage,
} = require("../../db/models");
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

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/reviewImages", requireAuth, async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId);
  const findReviewImage = await ReviewImage.findAll({
    where: {
      reviewId,
    },
  });

  if (!review) {
    res.statusCode = 404;
    res.json({ message: "Review couldn't be found" });
  }

  if (findReviewImage.length === 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }
  const { url } = req.body;
  const addImage = await ReviewImage.create({
    reviewId,
    url,
  });
  const imageInfo = await Review.scope("defaultScope").findByPk(addImage.id);
  res.json(findReviewImage);
});

// Edit a Review
router.put(
  "/:reviewsId",
  requireAuth,
  validatingReview,
  async (req, res, next) => {
    const reviewId = req.params.reviewsId;
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

//Delete a Review
router.delete("/:reviewsId", requireAuth, async (req, res, next) => {
  const reviewId = req.params.reviewsId;
  const deleteReview = await Review.findByPk(reviewId);

  if (!deleteReview) {
    res.statusCode = 404;
    res.json({ message: "Review couldn't be found" });
  }

  await deleteReview.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
