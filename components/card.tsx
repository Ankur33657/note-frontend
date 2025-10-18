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
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CommentDialog from "./commentsDialog";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
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
  applauseCount = 5,
  likeCount = 7,
  onReply,
}) => {
  const [likes, setLikes] = useState(likeCount);
  const [applauses, setApplauses] = useState(applauseCount);
  const [showFullText, setShowFullText] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openComments, setOpenComments] = useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    alert("Edit clicked");
  };

  const handleDelete = () => {
    handleMenuClose();
    alert("Delete clicked");
  };

  const toggleLike = () =>
    setLikes((prev) => (prev === likeCount ? prev + 1 : likeCount));
  const toggleApplause = () =>
    setApplauses((prev) => (prev === applauseCount ? prev + 1 : applauseCount));

  const truncatedMessage =
    message.length > 120 && !showFullText
      ? message.slice(0, 120) + "..."
      : message;

  return (
    <>
      {setOpenComments && (
        <CommentDialog
          open={openComments}
          onClose={() => setOpenComments(false)}
        />
      )}
      <Card
        variant="outlined"
        onClick={() => router.push(`/notes-details`)}
        sx={{
          borderRadius: 4,
          cursor: "pointer",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
          mb: 2,
          width: "100%",
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
              <Avatar alt={name} src={avatar} sx={{ width: 40, height: 40 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {name}
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
                <Typography variant="caption" color="text.secondary">
                  {time}
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  mt: 1,
                  boxShadow: "0px 2px 12px rgba(0,0,0,0.1)",
                },
              }}
            >
              <MenuItem onClick={handleEdit}>
                <EditNoteRoundedIcon sx={{ mr: 1 }} />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteRoundedIcon sx={{ mr: 1 }} />
                Delete
              </MenuItem>
              <MenuItem onClick={handleEdit}>
                <ShareRoundedIcon sx={{ mr: 1 }} />
                Share
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant="h6">Heading</Typography>
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

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Tooltip title="Like">
              <IconButton size="small" onClick={toggleLike}>
                <ThumbUpAltOutlinedIcon
                  fontSize="small"
                  color={likes > likeCount ? "primary" : "inherit"}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Comment">
              <IconButton size="small" onClick={() => setOpenComments(true)}>
                <ChatBubbleRoundedIcon
                  fontSize="small"
                  color={applauses > applauseCount ? "primary" : "inherit"}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Save">
              <IconButton size="small" onClick={toggleApplause}>
                <FavoriteRoundedIcon
                  fontSize="small"
                  color={applauses > applauseCount ? "primary" : "inherit"}
                />
              </IconButton>
            </Tooltip>

            <Typography variant="body2" color="text.secondary">
              {applauses + likes}
            </Typography>
          </Stack>

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
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default NoteCard;
