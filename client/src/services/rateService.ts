import api from "../api/config";
import { AxiosResponse } from "axios";

export class RateService {
  static async addRate(
    user: object,
    review: object,
    rate: number
  ): Promise<AxiosResponse> {
    return api.post("/api/addRate", { user, review, rate });
  }
}
