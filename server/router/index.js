const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const reviewController = require("../controllers/review-controller");
const tagController = require("../controllers/tag-controller");
const rateController = require("../controllers/rate-controller");
const likeController = require("../controllers/like-controller");
const commentController = require("../controllers/comment-controller");
const router = new Router();
const passport = require("passport");
const multer = require("multer");

router.get("/users", userController.getUsers);
router.post("/user/delete", userController.deleteUsers);
router.put("/user/update", userController.updateStatus);
router.get("/user", userController.getCurrentUser);

router.post("/create/review/:userId", reviewController.createReview);
router.get("/reviews", reviewController.getReviews);
router.get("/user/reviews", reviewController.getUserReviews);
router.post("/review/delete", reviewController.deleteUserReview);
router.get("/review/:id", reviewController.getReviewDetails);
router.put("/review/update", reviewController.updateUserReview);

router.post("/addRate", passport.authenticate("jwt"), rateController.addRate);

router.post("/like", passport.authenticate("jwt"), likeController.like);

router.get("/tags", tagController.getTags);

router.get("/comments/:reviewId", commentController.getComments);
router.post("/comment", commentController.createComment);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/images/");
  },
  filename: function (req, file, cb) {
    if (file.originalname.split(".").length > 1)
      ext = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

router.post("/images", upload.single("image"), (req, res) => {
  res.send({ imagePath: req.file.destination + req.file.filename });
});

module.exports = router;
