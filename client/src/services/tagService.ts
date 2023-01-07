import api from "../api/config";
import { AxiosResponse } from "axios";

export class TagService {
  static async getTags(): Promise<any> {
    return api
      .get("/api/tags")
      .then((response: AxiosResponse) => response.data);
  }
}
