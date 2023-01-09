import api from "../api/config";
import { AxiosResponse } from "axios";

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse> {
    return api.post("/auth/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
    name: string
  ): Promise<AxiosResponse> {
    return api.post("/auth/registration", { email, password, name });
  }

  static async logout(): Promise<void> {
    return api.post("/auth/logout");
  }
}
