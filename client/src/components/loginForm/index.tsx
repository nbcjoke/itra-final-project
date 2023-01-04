import React, { FC, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { Context } from "../../index";
import { Button, TextField, Paper } from "@mui/material";

import styles from "./style.module.css";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useContext(Context);

  const { t } = useTranslation();

  return (
    <form>
      <div className={styles.login}>
        <TextField
          label={t("login.email")}
          variant="outlined"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          label={t("login.password")}
          variant="outlined"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "30px",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => store.login(email, password)}
        >
          {t("button.login")}
        </Button>
      </div>
    </form>
  );
};

export default observer(LoginForm);
