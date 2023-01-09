const TagModel = require("../models/tags-model");

class TagController {
  async getTags(req, res, next) {
    try {
      const tags = await TagModel.find();

      return res.json(tags);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TagController();
