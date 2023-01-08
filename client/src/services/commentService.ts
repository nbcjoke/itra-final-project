import api from "../api/config";
import { AxiosResponse } from "axios";

export class CommentService {
  static async sendComment(
    text: string,
    review: string
  ): Promise<AxiosResponse> {
    return api
      .post("/api/comment", { text, review })
      .then((response: AxiosResponse) => response.data);
  }

  static async getComments(reviewId: string): Promise<any> {
    return api
      .get(`/api/comments/${reviewId}`)
      .then((response: AxiosResponse) => response.data);
  }
}
