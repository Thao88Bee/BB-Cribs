const router = require("express").Router();

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const bookingsRouter = require("./bookings.js");
const spotsRouter = require("./spots.js");
const reviewsRouter = require("./review.js");
const reviewImages = require("./reviewImages.js");
const SpotImages = require("./spotImages.js")
const login = require("./login.js");
const signup = require("./signup.js");

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
const { restoreUser } = require("../../utils/auth.js");
// const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/login", login);

router.use("/signup", signup);

router.use("/users", usersRouter);

router.use("/bookings", bookingsRouter);

router.use("/spots", spotsRouter);

router.use("/reviews", reviewsRouter);

router.use("/reviewImages", reviewImages);

router.use("/spotImages", SpotImages)

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

// Keep this route to test frontend setup in Mod 5
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
// });

// router.get(
//     '/restore-user',
//     (req, res) => {
//         return res.json(req.user)
//     }
// );

// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

module.exports = router;
