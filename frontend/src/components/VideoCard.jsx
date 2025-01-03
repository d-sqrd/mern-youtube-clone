import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Box, Link } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";

const VideoCard = ({ videoDetail }) => {
  const thumbnailSrc =
    videoDetail?.snippet?.thumbnails?.default?.url ||
    videoDetail?.snippet?.thumbnails?.medium?.url ||
    videoDetail?.snippet?.thumbnails?.high?.url ||
    "https://picsum.photos/600/200";
  const navigate = useNavigate();
  const handleRouteToVideo = () => {
    navigate(`/video/${videoDetail.id.videoId}`, {
      state: { videoDetail: videoDetail },
    });
  };
  const handleRouteToChannel = () => {
    navigate(`/channel/${videoDetail.snippet.channelId}`, {
      state: {
        channelDetail: {
          channelName: videoDetail.snippet.channelTitle,
          channelId: videoDetail.snippet.channelId,
        },
      },
    });
  };
  const window = useWindowSize();
  return (
    <Box
      sx={{
        margin: 1,
        ...(window.width >= 500 && { mt: 0 }),
      }}
    >
      <Card
        sx={{
          height: 250,
          borderRadius: "10px",
          color: "#fff",
          backgroundColor: "var(--background-color)",
          boxShadow: "1px 1px 10px  #444",
        }}
      >
        <CardMedia
          component="img"
          alt={videoDetail?.snippet?.description}
          height="140"
          image={thumbnailSrc}
          videoDetail={videoDetail}
          onClick={handleRouteToVideo}
          sx={{ objectFit: "fill", cursor: "pointer" }}
        />
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Link
            component="button"
            gutterBottom
            variant="h5"
            underline="none"
            onClick={handleRouteToVideo}
            align="left"
            // color="textPrimary"
            color="#fff"
            sx={{ fontSize: "medium", fontWeight: "600" }}
          >
            {videoDetail?.snippet?.title?.length > 50
              ? videoDetail?.snippet?.title.slice(0, 50) + "..."
              : videoDetail?.snippet?.title}
          </Link>
          <Link
            component="button"
            gutterBottom
            variant="h5"
            underline="none"
            onClick={handleRouteToChannel}
            align="left"
            // color="textSecondary"
            color="white"
            sx={{ fontSize: "small", fontWeight: "600" }}
          >
            {videoDetail?.snippet?.channelTitle}
          </Link>
          <Typography
            variant="h6"
            sx={{ fontSize: "small", fontWeight: "400", pt: 1 }}
          >
            {`${Math.floor(Math.random() * 1000000)} views`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoCard;
