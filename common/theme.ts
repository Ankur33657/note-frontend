import { createTheme, PaletteMode } from "@mui/material/styles";
import { blue, deepPurple, grey } from "@mui/material/colors";

export const createMuiTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#1976D2",
            },
            secondary: {
              main: "#9C27B0",
            },
            background: {
              default: grey[50],
            },
          }
        : {
            primary: {
              main: blue[300],
            },
            secondary: {
              main: deepPurple[300],
            },
            background: {
              default: grey[900],
              paper: grey[800],
            },
          }),
    },
    typography: {},
    components: {
      MuiButton: {
        defaultProps: { variant: "contained", disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 8, textTransform: "none" },
          outlined: {
            borderColor: mode === "light" ? "#1976D2" : blue[300],
            "&:hover": {
              backgroundColor: mode === "light" ? "#f5f5f5" : grey[700],
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined", fullWidth: true, size: "small" },
        styleOverrides: { root: { marginBottom: "1rem" } },
      },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: 8 } },
      },
    },
  });
