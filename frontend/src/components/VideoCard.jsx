import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

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
          <Typography gutterBottom variant="h6" component="div">
            {videoDetail?.snippet?.title?.length > 50
              ? videoDetail?.snippet?.title.slice(0, 50) + "..."
              : videoDetail?.snippet?.title}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
        </CardContent>
        {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </Box>
  );
};

export default VideoCard;
