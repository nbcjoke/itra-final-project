const ReviewModel = require("../models/review-model");
const RateModel = require("../models/rate-model");

class ReviewController {
  async createReview(req, res, next) {
    try {
      const { name, theme, group, description, tags, images, rate } =
        req.body.review;
      const user = req.user._id;
      const result = await ReviewModel.create({
        name,
        theme,
        group,
        description,
        tags,
        rate,
        user,
        images,
      });

      const review = await result.populate("user");

      return res.json(review);
    } catch (err) {
      next(err);
    }
  }

  async getReviews(req, res, next) {
    try {
      const { limit, offset, sortBy, category } = req.query;
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
          const rate = rates
            .filter((rate) => !!rate.review)
            .find((rate) => {
              return rate.review._id.equals(review._id);
            });
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
        review.averageRate = averageRate[0]?.rate || 0;
      }
      const startIndex = (offset - 1) * limit;
      const endIndex = offset * limit;
      let result = [];
      if (sortBy) {
        result = reviews
          .sort((a, b) => (a.averageRate > b.averageRate ? -1 : 1))
          .slice(startIndex, endIndex);
      } else {
        result = reviews.reverse().slice(startIndex, endIndex);
      }
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getReviewDetails(req, res, next) {
    try {
      const { id } = req.params;

      const result = await ReviewModel.findOne({ _id: id }).populate("user");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getUserReviews(req, res, next) {
    try {
      const userId = req.query.userId;
      const result = await ReviewModel.find({ user: userId }).populate("user");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteUserReview(req, res, next) {
    try {
      const { id } = req.body;

      const reviews = await ReviewModel.deleteOne({ _id: id });
      res.status(200).json(reviews);
    } catch (err) {
      next(err);
    }
  }

  async updateUserReview(req, res, next) {
    try {
      const { name, theme, group, description, tags, images, rate } =
        req.body.review;
      const { reviewId } = req.body;

      const result = await ReviewModel.find({ _id: reviewId }).updateOne({
        name,
        theme,
        group,
        description,
        tags,
        rate,
        images,
      });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ReviewController();
