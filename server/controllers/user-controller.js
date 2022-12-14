const userService = require("../services/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const jwt = require("jsonwebtoken");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.badRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password, name } = req.body;
      const isAdmin = false;
      const userData = await userService.registration(
        email,
        password,
        name,
        isAdmin
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET);
      res.cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ user, token });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const token = await userService.logout();
      res.clearCookie("token");
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      return res.json(req.user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUsers(req, res, next) {
    try {
      const { ids } = req.body;
      await userService.deleteUsers(ids);
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { ids, status } = req.body;
      const users = await userService.updateStatus(ids, status);
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
