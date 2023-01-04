const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const User = require("./models/user-model");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

GITHUB_CLIENT_ID = "a65adb5f605ff86cc1bb";
GITHUB_CLIENT_SECRET = "14668057091bcbc84a7f52d1cc8e86454bb442e6";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      //   const user = await User.findOrCreate({ githubId: profile.id });
      //   done(null, user);
      const user = User.findOrCreate(
        { email: profile.email, name: profile.displayName },
        function (err, user) {
          console.log(user);
          return done(null, user);
        }
      );
    }
  )
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_ACCESS_SECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("gfdgfgfd", jwt_payload);
    User.findOne({ id: jwt_payload.email }, function (err, user) {
      console.log("here");
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
