"use client";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import NoteCard from "../../components/card";

const dummyNotes = [
  {
    name: "Alice Johnson",
    avatar: "/images/a.jpg",
    time: "2h ago",
    message:
      "Exciting news about the new framework integration! Everything seems to be running smoothly, and the performance gains are significant.",
    replies: 5,
    replyAvatars: ["/images/b.jpg", "/images/c.jpg"],
    applauseCount: 12,
    likeCount: 5,
  },
  {
    name: "Bob Smith",
    avatar: "/images/b.jpg",
    time: "4h ago",
    message:
      "Just finished reviewing the latest API documentation. It's much clearer now, especially the section on authentication tokens.",
    replies: 2,
    replyAvatars: ["/images/a.jpg"],
    applauseCount: 3,
    likeCount: 1,
  },
  {
    name: "Charlie Brown",
    avatar: "/images/c.jpg",
    time: "1d ago",
    message:
      "I'm still seeing a few unexpected errors in the testing environment. Could someone take a look at the logs in the staging branch?",
    replies: 8,
    replyAvatars: ["/images/d.jpg", "/images/e.jpg", "/images/f.jpg"],
    applauseCount: 20,
    likeCount: 10,
  },
  {
    name: "Diana Prince",
    avatar: "/images/d.jpg",
    time: "2d ago",
    message:
      "Finalizing the design assets for the landing page update. Will share the Figma link with the marketing team by the end of the day.",
    replies: 3,
    replyAvatars: ["/images/b.jpg"],
    applauseCount: 7,
    likeCount: 4,
  },
  {
    name: "Eve Adams",
    avatar: "/images/e.jpg",
    time: "3d ago",
    message:
      "We should consider migrating our legacy code sooner rather than later to avoid technical debt accumulation. It's a risk we need to address.",
    replies: 1,
    replyAvatars: ["/images/a.jpg"],
    applauseCount: 15,
    likeCount: 9,
  },
  {
    name: "Frank Miller",
    avatar: "/images/f.jpg",
    time: "1w ago",
    message:
      "Proposal for the new folder structure has been approved! Let's start implementing the changes in the next sprint cycle.",
    replies: 6,
    replyAvatars: [
      "/images/c.jpg",
      "/images/d.jpg",
      "/images/d.jpg",
      "/images/d.jpg",
      "/images/d.jpg",
      "/images/d.jpg",
    ],
    applauseCount: 4,
    likeCount: 1,
  },
  {
    name: "Eve Adams",
    avatar: "/images/e.jpg",
    time: "3d ago",
    message:
      "We should consider migrating our legacy code sooner rather than later to avoid technical debt accumulation. It's a risk we need to address.",
    replies: 1,
    replyAvatars: ["/images/a.jpg"],
    applauseCount: 15,
    likeCount: 9,
  },
  {
    name: "Eve Adams",
    avatar: "/images/e.jpg",
    time: "3d ago",
    message:
      "We should consider migrating our legacy code sooner rather than later to avoid technical debt accumulation. It's a risk we need to address.hfhfhfh lorem400Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.",
    replies: 1,
    replyAvatars: ["/images/a.jpg"],
    applauseCount: 15,
    likeCount: 9,
  },
  {
    name: "Eve Adams",
    avatar: "/images/e.jpg",
    time: "3d ago",
    message:
      "We should consider migrating our legacy code sooner rather than later to avoid technical debt accumulation. It's a risk we need to address.",
    replies: 1,
    replyAvatars: ["/images/a.jpg"],
    applauseCount: 15,
    likeCount: 9,
  },
  {
    name: "Eve Adams",
    avatar: "/images/e.jpg",
    time: "3d ago",
    message:
      "We should consider migrating our legacy code sooner rather than later to avoid technical debt accumulation. It's a risk we need to address.",
    replies: 1,
    replyAvatars: ["/images/a.jpg"],
    applauseCount: 15,
    likeCount: 9,
  },
  {
    name: "Eve Adams",
    avatar: "/images/e.jpg",
    time: "3d ago",
    message:
      "We should consider migrating our legacy code sooner rather than later to avoid technical debt accumulation. It's a risk we need to address.",
    replies: 1,
    replyAvatars: ["/images/a.jpg"],
    applauseCount: 15,
    likeCount: 9,
  },
];

export function NoteCardContainer() {
  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: "5rem" }}>
      <Typography variant="h4" gutterBottom>
        Notes Feed
      </Typography>
      <Grid container spacing={3}>
        {dummyNotes.map((note, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
            <NoteCard {...note} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NoteCardContainer;
