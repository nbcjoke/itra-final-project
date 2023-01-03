const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const reviewController = require("../controllers/review-controller");
const tagController = require("../controllers/tag-controller");
const RateController = require("../controllers/rate-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 28 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/user/delete", userController.deleteUsers);
router.put("/user/update", userController.updateStatus);

router.post("/review", reviewController.createReview);
router.get("/reviews", authMiddleware, reviewController.getReviews);
router.get("/user/reviews", reviewController.getUserReviews);
// router.get("/:category", reviewController.getReviewsByCategory);

router.post("/addRate", authMiddleware, RateController.addRate);
router.get("/getRate", RateController.getRate);

router.get("/tags", tagController.getTags);

module.exports = router;
