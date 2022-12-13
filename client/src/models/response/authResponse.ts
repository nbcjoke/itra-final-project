import { UserModel } from "../userModel";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}
