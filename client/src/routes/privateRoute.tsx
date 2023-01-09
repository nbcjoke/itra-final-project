import { useContext, FC } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../index";

import { ROUTE_NAMES } from "./routeNames";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { store } = useContext(Context);
  console.log("here");

  console.log(store.isAuth);

  return store.isAuth ? children : <Navigate to={"../" + ROUTE_NAMES.LOGIN} />;
};
