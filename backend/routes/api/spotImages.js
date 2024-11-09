const express = require("express");
const { Op } = require("sequelize");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { SpotImage, Spot, User, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Delete a Spot Image
router.delete("/:spotImageId", requireAuth, async (req, res, next) => {
    const spotImageId = req.params.spotImageId;

    const spotImage = await SpotImage.findByPk(spotImageId)

    if (!spotImage) {
        res.statusCode = 404;
        res.json({ message: "Spot Image couldn't be found" })
    } else {
        await spotImage.distroy();
        res.json({ message: "Successfully deleted" })
    }
})

module.exports = router;
