import React, { FC, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { Context } from "../../index";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const SignUpForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { store } = useContext(Context);

  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "250px",
          margin: "35vh auto 0",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        <TextField
          label={t("signup.email")}
          variant="outlined"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          label={t("signup.password")}
          variant="outlined"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <TextField
          label={t("signup.name")}
          variant="outlined"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
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
          variant="outlined"
          onClick={(e) => store.registration(email, password, name)}
        >
          {t("button.signup")}
        </Button>
      </div>
    </>
  );
};

export default observer(SignUpForm);
