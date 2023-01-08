import api from "../api/config";
import { AxiosResponse } from "axios";

export class ImageService {
  static async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);
    return api
      .post("/api/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response: AxiosResponse) => response.data.imagePath);
  }
}
