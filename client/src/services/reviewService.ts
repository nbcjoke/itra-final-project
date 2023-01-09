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
    sortBy?: string,
    category?: string
  ): Promise<any> {
    return api
      .get(`/api/reviews`, {
        params: { limit, offset, sortBy, category },
      })
      .then((response: AxiosResponse) => response.data);
  }

  static async getReviewDetails(reviewId: string): Promise<any> {
    return api
      .get(`/api/review/${reviewId}`)
      .then((response: AxiosResponse) => response.data);
  }

  static async deleteUserReview(id: string): Promise<any> {
    return api
      .post<any>(`/api/review/delete`, { id })
      .then((response: AxiosResponse) => response.data);
  }

  static async updateUserReview(
    review: ReviewModel,
    reviewId: string
  ): Promise<AxiosResponse> {
    return api.put("api/review/update", { review, reviewId });
  }

  static async getUserReviews(userId: string) {
    return api.get("/api/user/reviews", { params: { userId } });
  }
}
