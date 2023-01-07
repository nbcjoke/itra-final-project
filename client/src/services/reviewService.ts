import api from "../api/config";
import { AxiosResponse } from "axios";
import { ReviewModel } from "../models/reviewModel";

export class ReviewService {
  static async createReview(review: ReviewModel): Promise<AxiosResponse> {
    return api.post("/api/review", { review });
  }

  static async getReviews(
    limit: number,
    offset: number,
    category?: string
  ): Promise<any> {
    return api
      .get(`/api/reviews`, {
        params: { limit, offset, category },
      })
      .then((response: AxiosResponse) => response.data);
  }

  static async getUserReviews() {
    return api.get("/api/user/reviews");
  }
}
