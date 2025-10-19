"use client";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import NoteCard from "../../components/card";
import { useEffect, useState } from "react";
export function NoteCardContainer() {
  const [dummyNotes, setDummyNotes] = useState<any>([]);
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/note-feed`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const json = await res.json();
        console.log(res);

        if (!res.ok) {
          throw new Error("ERROR:");
        }
        setDummyNotes(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeed();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: "5rem" }}>
      <Grid container spacing={3}>
        {dummyNotes &&
          dummyNotes.map((note: any, index: number) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
              <NoteCard {...note} />
            </Grid>
          ))}
        {dummyNotes.length === 0 && (
          <Typography variant="h3">No notes found.</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default NoteCardContainer;
