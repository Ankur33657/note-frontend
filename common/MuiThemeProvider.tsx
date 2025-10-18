"use client";

import * as React from "react";
import { ThemeProvider, Theme } from "@mui/material/styles";
import { createMuiTheme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

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
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
