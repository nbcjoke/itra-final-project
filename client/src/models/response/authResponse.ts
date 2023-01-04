import { UserModel } from "../userModel";

export interface AuthResponse {
  token: string;
  user: UserModel;
}
