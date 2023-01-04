import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import Cookies from "js-cookie";

import { Context } from "./index";
import { Header } from "./components/header";
import { Router } from "./routes/routes";
import { ROUTE_NAMES } from "./routes/routeNames";

import "./App.css";

const App: FC = () => {
  const { store } = useContext(Context);

  const navigate = useNavigate();
  // const [cookies, setCookie] = useCookies(["session"]);

  console.log(Cookies.get("session"));

  useEffect(() => {
    console.log("cookie", Cookies.get("session"));
    const session = Cookies.get("session");
    if (session) {
      localStorage.setItem("token", session);
      Cookies.remove("session");
    }

    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};

export default observer(App);
