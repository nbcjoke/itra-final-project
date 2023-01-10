import api from "../api/config";
import { AxiosResponse } from "axios";

export class LikeService {
  static async addLike(reviewId: string): Promise<AxiosResponse> {
    return api
      .post("/api/like", { reviewId })
      .then((response: AxiosResponse) => response.data);
  }
}
