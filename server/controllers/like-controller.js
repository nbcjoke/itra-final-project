const LikeModel = require("../models/like-model");

class LikeController {
  async like(req, res, next) {
    try {
      const { user, review } = req.body;

      const result = await LikeModel.create({
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

module.exports = new LikeController();
