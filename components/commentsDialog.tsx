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
  TextField,
  Button,
} from "@mui/material";
import AddComments from "./addComment";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CommentCard from "./commentCard";
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
      id: 2,
      name: "Emily Carter",
      avatar: "/avatar2.png",
      time: "3h ago",
      message:
        "Nice work! But I think there could be a few improvements in formatting.",
      likes: 8,
      dislikes: 0,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleLike = (id: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment,
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
          maxHeight: "85vh",
        },
      }}
    >
      {/* Header */}
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

      <AddComments />

      <Divider sx={{ my: 1 }} />

      <DialogContent dividers>
        {comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
