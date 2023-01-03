const ReviewModel = require("../models/review-model");
const RateModel = require("../models/rate-model");
const userModel = require("../models/user-model");

class ReviewController {
  async createReview(req, res, next) {
    try {
      const { name, theme, group, description, tags, images, rate, user } =
        req.body.review;
      const result = await ReviewModel.create({
        name,
        theme,
        group,
        description,
        tags,
        rate,
        user,
      });

      const review = await result.populate("user");

      return res.json(review);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getReviews(req, res, next) {
    try {
      const { limit, offset, category } = req.query;
      let query = ReviewModel.find();
      if (category) {
        query = query.find({ group: category });
      }
      let reviews = await query.lean();
      if (req.user) {
        const rates = await RateModel.find({ user: req.user._id }).populate(
          "review"
        );
        reviews = reviews.map((review) => {
          const rate = rates.find((rate) => {
            return rate.review._id.equals(review._id);
          });
          console.log(rate);
          review.userRate = rate?.rate || 0;
          return review;
        });
      }
      for (let review of reviews) {
        const averageRate = await RateModel.aggregate([
          { $match: { review: review._id } },
          {
            $group: {
              _id: "$review",
              rate: { $avg: "$rate" },
            },
          },
        ]);
        review.averageRate = averageRate[0]?.rate;
      }
      const startIndex = (offset - 1) * limit;
      const endIndex = offset * limit;
      const result = reviews.reverse().slice(startIndex, endIndex);
      return res.json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getReviewsByCategory(req, res, next) {
    try {
      const { category } = req.params;

      const reviews = await ReviewModel.find({ group: category });

      return res.json(reviews.reverse());
    } catch (err) {
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
