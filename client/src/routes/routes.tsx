import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/home";
import Login from "../pages/login";
import { SignUp } from "../pages/signUp";
import { Profile } from "../pages/profile";
import { Category } from "../pages/category";
import { ReviewDetails } from "../pages/reviewDetails";
import { Admin } from "../pages/admin";
import { ROUTE_NAMES } from "./routeNames";
import { PrivateRoute } from "./privateRoute";
import { AdminRoute } from "./adminRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.HOME} element={<Home />} />
      <Route path={ROUTE_NAMES.LOGIN} element={<Login />} />
      <Route path={ROUTE_NAMES.SIGNUP} element={<SignUp />} />
      <Route path={ROUTE_NAMES.CATEGORY} element={<Category />} />
      <Route path={ROUTE_NAMES.REVIEW} element={<ReviewDetails />} />
      <Route
        path={ROUTE_NAMES.ADMIN}
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
      <Route
        path={ROUTE_NAMES.PROFILE}
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
