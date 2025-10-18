import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import TaskDialog from "./addTask";
const AddNotes = () => {
  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <TaskDialog
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 2000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "0.2s ease-in-out",
          },
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};
export default AddNotes;
