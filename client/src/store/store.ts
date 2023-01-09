import { UserModel } from "../models/userModel";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/authService";
import axios from "axios";
import api, { API_URL } from "../api/config";
import { ReviewService } from "../services/reviewService";
import { ReviewModel } from "../models/reviewModel";
import { UserService } from "../services/userService";

export default class Store {
  user = {} as UserModel;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: UserModel) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(email: string, password: string, name: string) {
    try {
      const response = await AuthService.registration(email, password, name);
      // localStorage.setItem("token", response.data.accessToken);
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      // this.setAuth(true);
      // this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.setAuth(false);
      this.setUser({} as UserModel);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const user = await UserService.getCurrentUser();
      // localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      // console.log(response.data);
      this.setUser(user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async createReview(review: ReviewModel) {
    try {
      const response = await ReviewService.createReview(review);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async updateUserReview(review: ReviewModel, reviewId: string) {
    try {
      await ReviewService.updateUserReview(review, reviewId);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
}
