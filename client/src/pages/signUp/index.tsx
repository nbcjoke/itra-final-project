import { FC } from "react";
import { useTranslation } from "react-i18next";

import SignUpForm from "../../components/signUpForm";
import { SocialAuth } from "../../components/socialAuth";
import { Divider, Chip } from "@mui/material";

import styles from "./style.module.css";

export const SignUp: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.signup}>
      <SignUpForm />
      <Divider orientation="vertical" flexItem>
        <Chip label={t("divider.or")} />
      </Divider>
      <SocialAuth />
    </div>
  );
};
