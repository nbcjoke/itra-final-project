const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user-model");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

GITHUB_CLIENT_ID = "a65adb5f605ff86cc1bb";
GITHUB_CLIENT_SECRET = "14668057091bcbc84a7f52d1cc8e86454bb442e6";

GOOGLE_CLIENT_ID =
  "653876119755-vd83ih8e8kjtorarjtef9o8j9ufsqd6j.apps.googleusercontent.com";
GOOGLE_CLIENT_SECRET = "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";

LINKEDIN_CLIENT_ID = "78482popifpmf4";
LINKEDIN_CLIENT_SECRET = "nEd9Dhr3DYsjvWuv";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
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

passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: "/auth/linkedin/callback",
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

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://immense-scrubland-98892.herokuapp.com/auth/github/callback",
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
    console.log(jwt_payload);
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
