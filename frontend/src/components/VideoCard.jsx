import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Box, Link } from "@mui/material";

const VideoCard = ({ videoDetail }) => {
  const thumbnailSrc =
    videoDetail?.snippet?.thumbnails?.default?.url ||
    videoDetail?.snippet?.thumbnails?.medium?.url ||
    videoDetail?.snippet?.thumbnails?.high?.url;
  const navigate = useNavigate();
  // console.log(`videoCard - videoDetail: ${JSON.stringify(videoDetail)}`);
  const handleClick = () => {
    navigate(`/video/${videoDetail.id.videoId}`, {
      state: { videoDetail: videoDetail },
    });
    console.log(`Inside handleClick..props = ${JSON.stringify(videoDetail)}\n`);
  };
  return (
    <Box sx={{ margin: 1 }}>
      <Card
        sx={{
          height: 250,
          minWidth: "md",
          borderRadius: "10px",
        }}
      >
        <CardMedia
          component="img"
          alt={videoDetail?.snippet?.description}
          height="140"
          image={thumbnailSrc}
          videoDetail={videoDetail}
          onClick={handleClick}
          sx={{ objectFit: "fill" }}
        />
        <CardContent>
          <Link
            component="button"
            gutterBottom
            variant="h5"
            underline="none"
            onClick={handleClick}
            align="left"
            color="textPrimary"
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
            onClick={handleClick}
            align="left"
            color="textSecondary"
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
