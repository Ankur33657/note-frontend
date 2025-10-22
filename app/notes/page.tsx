"use client";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import NoteCard from "../../components/card";
import { useEffect, useState } from "react";
import CreateSocketConnection from "../../common/socket";

const NoteCardContainer = () => {
  const [dummyNotes, setDummyNotes] = useState([]);
  const [commentAdd, setCommentAdd] = useState(false);
  const [socket, setSocket] = useState<any>();
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error("ERROR:");
        }
        setDummyNotes(json.reverse());
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeed();
  }, [commentAdd, shouldRefetch]);

  useEffect(() => {
    const newSocket = CreateSocketConnection();
    if (!newSocket) return;

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(" NoteCardContainer socket connected");
    });

    newSocket.on("noteFeedUpdated", ({ noteId }) => {
      console.log(` Received update for note: ${noteId}`);
      setShouldRefetch((prev) => !prev);
    });

    newSocket.on("taskAdded", ({ data }) => {
      console.log("✨ New Task Added:", data);
      setShouldRefetch((prev) => !prev);
    });

    return () => {
      console.log("🔌 Disconnecting NoteCardContainer socket");
      newSocket.disconnect();
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: "5rem" }}>
      <Typography variant="h4" gutterBottom>
        My Library
      </Typography>
      <Grid container spacing={3}>
        {dummyNotes.map((note, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
            <NoteCard
              notes={note}
              onAddComment={() => setCommentAdd(!commentAdd)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NoteCardContainer;
