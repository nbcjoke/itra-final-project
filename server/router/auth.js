const Router = require("express").Router;
const router = new Router();
const passport = require("passport");
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

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

router.get("/github/callback", function (req, res, next) {
  passport.authenticate("github", { session: false }, (err, user, info) => {
    console.log("here");
    console.log(err);
    // Decide what to do on authentication
    if (err || !user) {
      return res.redirect(
        process.env.CLIENT_URL + "/login?error=" + info?.message
      );
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).send({ err });
      }
      const token = jwt.sign(user.toObject(), process.env.JWT_ACCESS_SECRET);
      res.cookie("token", token, {
        domain: process.env.DOMAIN_NAME,
      });
      res.redirect(process.env.CLIENT_URL + "/profile");
    });
  })(req, res, next);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", function (req, res, next) {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.redirect(
        process.env.CLIENT_URL + "/login?error=" + info?.message
      );
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).send({ err });
      }
      const token = jwt.sign(user.toObject(), process.env.JWT_ACCESS_SECRET);
      res.cookie("token", token, {
        domain: process.env.DOMAIN_NAME,
      });
      res.redirect(process.env.CLIENT_URL + "/profile");
    });
  })(req, res, next);
});

router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_liteprofile"],
  })
);

router.get("/linkedin/callback", function (req, res, next) {
  passport.authenticate("linkedin", { session: false }, (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.redirect(
        process.env.CLIENT_URL + "/login?error=" + info?.message
      );
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).send({ err });
      }
      const token = jwt.sign(user.toObject(), process.env.JWT_ACCESS_SECRET);
      res.cookie("token", token, {
        domain: process.env.DOMAIN_NAME,
      });
      res.redirect(process.env.CLIENT_URL + "/profile");
    });
  })(req, res, next);
});

module.exports = router;
