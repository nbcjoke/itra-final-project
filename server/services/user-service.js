const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, name, isAdmin) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequestError(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const date = new Date();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      name,
      isAdmin,
    });

    return user;
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      throw ApiError.BadRequestError("Пользователь с таким email не найден");
    }
    if (user.status) {
      throw ApiError.BadRequestError("Вы заблокированы");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequestError("Неверный пароль");
    }

    return user;
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const userDto = new UserDto(userData);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async deleteUsers(ids) {
    await UserModel.deleteMany({ _id: { $in: ids } });
  }

  async updateStatus(ids, status) {
    const users = await UserModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status } }
    );
    return users;
  }
}

module.exports = new UserService();
