"use client";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ThemeToggle from "./toggleButton";

const Header = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div">
          Welcome to NoteX
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
