const RateModel = require("../models/rate-model");
const ReviewModel = require("../models/review-model");

class RateController {
  async addRate(req, res, next) {
    try {
      const { user, review, rate } = req.body;
      console.log(req.body);

      const reviewById = await ReviewModel.find({ _id: review.id });

      const result = await RateModel.create({
        user: user._id,
        review: review._id,
        rate,
      });
      const rateObject = await result.populate("user review");
      console.log(rateObject);
      res.status(200).json(rateObject);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new RateController();
