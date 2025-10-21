"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Typography,
  Slide,
  Fade,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    heading: string;
    content: string;
    priority: string;
  }) => void;
  edit?: boolean;
  note?: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const priorityColors = {
  easy: "success",
  medium: "warning",
  hard: "error",
} as const;

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onClose,
  onSubmit,
  edit,
  note,
}) => {
  const [heading, setHeading] = useState(note?.heading || "");
  const [content, setContent] = useState(note?.description || "");
  const [priority, setPriority] = useState(note?.priority || "medium");
  const [errors, setErrors] = useState({ heading: "", content: "" });

  useEffect(() => {
    setHeading(note?.heading || "");
    setContent(note?.description || "");
    setPriority(note?.priority || "medium");
  }, [edit, note]);
  const validate = () => {
    const newErrors = { heading: "", content: "" };
    let isValid = true;

    if (!heading.trim()) {
      newErrors.heading = "Heading is required";
      isValid = false;
    }
    if (!content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (note: any) => {
    if (!validate()) return;
    if (onSubmit) onSubmit({ heading, content, priority });
    if (edit) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/edit-note/${note?._id.toString()}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              heading: heading,
              description: content,
              priority: priority,
            }),
            credentials: "include",
          },
        );
        if (!res.ok) {
          throw new Error("Failed to edit note");
        }
      } catch (err) {
        console.error(err);
      }
    }

    setHeading("");
    setContent("");
    setPriority("medium");
    setErrors({ heading: "", content: "" });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1.5,
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
          {edit ? "Edit Task" : "Add Task"}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Fade in={open} timeout={400}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              label="Task Heading"
              placeholder="Enter task heading..."
              fullWidth
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value);
                setErrors((prev) => ({ ...prev, heading: "" }));
              }}
              error={!!errors.heading}
              helperText={errors.heading}
              inputProps={{ maxLength: 100 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
            <TextField
              label="Task Content"
              placeholder="Describe the task..."
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setErrors((prev) => ({ ...prev, content: "" }));
              }}
              error={!!errors.content}
              inputProps={{ maxLength: 500 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
                Priority
              </Typography>
              <RadioGroup
                row
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                sx={{ gap: 2 }}
              >
                {["easy", "medium", "hard"].map((level) => (
                  <FormControlLabel
                    key={level}
                    value={level}
                    control={
                      <Radio
                        sx={{
                          color: (theme) =>
                            theme.palette[
                              priorityColors[
                                level as keyof typeof priorityColors
                              ]
                            ].main,
                          "&.Mui-checked": {
                            color: (theme) =>
                              theme.palette[
                                priorityColors[
                                  level as keyof typeof priorityColors
                                ]
                              ].main,
                          },
                        }}
                      />
                    }
                    label={level.charAt(0).toUpperCase() + level.slice(1)}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontWeight: 500,
                        color: (theme) =>
                          priority === level
                            ? theme.palette[
                                priorityColors[
                                  level as keyof typeof priorityColors
                                ]
                              ].main
                            : theme.palette.text.primary,
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Box>
        </Fade>
      </DialogContent>
      <DialogActions sx={{ gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(note)}
          variant="contained"
          disabled={!heading?.trim() || !content?.trim()}
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
          Submit Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
