const Router = require("express").Router;
const router = new Router();
const passport = require("passport");

const CLIENT_URL = process.env.CLIENT_URL;

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

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
