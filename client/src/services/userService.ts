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

  //   static deleteUsers(ids: string[]): Promise<any> {
  //     return api.post<any>(`/user/delete`, { ids });
  //   }

  //   static updateStatus(ids: string[], status: boolean): Promise<any> {
  //     return api.put<any>(`/user/update`, { ids, status });
  //   }
}
