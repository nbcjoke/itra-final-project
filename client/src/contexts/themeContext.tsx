import React, { useEffect, createContext, FC, useState } from "react";

// type Theme = "light" | "dark";
// type ThemeContext = { theme: Theme; toggleTheme: () => void };
// type ThemeProp = {
//   children: JSX.Element;
// };

// export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

// export const ThemeProvider: FC<ThemeProp> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>("light");

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const color = theme === "light" ? "#000" : "#fff";
//   const backgroundColor = theme === "light" ? "#fff" : "#000";

//   document.body.style.color = color;
//   document.body.style.background = backgroundColor;

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

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
    // localStorage.setItem("mode" || "light", mode);
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
