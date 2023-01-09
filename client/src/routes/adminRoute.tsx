import { FC } from "react";
import { Navigate } from "react-router-dom";

import { ROUTE_NAMES } from "./routeNames";

interface AdminRouteProps {
  children: JSX.Element;
}

export const AdminRoute: FC<AdminRouteProps> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return user.isAdmin ? children : <Navigate to={ROUTE_NAMES.HOME} />;
};
