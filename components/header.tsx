"use client";

import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
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
        <Avatar
          src="/avatar.png"
          alt="User Avatar"
          style={{ marginLeft: "0.5rem", cursor: "pointer" }}
        />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
