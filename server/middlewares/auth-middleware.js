const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next();
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next();
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next();
    }

    req.user = userData;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
