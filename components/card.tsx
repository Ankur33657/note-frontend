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
import ShareDialog from "./shareDialog";
import TaskDialog from "./addTask";
const NoteCard = ({
  notes,
  onAddComment,
}: {
  notes: any;
  onAddComment: (val: boolean) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openComments, setOpenComments] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [editNote, setEditNote] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
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

  const handleDelete = async (noteId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/deletenote/${noteId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!res.ok) {
        throw new Error("Failed to delete note");
      }
      if (res.status === 200) {
        alert("Note deleted successfully");
      }
    } catch (err) {
      console.error(err);
    }
    handleMenuClose();
  };

  return (
    <>
      {setOpenComments && (
        <CommentDialog
          open={openComments}
          onClose={() => setOpenComments(false)}
          notes={notes}
          onAddComment={() => onAddComment(true)}
        />
      )}
      {setOpenShare && (
        <ShareDialog
          open={openShare}
          onClose={() => setOpenShare(false)}
          noteId={notes._id}
        />
      )}
      {setOpenEdit && (
        <TaskDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          edit={true}
          note={editNote}
        />
      )}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 4,
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
              <Avatar
                alt={notes?.createrName?.charAt(0) || "A"}
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {notes.createrName}
                  <Button
                    sx={{
                      backgroundColor: "red",
                      borderRadius: "20rem",
                      marginX: "0.5rem",
                      padding: "0.25rem",
                    }}
                  >
                    {notes.priority}
                  </Button>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notes.createdAt}
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                handleMenuOpen(e);
              }}
            >
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
              <MenuItem
                onClick={() => {
                  setOpenEdit(true);
                  setEditNote(notes);
                  handleMenuClose();
                }}
              >
                <EditNoteRoundedIcon sx={{ mr: 1 }} />
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDelete(notes._id.toString())}>
                <DeleteRoundedIcon sx={{ mr: 1 }} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpenShare(true);
                  handleMenuClose();
                }}
              >
                <ShareRoundedIcon sx={{ mr: 1 }} />
                Share
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/notes-details/${notes._id.toString()}`);
                }}
              >
                <EditNoteRoundedIcon sx={{ mr: 1 }} />
                Details
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant="h6">{notes?.heading}</Typography>
          <Typography
            variant="body2"
            sx={{ mt: 2, mb: 2, color: "text.primary" }}
          >
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                cursor: "pointer",
                fontWeight: 500,
                ml: 0.5,
              }}
            >
              {notes.description.slice(0, 100)}
            </Typography>
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Tooltip title="Comment">
              <IconButton size="small" onClick={() => setOpenComments(true)}>
                <ChatBubbleRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Save">
              <IconButton size="small">
                <FavoriteRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default NoteCard;
