import api from "../api/config";
import { AxiosResponse } from "axios";
import { ReviewModel } from "../models/reviewModel";

export class ReviewService {
  static async createReview(review: ReviewModel): Promise<AxiosResponse> {
    return api.post("/review", { review });
  }

  static async getReviews(): Promise<any> {
    return api.get("/reviews").then((response: AxiosResponse) => response.data);
  }

  static async getUserReviews() {
    return api.get("/user/reviews");
  }
}
