import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Cookies from "js-cookie";

import { Context } from "./index";
import { Header } from "./components/header";
import { Router } from "./routes/routes";

import "./App.css";

const App: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      localStorage.setItem("token", token);
      Cookies.remove("token");
    }

    if (localStorage.getItem("token") && !store.isAuth) {
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
