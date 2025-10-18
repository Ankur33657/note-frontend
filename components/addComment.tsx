"use client";

import { Box, Button, TextField, Typography, Fade } from "@mui/material";
import { useState } from "react";

const AddComments = ({}: {}) => {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setNewComment("");
    setError("");
  };

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          borderRadius: 4,
          p: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "0.2s ease",
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
          label="Write your comment..."
          placeholder="Type here..."
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            setError("");
          }}
          error={!!error}
          helperText={error || `${newComment.length}/280 characters`}
          inputProps={{ maxLength: 280 }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "light" ? "grey.300" : "grey.700",
              },
              "&:hover fieldset": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setNewComment("");
              setError("");
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              color: (theme) => theme.palette.text.secondary,
              borderColor: (theme) =>
                theme.palette.mode === "light" ? "grey.300" : "grey.700",
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "grey.100" : "grey.800",
              },
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: (theme) => theme.palette.primary.main,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              },
              "&:disabled": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "grey.300" : "grey.700",
                color: (theme) =>
                  theme.palette.mode === "light" ? "grey.500" : "grey.400",
              },
            }}
          >
            Post Comment
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default AddComments;
