import * as React from "react";
import { IconButton, useTheme } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SunnyIcon from "@mui/icons-material/Sunny";
import { ColorModeContext } from "../common/MuiThemeProvider";

const ThemeToggle = () => {
  const theme = useTheme();

  const colorMode = React.useContext(ColorModeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      color="inherit"
      aria-label="toggle light/dark mode"
    >
      {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <SunnyIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
