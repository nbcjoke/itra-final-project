const ApiError = require("../exceptions/api-error");
const userModel = require("../models/user-model");
const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      const user = tokenService.validateAccessToken(token);
      req.user = await userModel.findOne({ _id: user._id });
      return next();
    }

    return next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
