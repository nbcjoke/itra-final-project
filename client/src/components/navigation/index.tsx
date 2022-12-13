import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { Context } from "../../index";

import styles from "./style.module.css";

export const Navigation: FC = () => {
  const { store } = useContext(Context);
  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__left}>
        <Link to="/">Home</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/info">Info</Link>
      </div>
      <div className={styles.navigation__right}>
        {!store.isAuth ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/Signup">Signup</Link>
          </>
        ) : (
          <Link to="/profile">Profile</Link>
        )}
      </div>
    </div>
  );
};
