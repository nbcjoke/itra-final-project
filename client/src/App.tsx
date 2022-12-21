import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
// import { ThemeProvider } from "./contexts/themeContext";
import { Header } from "./components/header";
import { Router } from "./routes/routes";
import { ROUTE_NAMES } from "./routes/routeNames";
import { Context } from "./index";
import { Paper } from "@mui/material";

import "./App.css";

const App: FC = () => {
  const { store } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }

    if (store.isAuth) {
      navigate(ROUTE_NAMES.PROFILE);
    }
  }, [store.isAuth]);

  return (
    // <Paper>
    <div>
      <Header />
      <Router />
    </div>
    // </Paper>
  );
};

export default observer(App);
