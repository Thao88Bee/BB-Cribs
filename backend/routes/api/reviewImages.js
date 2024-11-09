const express = require("express");
const bcrypt = require("bcryptjs");
const { Op, DATE, json } = require("sequelize");
const { requireAuth } = require("../../utils/auth");

const { ReviewImage } = require("../../db/models");
const { now } = require("sequelize/lib/utils");

const router = express.Router();

router.delete("/:reviewImageId", requireAuth, async (req, res, next) => {
    const reviewImageId = req.params.reviewImageId;

    const reviewImage = await ReviewImage.findByPk(reviewImageId);

    if (!reviewImage) {
        res.statusCode = 404;
        res.json({ message: "Review Image couldn't be found" })
    } else {
        await reviewImage.destroy();
        res.json({ message: "Successfully deleted" })
    }
})


module.exports = router;
