import React, { createContext, FC, useState } from "react";

import {
  createTheme,
  ThemeProvider,
  Experimental_CssVarsProvider,
} from "@mui/material";

type Mode = "light" | "dark";

interface ThemeProps {
  toggleTheme: () => void;
  mode: Mode;
}

type ThemeContextProps = {
  children: JSX.Element;
};

export const ThemeContext = createContext<ThemeProps>({
  toggleTheme: () => {},
  mode: "light",
});

export const ThemeContextProvider: FC<ThemeContextProps> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(
    (localStorage.getItem("mui-mode") as Mode) || "light"
  );

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#c45278",
        contrastText: "#fff",
      },
      secondary: {
        main: "#000",
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Experimental_CssVarsProvider>{children}</Experimental_CssVarsProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
