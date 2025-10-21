"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";

interface PublicConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  noteId: string;
}

const PublicConfirmDialog: React.FC<PublicConfirmDialogProps> = ({
  open,
  onClose,
  noteId,
}) => {
  const handleConfirm = async (noteId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/note-public/${noteId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteId: noteId }),
          credentials: "include",
        },
      );
      if (!res.ok) {
        throw new Error("Failed to make note public");
      }
      toast.success("Note made public successfully");
    } catch (err) {
      console.error(err);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm Public Status"}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to make public? This action will allow anyone to
          view and potentially interact with it.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={() => handleConfirm(noteId)} variant="contained">
          Make Public
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublicConfirmDialog;
