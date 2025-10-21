"use client";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import NoteCard from "../../components/card";
import { useState, useEffect } from "react";

const NoteCardContainer = () => {
  const [dummyNotes, setDummyNotes] = useState([]);
  const [commentAdd, setCommentAdd] = useState(false);
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/note-save`,
          {
            method: "GET",
            credentials: "include",
          },
        );
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
  }, [commentAdd]);

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: "5rem" }}>
      <Typography variant="h4" gutterBottom>
        Notes Feed
      </Typography>
      <Grid container spacing={3}>
        {dummyNotes.map((note, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
            <NoteCard notes={note} onAddComment={() => setCommentAdd(true)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NoteCardContainer;
