// src/components/NoteCard.tsx
"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  Stack,
  Divider,
  Tooltip,
  Button,
  Grid,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

interface NoteCardProps {
  name: string;
  avatar: string;
  time: string;
  message: string;
  replies: number;
  replyAvatars: string[];
  applauseCount?: number;
  likeCount?: number;
  onReply?: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  name,
  avatar,
  time,
  message,
  replies,
  replyAvatars,
  applauseCount = 0,
  likeCount = 0,
  onReply,
}) => {
  const [likes, setLikes] = useState(likeCount);
  const [applauses, setApplauses] = useState(applauseCount);
  const [showFullText, setShowFullText] = useState(false);
  const theme = useTheme();

  const toggleLike = () =>
    setLikes((prev) => (prev === likeCount ? prev + 1 : likeCount));
  const toggleApplause = () =>
    setApplauses((prev) => (prev === applauseCount ? prev + 1 : applauseCount));

  const truncatedMessage =
    message.length > 120 && !showFullText
      ? message.slice(0, 120) + "..."
      : message;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 4,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
        mb: 2,
        width: "100%",
        overflow: "visible",
        transition: "0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent sx={{ pb: "8px !important" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={avatar} alt={name} sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {time}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Message */}
        <Typography
          variant="body2"
          sx={{ mt: 2, mb: 2, color: "text.primary" }}
        >
          {truncatedMessage}
          {message.length > 120 && (
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                cursor: "pointer",
                fontWeight: 500,
                ml: 0.5,
              }}
              onClick={() => setShowFullText((p) => !p)}
            >
              {showFullText ? "Show less" : "Read more"}
            </Typography>
          )}
        </Typography>

        <Divider sx={{ my: 1 }} />

        {/* Reactions */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 1 }}>
          <Tooltip title="Applaud">
            <IconButton size="small" onClick={toggleApplause}>
              <EmojiEventsOutlinedIcon
                fontSize="small"
                color={applauses > applauseCount ? "primary" : "inherit"}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Like">
            <IconButton size="small" onClick={toggleLike}>
              <ThumbUpAltOutlinedIcon
                fontSize="small"
                color={likes > likeCount ? "primary" : "inherit"}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="React">
            <IconButton size="small">
              <EmojiEmotionsOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Typography variant="body2" color="text.secondary">
            {applauses + likes}
          </Typography>
        </Stack>

        {/* Replies */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Stack direction="row" spacing={-0.8}>
            {replyAvatars.slice(0, 3).map((src, index) => (
              <Avatar
                key={index}
                src={src}
                sx={{
                  width: 28,
                  height: 28,
                  border: "2px solid white",
                }}
              />
            ))}
          </Stack>

          <Button
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.text.secondary,
              borderRadius: "8px",
            }}
          >
            {replies} replies
          </Button>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
              cursor: "pointer",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={onReply}
          >
            Reply
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default NoteCard;
