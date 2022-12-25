const ReviewModel = require("../models/review-model");
const Tag = require("../models/tags-model");

class ReviewController {
  async createReview(req, res, next) {
    try {
      const { name, theme, group, description, tags, images } = req.body.review;

      //   console.log(tags);
      const review = await ReviewModel.create({
        name,
        theme,
        group,
        description,
        tags,
      });

      return res.json(review);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getTags(req, res, next) {
    try {
      const tags = await Tag.find();

      return res.json(tags);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new ReviewController();
