import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { Context } from "../../index";
import { ROUTE_NAMES } from "../../routes/routeNames";
import LoginForm from "../../components/loginForm";
import { SocialAuth } from "../../components/socialAuth";
import { Divider, Chip } from "@mui/material";

import styles from "./style.module.css";
import { UserService } from "../../services/userService";

const Login: FC = () => {
  const { store } = useContext(Context);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const getUser = async () => {
    return await UserService.getCurrentUser();
  };

  useEffect(() => {
    if (store.isAuth) {
      navigate(`/profile/${store.user._id}`);
    }
  }, [store.isAuth]);

  return (
    <div className={styles.login}>
      <LoginForm />
      <Divider orientation="vertical" flexItem>
        <Chip label={t("divider.or")} />
      </Divider>
      <SocialAuth />
    </div>
  );
};

export default observer(Login);
