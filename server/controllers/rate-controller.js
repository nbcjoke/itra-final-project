const RateModel = require("../models/rate-model");

class RateController {
  async addRate(req, res, next) {
    try {
      const { user, review, rate } = req.body;
      console.log(req.body);

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

  async getRate(req, res) {
    try {
      const result = await RateModel.find().populate("user review");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RateController();
