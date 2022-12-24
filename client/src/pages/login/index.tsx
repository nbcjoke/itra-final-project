import { FC, useContext, useEffect } from "react";

import { Button } from "@mui/material";
import { FacebookOutlined, LinkedIn, GitHub } from "@mui/icons-material";

import LoginForm from "../../components/loginForm";
import { observer } from "mobx-react-lite";

const Login: FC = () => {
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
