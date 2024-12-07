import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const HistoryItem = ({ historyItem, setWatchHistoryList }) => {
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
          // intimate user on the UI
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
          setWatchHistoryList(updatedWatchHistoryList.data.watchHistory);
        }
      } catch (error) {
        // add UI to handle error
        console.log(`watch-history error = ${error}`);
      }
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ display: "flex", width: "35vw", height: "25vh", margin: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            sx={{ width: 151, objectFit: "fill" }}
            image={thumbnailSrc}
            alt={historyItem?.snippet?.title}
          />
          <CardContent>
            <Typography component="div" variant="h6">
              {historyItem?.snippet?.title?.length > 50
                ? historyItem?.snippet?.title.slice(0, 50) + "..."
                : historyItem?.snippet?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {historyItem?.snippet?.channelTitle}
            </Typography>
          </CardContent>
          <Button
            sx={{
              opacity: "0.5",
              color: "gray",
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
