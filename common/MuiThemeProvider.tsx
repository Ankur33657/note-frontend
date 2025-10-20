"use client";

import * as React from "react";
import { ThemeProvider, Theme } from "@mui/material/styles";
import { createMuiTheme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const COLOR_MODE_STORAGE_KEY = "mui-color-mode";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem(COLOR_MODE_STORAGE_KEY) as
        | "light"
        | "dark"
        | null;

      return storedMode === "dark" ? "dark" : "light";
    }

    return "light";
  });

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";

          if (typeof window !== "undefined") {
            localStorage.setItem(COLOR_MODE_STORAGE_KEY, newMode);
          }
          return newMode;
        });
      },
      mode: mode,
    }),
    [mode],
  );

  const theme: Theme = React.useMemo(() => createMuiTheme(mode), [mode]);

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
