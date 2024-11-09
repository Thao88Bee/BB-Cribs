const express = require("express");
const { Op, Sequelize, ValidationError } = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, Booking, ReviewImage, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const spot = require("../../db/models/spot.js");
const { route } = require("./session.js");

const router = express.Router();

// Add Query Filters to Get All Spots
const spotQueryFilter = [
  check("page")
  .optional()
  .exists({ checkFalse: true })
  .isInt({ min: 1 })
  .withMessage("Page must be greater than or qual to 1"),
  check("size")
  .optional()
  .exists({ checkFalse: true})
  .isInt({ min: 1, max: 20 })
  .withMessage("Size must be between 1 and 20"),
  check("maxLat")
  .optional()
  .exists({ checkFalse: true })
  .isDecimal()
  .withMessage("Maximum latitude is invalid"),
  check("minLat")
  .optional()
  .exists({ checkFalse: true })
  .isDecimal()
  .withMessage("Minimum latitude is invalid"),
  check("minLng")
  .optional()
  .exists({ checkFalse: true })
  .isDecimal()
  .withMessage("Minimum longitude is invalid"),
  check("maxLng")
  .optional()
  .exists({ checkFalse: true })
  .isDecimal()
  .withMessage("Max longitude is invalid"),
  check("minPrice")
  .optional()
  .exists({ checkFalse: true })
  .isFloat({min: 0})
  .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
  .optional()
  .exists({ checkFalse: true })
  .isFloat({min: 0})
  .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors
];

// To validate a spot
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

// To validate a Review
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

// Get all Reviews by a Spot's id
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

// Get details of a Spot from an id
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

// Get all Spots / Add Query Filters to Get All Spots
router.get("/", spotQueryFilter, async (req, res, next) => {
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  if(size > 20) {
    size = 20
  }
  if(page > 10) {
    page = 10
  }
  let pagination = {};
  if(page, size) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }
  minPrice = parseFloat(minPrice);
  maxPrice = parseFloat(maxPrice);

  const spots = await Spot.findAll({
    attributes: {
      include: [
        [ sequelize.fn("ROUND", sequelize,fn("AVG", sequelize.col("Reviews.stars")),2), "avgRating"],
      ]
    },
    include: [
      {
        model: Review,
        attributes: []
      },
    ],
    where: {
      ...(minPrice && maxPrice ? { price: {[ Op.between]: [ minPrice, maxPrice]}}: {}),
      ...(minPrice && !maxPrice ? { price: {[ Op.gte ]: minPrice }}: {}),
      ...(!minPrice && maxPrice ? { price: {[ Op.lte]: maxPrice }}: {}),
    },
    group: ["Spot.id"],
    raw: true,
    ...pagination,
  });
   for(let spot of spots) {
     const image = await SpotImage.findAll({
      where: {
        [ Op.and ]: [
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
     } else {
      spot.previewImage = image[0]["url"];
     }
   }
   if(page && size) {
    res.json({
      "Spots": spots, page, size
    })
   } else {
    res.json({
      "Spots": spots
    })
   }
});

// Create a Review for a Spot based on the Spot's id
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

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/spotImages", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { url } = req.body;
  const spot = await Spot.findByPk(spotId);

  if(spot) {
    const image = await SpotImage.create({ url, spotId});

    const imageId = image.id;
    const imageInformation = await SpotImage.scope("defaultScope").findByPk(imageId);

    res.json(imageInformation);
  } else {
    res.status(404).json({
      "message": "pot couldn't be found",
    })
  }
});

// Create a Spot
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

// Edit a Spot
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

// Delete a Spot
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
