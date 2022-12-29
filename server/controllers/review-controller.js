const ReviewModel = require("../models/review-model");

class ReviewController {
  async createReview(req, res, next) {
    try {
      const { name, theme, group, description, tags, images, rate } =
        req.body.review;
      const review = await ReviewModel.create({
        name,
        theme,
        group,
        description,
        tags,
        rate,
      });

      return res.json(review);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getReviews(req, res, next) {
    try {
      const reviews = await ReviewModel.find();

      return res.json(reviews.reverse());
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getUserReviews(req, res, next) {
    try {
      const result = await ReviewModel.find().populate("user");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new ReviewController();
