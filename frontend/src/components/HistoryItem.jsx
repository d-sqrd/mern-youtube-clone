import React from "react";
import { Box, Card, CardContent, CardMedia, Button, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const HistoryItem = ({ historyItem, setWatchHistoryList }) => {
  const window = useWindowSize();
  const navigate = useNavigate();
  const thumbnailSrc =
    historyItem?.snippet?.thumbnails?.default?.url ||
    historyItem?.snippet?.thumbnails?.medium?.url ||
    historyItem?.snippet?.thumbnails?.high?.url;

  const handleDelete = async (historyItem) => {
    const authToken = localStorage.getItem("loginAuthToken");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (authToken && loggedInUserEmail) {
      const URL = "http://localhost:5000/api/v1/deleteFromWatchHistory";
      try {
        const optionsForDelete = {
          method: "DELETE",
          url: URL,
          data: {
            email: loggedInUserEmail,
            objectId: historyItem._id,
          },
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        };
        const responseAfterDelete = await axios.request(optionsForDelete);
        if (responseAfterDelete.statusCode === 200) {
          // TODO::intimate user on the UI
        }
        const optionsForFetch = {
          method: "GET",
          url: URL,
          data: {
            email: loggedInUserEmail,
          },
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        };
        const updatedWatchHistoryList = await axios.request(optionsForFetch);
        if (updatedWatchHistoryList) {
          setWatchHistoryList(updatedWatchHistoryList);
          // setWatchHistoryList(updatedWatchHistoryList.data.watchHistory);
        }
      } catch (error) {
        // TODO::add UI to handle error
        console.log(`watch-history error = ${error}`);
      }
    }
  };

  const handleRouteToVideo = () => {
    navigate(`/video/${historyItem.id.videoId}`, {
      state: { videoDetail: historyItem },
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          display: "flex",
          width: "35vw",
          height: "25vh",
          ...(window.width < 1000 && { width: "100%", height: "30%" }),
          margin: 1,
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
            alt={historyItem?.snippet?.title}
          />

          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              component="button"
              underline="none"
              align="left"
              variant="subtitle1"
              color="textPrimary"
              sx={{ fontWeight: "600" }}
              onClick={handleRouteToVideo}
            >
              {historyItem?.snippet?.title?.length > 50
                ? historyItem?.snippet?.title.slice(0, 50) + "..."
                : historyItem?.snippet?.title}
            </Link>
            <Link
              component="button"
              underline="none"
              align="left"
              variant="subtitle2"
              color="textSecondary"
            >
              {historyItem?.snippet?.channelTitle}
            </Link>
          </CardContent>
          <Button
            sx={{
              opacity: "0.5",
              color: "gray",
              marginLeft: "auto",
              "&:hover": { color: "red", opacity: "1" },
            }}
            onClick={() => handleDelete(historyItem)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default HistoryItem;
