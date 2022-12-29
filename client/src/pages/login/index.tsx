import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../../index";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { Button } from "@mui/material";
import { FacebookOutlined, LinkedIn, GitHub } from "@mui/icons-material";

import LoginForm from "../../components/loginForm";
import { observer } from "mobx-react-lite";

const Login: FC = () => {
  const { store } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (store.isAuth) {
      navigate(ROUTE_NAMES.PROFILE);
    }
  }, [store.isAuth]);

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return (
    <div>
      <LoginForm />
      <Button variant="contained" endIcon={<FacebookOutlined />}>
        Facebook
      </Button>
      <Button variant="contained" endIcon={<LinkedIn />}>
        LinkedIn
      </Button>
      <Button variant="contained" endIcon={<GitHub />} onClick={github}>
        Github
      </Button>
    </div>
  );
};

export default observer(Login);
