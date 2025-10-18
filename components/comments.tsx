"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface Comment {
  id: number;
  name: string;
  avatar: string;
  time: string;
  message: string;
  likes: number;
  dislikes: number;
}

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
}

const CommentDialog: React.FC<CommentDialogProps> = ({ open, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "John Doe",
      avatar: "/avatar1.png",
      time: "2h ago",
      message:
        "This is really insightful. I liked how you explained the concept!",
      likes: 10,
      dislikes: 1,
    },
    {
      id: 2,
      name: "Emily Carter",
      avatar: "/avatar2.png",
      time: "3h ago",
      message:
        "Nice work! But I think there could be a few improvements in formatting.",
      likes: 8,
      dislikes: 0,
    },
    {
      id: 3,
      name: "Michael Smith",
      avatar: "/avatar3.png",
      time: "5h ago",
      message: "Love this! It’s very well written and easy to understand.",
      likes: 14,
      dislikes: 2,
    },
    {
      id: 4,
      name: "Sophia Jones",
      avatar: "/avatar4.png",
      time: "6h ago",
      message: "I disagree with some points, but overall a solid perspective.",
      likes: 4,
      dislikes: 3,
    },
    {
      id: 5,
      name: "David Lee",
      avatar: "/avatar5.png",
      time: "8h ago",
      message: "Great post! Please make more like this in the future.",
      likes: 12,
      dislikes: 0,
    },
  ]);
  const handleLike = (id: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.likes + 1,
              dislikes:
                comment.dislikes > 0 ? comment.dislikes - 0 : comment.dislikes,
            }
          : comment,
      ),
    );
  };

  const handleDislike = (id: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, dislikes: comment.dislikes + 1 }
          : comment,
      ),
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
          maxHeight: "80vh",
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 0,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Comments
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ my: 1 }} />

      {/* Dialog Content */}
      <DialogContent dividers>
        {comments.map((comment) => (
          <Paper
            key={comment.id}
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
              transition: "0.2s",
              "&:hover": { boxShadow: "0px 2px 10px rgba(0,0,0,0.08)" },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar src={comment.avatar} alt={comment.name} />
              <Box flex={1}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {comment.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {comment.time}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {comment.message}
                </Typography>

                {/* Like / Dislike buttons */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbUpAltOutlinedIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2">{comment.likes}</Typography>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDislike(comment.id)}
                  >
                    <ThumbDownAltOutlinedIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2">{comment.dislikes}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
