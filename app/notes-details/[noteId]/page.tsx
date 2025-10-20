"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Stack, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import AddComments from "../../../components/addComment";
import CommentCard from "../../../components/commentCard";
import { useParams } from "next/navigation";

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

const difficultyColors = {
  easy: "success",
  medium: "warning",
  hard: "error",
} as const;

export default function NoteDetailsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [details, setDetails] = useState<any>([]);
  const [error, setError] = useState("");
  const [commentAdd, setCommentAdd] = useState(false);
  const params = useParams();
  const noteId = Array.isArray(params.noteId)
    ? params.noteId[0]
    : params.noteId;

  useEffect(() => {
    if (!noteId) {
      setError("Note ID not found");
      return;
    }

    const fetchNote = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/note-details/${noteId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`Failed to fetch note: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Response data:", data);
        setComments(data?.note?.comments?.reverse() || []);
        setDetails(data?.note);
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Failed to load comments");
      }
    };
    fetchNote();
  }, [noteId, commentAdd]);
  console.log(details);
  if (error) {
    return (
      <Box sx={{ minHeight: "100vh", mt: "5rem", p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  const handleAddedComment = () => {
    setCommentAdd(true);
  };

  const getTimeDifference = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffMs = currentDate.getTime() - createdDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffHours < 1) {
      const diffMinutes = Math.round(diffMs / (1000 * 60));
      if (diffMinutes < 1) return "just Now";
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }
    if (diffHours <= 24) {
      return `${Math.floor(diffHours)} hours ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }
  };

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
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {details?.heading}
            <Button
              sx={{
                backgroundColor: "red",
                borderRadius: "20rem",
                marginX: "0.5rem",
                padding: "0.25rem",
                color: "white",
              }}
            >
              {details?.priority?.toUpperCase()}
            </Button>
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={500}>
                {details?.createrName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon color="action" />
              <Typography variant="body2" color="text.secondary">
                {getTimeDifference(details?.createdAt)}
              </Typography>
            </Stack>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                {details?.description}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <AddComments noteId={noteId} onAddComment={handleAddedComment} />
        <Typography variant="h6" fontWeight={600} mt="1rem" gutterBottom>
          Comments
        </Typography>
        <Stack spacing={2} sx={{ mb: 4 }}>
          {comments?.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No comments yet. Be the first to comment!
            </Typography>
          ) : (
            comments?.map((comment: Comment) => (
              <CommentCard comment={comment} key={comment.id} />
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
}
