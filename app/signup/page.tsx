"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const theme = useTheme();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: "16px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Box
          component="img"
          src="/notex.webp"
          alt="NoteX"
          sx={{ width: 64, height: 64, mx: "auto", mb: 2, borderRadius: "50%" }}
        />

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Welcome to NoteX
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Think Better. Write Smarter
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="fullName"
            label="Full Name*"
            type="text"
            value={form.fullName}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email address*"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            name="password"
            label="Password*"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <TextField
            name="confirm Password"
            label="Confirm Password*"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already a member of NoteX?{" "}
          <Typography
            component="span"
            sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
            onClick={() => router.push("/login")}
          >
            Login
          </Typography>
        </Typography>
      </Paper>
    </Container>
  );
}
