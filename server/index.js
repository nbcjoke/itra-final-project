require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const router = require("./router/index");
const authRouter = require("./router/auth");
const errorMiddleware = require("./middlewares/error-middleware");
const path = require("path");
const passportSetup = require("./passport");

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/static", express.static(path.join(__dirname, "static")));

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["nikita"],
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 100,
    signed: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use("/api", router);
app.use("/auth", authRouter);
app.use(errorMiddleware);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (err) {
    console.log("err", err);
  }
};

start();
