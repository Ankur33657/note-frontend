"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#9C27B0",
    },
    background: {
      default: "#a4e3f5",
    },
  },
  typography: {},

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },

        outlined: {
          borderColor: "#1976D2",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
  },
});

export default theme;
