import { FC } from "react";
import { Header } from "./components/header";
import { Router } from "./routes/routes";

import "./App.css";

export const App: FC = () => {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};
