import React from "react";
import { Box, Card, CardContent, CardMedia, Link } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const LikedVideo = ({ likedVideo }) => {
  const windowHook = useWindowSize();
  const navigate = useNavigate();
  const thumbnailSrc =
    likedVideo?.snippet?.thumbnails?.default?.url ||
    likedVideo?.snippet?.thumbnails?.medium?.url ||
    likedVideo?.snippet?.thumbnails?.high?.url;

  const handleRouteToVideo = () => {
    navigate(`/video/${likedVideo.id.videoId}`, {
      state: { videoDetail: likedVideo },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          width: "35vw",
          height: "25vh",
          margin: 1,
          ...(windowHook.width < 1000 && { width: "100%", height: "30%" }),
          color: "#fff",
          backgroundColor: "var(--background-color)",
          boxShadow: "1px 1px 10px  var(--box-shadow-color)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CardMedia
            component="img"
            sx={{ maxWidth: "30%", height: "100%", objectFit: "fill" }}
            image={thumbnailSrc}
            alt={likedVideo?.snippet?.title}
          />

          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              component="button"
              underline="none"
              align="left"
              variant="subtitle1"
              // color="textPrimary"
              color="#fff"
              sx={{ fontWeight: "600" }}
              onClick={handleRouteToVideo}
            >
              {likedVideo?.snippet?.title?.length > 50
                ? likedVideo?.snippet?.title.slice(0, 50) + "..."
                : likedVideo?.snippet?.title}
            </Link>
            <Link
              component="button"
              underline="none"
              align="left"
              variant="subtitle2"
              // color="textSecondary"
              color="#fff"
            >
              {likedVideo?.snippet?.channelTitle}
            </Link>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default LikedVideo;
