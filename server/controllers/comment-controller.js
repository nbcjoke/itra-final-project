const CommentModel = require("../models/comment-model");

class CommentController {
  async createComment(req, res, next) {
    try {
      const { text, review } = req.body;

      const result = await CommentModel.create({
        user: req.user._id,
        review,
        text,
      });
      const rateObject = await result.populate("user review");
      res.status(200).json(rateObject);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getComments(req, res, next) {
    try {
      const { reviewId } = req.params;
      console.log("here", reviewId);
      const result = await CommentModel.find({ review: reviewId }).populate(
        "review user"
      );
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new CommentController();
