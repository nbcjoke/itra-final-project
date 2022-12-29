import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "./index";
import { Header } from "./components/header";
import { Router } from "./routes/routes";
import { ROUTE_NAMES } from "./routes/routeNames";

import "./App.css";

const App: FC = () => {
  const { store } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store.isAuth]);

  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};

export default observer(App);
