import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Store from "./store/store";
import { ThemeContextProvider } from "./contexts/themeContext";
import App from "./App";
import "./i18next";

import "./reset.css";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider value={{ store }}>
    <BrowserRouter>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </BrowserRouter>
  </Context.Provider>
);
