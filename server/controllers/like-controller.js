const LikeModel = require("../models/like-model");

class LikeController {
  async like(req, res, next) {
    try {
      const { reviewId } = req.body;

      let like = await LikeModel.findOne({
        user: req.user.id,
        review: reviewId,
      });
      console.log(like);

      if (!like) {
        like = await LikeModel.create({
          user: req.user._id,
          review: reviewId,
        });
      } else {
        await LikeModel.deleteOne({
          user: req.user._id,
          review: reviewId,
        });
      }

      const likeObj = await like.populate("user review");
      res.status(200).json(likeObj);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new LikeController();
