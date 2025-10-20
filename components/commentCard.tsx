import React from "react";
import {
  Paper,
  Stack,
  Avatar,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

const CommentCard = ({ comment }: { comment: any }) => {
  return (
    <>
      <Paper
        key={comment.id}
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          transition: "0.2s",
          "&:hover": { boxShadow: "0px 2px 10px rgba(0,0,0,0.08)" },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar src={comment.avatar} alt={comment.name} />
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              {comment.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              {comment.time}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {comment.message}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <IconButton size="small" color="primary">
                <ThumbUpAltOutlinedIcon fontSize="small" />
              </IconButton>
              {/*<Typography variant="body2">{comment.likes}</Typography>*/}

              <IconButton size="small" color="error">
                <ThumbDownAltOutlinedIcon fontSize="small" />
              </IconButton>
              {/*<Typography variant="body2">{comment.dislikes}</Typography>*/}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </>
  );
};
export default CommentCard;
