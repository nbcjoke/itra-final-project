const RateModel = require("../models/rate-model");
const ReviewModel = require("../models/review-model");

class RateController {
  async addRate(req, res, next) {
    try {
      const { review, rate } = req.body;

      console.log("rate add", req.user._id);

      let rateObj = await RateModel.findOne({
        review: review._id,
        user: req.user._id,
      });

      if (rateObj) {
        await rateObj.update({ rate });
      } else {
        rateObj = await RateModel.create({
          user: req.user._id,
          review: review._id,
          rate,
        });
      }

      rateObj = await rateObj.populate("user review");
      res.status(200).json(rateObj);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RateController();
