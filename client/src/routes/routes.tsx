import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { SignUp } from "../pages/signUp";
import { Profile } from "../pages/profile";
import { ROUTE_NAMES } from "./routeNames";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.HOME} element={<Home />} />
      <Route path={ROUTE_NAMES.LOGIN} element={<Login />} />
      <Route path={ROUTE_NAMES.SIGNUP} element={<SignUp />} />
      <Route path={ROUTE_NAMES.PROFILE} element={<Profile />} />
    </Routes>
  );
};
