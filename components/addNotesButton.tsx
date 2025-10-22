import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { Fab } from "@mui/material";
import TaskDialog from "./addTask";
import CreateSocketConnection from "@/common/socket";

const AddNotes = ({
  onNoteAdded,
}: {
  onNoteAdded?: (val: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/addnote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            heading: data.heading,
            description: data.content,
            priority: data.priority,
          }),
          credentials: "include",
        },
      );

      if (!res.ok) {
        toast.error(`Failed to add task`);
        throw new Error(`Failed to add task: ${res.status} ${res.statusText}`);
      }

      const responseData = await res.json();
      toast.success("Task added successfully");

      const socket = CreateSocketConnection();

      socket.on("connect", () => {
        console.log("🔌 Socket connected, emitting taskAdded...");

        socket.emit("taskAdded", { data: responseData });
      });

      setTimeout(() => {
        socket.disconnect();
      }, 500);

      if (onNoteAdded) onNoteAdded(true);
    } catch (error) {
      console.error(error);
    }
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
