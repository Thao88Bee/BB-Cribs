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
  check("lat").isDecimal().withMessage("Latitude is not valid"),
  check("lng").isDecimal().withMessage("Longitude is not valid"),
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



//Get details of a Spot from an id
router.get("/spots/:spotId", async (req, res, next) => {
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

module.exports = router;
