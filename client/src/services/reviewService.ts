import api from "../api/config";
import { AxiosResponse } from "axios";
import { ReviewModel } from "../models/reviewModel";

export class ReviewService {
  static async createReview(review: ReviewModel): Promise<AxiosResponse> {
    return api.post("/review", { review });
  }
}
