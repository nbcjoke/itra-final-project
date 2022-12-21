import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Button, IconButton, useColorScheme } from "@mui/material";
import { Context } from "../../index";

import styles from "./style.module.css";
import { ThemeContext } from "../../contexts/themeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

export const Navigation: FC = () => {
  const { store } = useContext(Context);

  const { mode, toggleTheme } = useContext(ThemeContext);
  const { setMode } = useColorScheme();

  const changeTheme = () => {
    toggleTheme();
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__left}>
        <Link to="/">Home</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/info">Info</Link>
      </div>
      <div className={styles.navigation__right}>
        <div>
          {mode} mode
          <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        {store.isAuth ? (
          <>
            <Link to="/profile">Profile</Link>
            <Button variant="contained" onClick={() => store.logout()}>
              logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/Signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};
