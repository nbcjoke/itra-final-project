import { FC, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Context } from "../../index";
import { ThemeContext } from "../../contexts/themeContext";
import {
  Button,
  IconButton,
  useColorScheme,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import styles from "./style.module.css";

export const Navigation: FC = () => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("locale") || "en"
  );

  const { t, i18n } = useTranslation();

  const { store } = useContext(Context);

  const { mode, toggleTheme } = useContext(ThemeContext);
  const { setMode } = useColorScheme();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleChangeLanguage = (event: SelectChangeEvent<typeof language>) => {
    setLanguage(event.target.value);
    localStorage.setItem("locale", event.target.value);
  };

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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">
            {t("locale.locale")}
          </InputLabel>
          <Select
            value={language}
            label="locale"
            onChange={handleChangeLanguage}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
            {/* <MenuItem value="chi">Китай</MenuItem> */}
          </Select>
        </FormControl>
        <div>
          <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        {store.isAuth ? (
          <>
            <Link to="/profile">{t("profile.title")}</Link>
            <Button variant="contained" onClick={() => store.logout()}>
              {t("button.logout")}
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">{t("button.login")}</Link>
            <Link to="/signup">{t("button.signup")}</Link>
          </>
        )}
      </div>
    </div>
  );
};
