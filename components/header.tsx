"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import ThemeToggle from "./toggleButton";
import { useRouter, usePathname } from "next/navigation";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import NotesIcon from "@mui/icons-material/Description";
import FeedIcon from "@mui/icons-material/DynamicFeed";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPath = pathname === "/login" || pathname === "/signup";

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const res = await fetch(`${apiUrl}/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Logout failed with status: ${res.status}`);
      }
      router.push("/login");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Welcome to NoteX
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggle />
        {!isAuthPath && (
          <Avatar
            src="/avatar.png"
            alt="User Avatar"
            onClick={handleAvatarClick}
            sx={{
              ml: 1.5,
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        )}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              borderRadius: 3,
              minWidth: 180,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1f1f1f" : "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              router.push("/notes");
              handleClose();
            }}
          >
            <ListItemIcon>
              <NotesIcon fontSize="small" />
            </ListItemIcon>
            My Notes
          </MenuItem>

          <MenuItem
            onClick={() => {
              {
                router.push("/feed");
                handleClose();
              }
            }}
          >
            <ListItemIcon>
              <FeedIcon fontSize="small" />
            </ListItemIcon>
            Feed
          </MenuItem>

          <MenuItem
            onClick={() => {
              router.push("/saved");
              handleClose();
            }}
          >
            <ListItemIcon>
              <CreditCardIcon fontSize="small" />
            </ListItemIcon>
            Card Notes
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              handleLogout();
              handleClose();
            }}
            sx={{ color: "error.main", fontWeight: 500 }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
