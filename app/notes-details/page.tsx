"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  Chip,
  Divider,
  TextField,
  Button,
  Avatar,
  Fade,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AddComments from "../../components/addComment";
import CommentCard from "../../components/commentCard";
// Types
export interface NoteDetails {
  id: number;
  creator: string;
  createdAt: string;
  heading: string;
  difficulty: "easy" | "medium" | "hard";
  message: string;
}

export interface Comment {
  id: number;
  commenter: string;
  avatar: string;
  timestamp: string;
  message: string;
}

// Sample note data
const sampleNote: NoteDetails = {
  id: 1,
  creator: "Alice Smith",
  createdAt: "2025-10-18 15:30",
  heading: "Project Update",
  difficulty: "medium",
  message:
    "We have completed the initial design phase and are now moving forward with development.",
};

// Sample comments data
const initialComments: Comment[] = [
  {
    id: 1,
    commenter: "Bob Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    timestamp: "2025-10-18 16:00",
    message: "Great update, Alice! Looking forward to the next steps.",
  },
  {
    id: 2,
    commenter: "Charlie Brown",
    avatar: "https://i.pravatar.cc/150?img=8",
    timestamp: "2025-10-18 16:15",
    message: "Can we discuss the timeline in the next meeting?",
  },
];

// Difficulty colors for Chip
const difficultyColors = {
  easy: "success",
  medium: "warning",
  hard: "error",
} as const;

// Comment component

// Main page component
export default function NoteDetailsPage() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        mt: "5rem",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #F5F7FA 0%, #E0E7FF 100%)"
            : "linear-gradient(180deg, #1C2526 0%, #2E3A59 100%)",
      }}
    >
      <Container sx={{ py: 4 }}>
        <Fade in timeout={800}>
          <Box
            sx={{
              borderRadius: 4,
              p: 3,
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              mb: 4,
            }}
          >
            {/* Note Details */}
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {sampleNote.heading}
              <Button
                sx={{
                  backgroundColor: "red",
                  borderRadius: "20rem",
                  marginX: "0.5rem",
                  padding: "0.25rem",
                }}
              >
                Hard
              </Button>
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PersonIcon color="primary" />
                <Typography variant="subtitle1" fontWeight={500}>
                  {sampleNote.creator}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                  {sampleNote.createdAt}
                </Typography>
              </Stack>

              {/* Note Description */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                  {sampleNote.message}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Fade>

        <AddComments />

        {/* Comments Section */}
        <Typography variant="h6" fontWeight={600} mt="1rem" gutterBottom>
          Comments
        </Typography>
        <Stack spacing={2} sx={{ mb: 4 }}>
          {comments.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No comments yet. Be the first to comment!
            </Typography>
          ) : (
            comments.map((comment) => <CommentCard comment={comment} />)
          )}
        </Stack>
      </Container>
    </Box>
  );
}
