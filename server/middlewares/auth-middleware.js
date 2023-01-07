const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      const user = tokenService.validateAccessToken(token);
      req.user = user;
      return next();
    }

    return next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
