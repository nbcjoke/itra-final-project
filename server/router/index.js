const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const reviewController = require("../controllers/review-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const passport = require("passport");

const CLIENT_URL = process.env.CLIENT_URL;

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
router.get("/tags", reviewController.getTags);

module.exports = router;
