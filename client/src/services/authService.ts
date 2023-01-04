import api from "../api/config";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/authResponse";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post("/auth/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
    name: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post("/auth/registration", { email, password, name });
  }

  static async logout(): Promise<void> {
    return api.post("/auth/logout");
  }
}
