import { UserModel } from "./userModel";
export interface ReviewModel {
  _id: string;
  name: string;
  theme: string;
  description: string;
  tags: string[];
  group: string;
  rate: number;
  user: UserModel;
  userRate?: number;
  averageRate?: number;
  images: string[];
  liked: boolean;
  likes: number;
}
