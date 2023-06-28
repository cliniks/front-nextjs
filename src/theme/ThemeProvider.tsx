import { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import { themeCreator } from "./base";

export const ThemeContext = createContext((themeName: string): void => {});

const ThemeProviderWrapper = ({ children }: any) => {
  const acceptedThemes = ["CliniksTheme"];
  const LocalStorageTheme =
    typeof window !== "undefined" && localStorage.getItem("appTheme");

  const curThemeName = LocalStorageTheme
    ? localStorage.getItem("appTheme")
    : "CliniksTheme";

  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);

  const setThemeName = (themeName: string): void => {
    if (typeof window !== "undefined") {
      if (themeName !== "CliniksTheme") {
        typeof window !== "undefined" &&
          localStorage.setItem("appTheme", "CliniksTheme");
        _setThemeName(themeName);
      }
      typeof window !== "undefined" &&
        localStorage.setItem("appTheme", themeName);
      _setThemeName(themeName);
    }
  };

  if (!acceptedThemes.includes(LocalStorageTheme)) setThemeName("CliniksTheme");

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
