import { FC, useContext, useEffect } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/loginForm";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { observer } from "mobx-react-lite";

const Login: FC = () => {
  return <LoginForm />;
};

export default observer(Login);
