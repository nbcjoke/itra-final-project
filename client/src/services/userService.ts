import api from "../api/config";
import { AxiosResponse } from "axios";

import { UserModel } from "../models/userModel";

export class UserService {
  static async fetchUsers(): Promise<AxiosResponse> {
    return api
      .get<UserModel[]>("/api/users")
      .then((response: AxiosResponse) => response.data);
  }

  static async getCurrentUser(): Promise<UserModel> {
    return api
      .get<UserModel>("/api/user")
      .then((response: AxiosResponse) => response.data);
  }
}
