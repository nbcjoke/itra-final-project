const Router = require("express").Router;
const router = new Router();
const passport = require("passport");
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");

const CLIENT_URL = process.env.CLIENT_URL;

router.post("/login", userController.login);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 28 }),
  userController.registration
);
router.post("/logout", userController.logout);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  function (req, res) {
    console.log("radad");
    console.log(res);
    res.redirect("/");
  }
);

module.exports = router;
