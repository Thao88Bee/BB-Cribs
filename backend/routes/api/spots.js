const express = require("express");
const { Op, Sequelize, ValidationError } = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, Booking, ReviewImage, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const spot = require("../../db/models/spot.js");
const { route } = require("./session.js");

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required boi"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required boi"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required boi"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required dood"),
  check("lat").isDecimal().withMessage("Latitude must be within -90 and 90"),
  check("lng").isDecimal().withMessage("Longitude must be within -180 and 180"),
  check("name")
    .exists({ checkFalse: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

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



/////////////////////////////////////////////////////////////////////////////
//Get all Spots owned by the Current User
router.get("/users/:userId/spots", requireAuth, async (req, res, next) => {
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

//////////////////////////////////////////////
//Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Review,
        attributes: []
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"]
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"]
      }
    ],
     attributes: {
      include: [
        [
          sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 2), "avgStarRating"
        ],
      ]
     },
     group: ["Owner.id", "Reviews.id", "SpotImages.id", "Spot.id"],
  });
   if(spot) {
    res.json(spot);
   } else{
    res.status(404)
    .json({
      "message": "Spot couldn't be found"
    })
   }
});
////////////////////////////////////////////////////////////////////////////
//Create a Spot
router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
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
    price,
  });
  res.json(spot);
});
/////////////////////////////////////////////////////////////////////////////////////////

//Add an Image to a Spot based on the Spot's id
router.post("/:spotId/spotImages", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(spotId);

  if(spot) {
    const image = await SpotImage.create({ url, preview, spotId});

    const imageId = image.id;
    const imageInformation = await SpotImage.scope("defaultScope").findByPk(imageId);

    res.json(imageInformation);
  } else {
    res.status(404).json({
      "message": "pot couldn't be found",
    })
  }
});

/////////////////////////////////////////////////////////////////////////////////////
//Edit a Spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  if (address) {
    spot.address = address;
  }
  if (city) {
    spot.city = city;
  }
  if (state) {
    spot.state = state;
  }
  if (country) {
    spot.country = country;
  }
  if (lat) {
    spot.lat = lat;
  }
  if (lng) {
    spot.lng = lng;
  }
  if (name) {
    spot.name = name;
  }
  if (description) {
    spot.description = description;
  }
  if (price) {
    spot.price = price;
  }

  await spot.save();
  res.json(spot);
});

// Get Booking From SpotId
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);
  const booking = await Booking.findAll({
    where: { spotId: spotId }
  })

  console.log(user.id);


  if (!spot) {
    res.statusCode = 404;
    res.json({ message: "Spot couldn't be found" })
  } else if (user.id) {
    res.json( "need fixing" )
  } else {
    res.json({ Booking: booking })
  }

})

//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.statusCode = 404;
    res.json({ message: "Spot couldn't be found" });
  } else {
    await spot.destroy();
    res.json({ message: "Successfully deleted" });
  }
});
//////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////
//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, validatingReview, async (req, res, next) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if(!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found :(",
      "statusCode": 404
    })
  }

  const review = await Review.findOne({
    where: {
      [Op.and]: [
        {
          spotId
        },
        {
          userId
        }
      ]
    }
  });
  if(review) {
    return res.status(500).json({
      "message": "User already has a review for this spot",
      "statusCode": 500
    })
  } else {
     const { review, stars} = req.body;
     const newReview = await Review.create({
      userId, spotId, review, stars
     });
     res.json(newReview);
  }
});

module.exports = router;
