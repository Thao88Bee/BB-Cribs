const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { User, Booking, Spot, SpotImage, Review } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Get all Spots owned by the Current User
router.get("/:userId/spots", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const spots = await Spot.findAll({
     where: {
      ownerId: userId
     },
     attributes: {
      include: [ [ sequelize.fn("ROUND", sequelize.fn("AVG",sequelize.col("Reviews.stars")), 2), "avgRating"], ]
     },
     include: [
      {
        mode: Review,
        attributes: []
      },
     ],
     group: ["Spot.id"],
     raw :true
  });

   for(let spot of spots) {
    const image = await SpotImage.findAll({
      where: {
        [Op.and]: [
          {
             spotId: spot.id,
          },
          {
            preview: true
          }
        ]
      },
      raw: true
    });
     if(!image.length) {
      spot.previewImage = null;
     } else{
      spot.previewImage = image[0]["url"];
     }
   }
   res.json({ "Spots": spots})
});

// All Reviews of current User
router.get("/:userId/reviews", requireAuth, async (req, res, next) => {
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

// Get all of the Current User's Bookings
router.get("/:userId/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;

  const booking =  await Booking.findAll({
    where: { userId: user.id },
    include: [
      {
        model: Spot,
        attributes: { exclude: ["description", "avgRating"] }
      }
    ]
  })

  res.json({ Booking: booking });
})


module.exports = router;
