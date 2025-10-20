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

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
  notes: any;
}

const CommentDialog: React.FC<CommentDialogProps> = ({
  open,
  onClose,
  notes,
}) => {
  const [newComment, setNewComment] = useState("");

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

      <AddComments noteId={notes._id.toString()} />

      <Divider sx={{ my: 1 }} />

      <DialogContent dividers>
        {notes.comments.map((comment: any) => (
          <CommentCard comment={comment} />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
