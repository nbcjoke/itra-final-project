import api from "../api/config";
import { AxiosResponse } from "axios";
import { RateModel } from "../models/rateModel";

export class RateService {
  static async addRate(
    user: object,
    review: object,
    rate: number
  ): Promise<AxiosResponse> {
    return api.post("/addRate", { user, review, rate });
  }

  static async getRate() {
    return api.get("/getRate");
  }
}
