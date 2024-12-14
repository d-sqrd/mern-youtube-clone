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
import useWindowSize from "../hooks/useWindowSize";

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

  const window = useWindowSize();
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
            // justifyContent: "space-between",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "30%", height: "100%", objectFit: "fill" }}
            image={thumbnailSrc}
            alt={historyItem?.snippet?.title}
          />

          <CardContent>
            <Typography
              component="div"
              variant="subtitle1"
              sx={{ fontWeight: "600" }}
            >
              {historyItem?.snippet?.title?.length > 50
                ? historyItem?.snippet?.title.slice(0, 50) + "..."
                : historyItem?.snippet?.title}
            </Typography>
            <Typography
              variant="subtitle2"
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
