import React from "react";
import { Box, Card, CardContent, CardMedia, Button, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const WatchHistoryItem = ({ historyItem, setWatchHistoryList }) => {
  // console.log(`watch-history-item = ${JSON.stringify(historyItem)}`);
  const windowHook = useWindowSize();
  const navigate = useNavigate();
  const thumbnailSrc =
    historyItem.videoDetail.snippet.thumbnails.default.url ||
    historyItem.videoDetail.snippet.thumbnails.medium.url ||
    historyItem.videoDetail.snippet.thumbnails.high.url;

  const handleDelete = async (historyItem) => {
    const authToken = localStorage.getItem("loginAuthToken");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (authToken && loggedInUserEmail) {
      const URL = "http://localhost:5000/api/v1/deleteFromWatchHistory";
      try {
        const options = {
          method: "DELETE",
          url: URL,
          data: {
            user: {
              email: loggedInUserEmail,
            },
            videoDetail: {
              videoId: historyItem.videoDetail.id.videoId,
            },
          },
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        };
        const response = await axios.request(options);
        if (response.status === 200) {
          // TODO::intimate user on the UI _> do a sliding animation kind of thing
          setWatchHistoryList(response);
        }
      } catch (err) {
        // TODO::add UI to handle error
        console.log(`watch-history error = ${err}`);
      }
    }
  };

  const handleRouteToVideo = () => {
    navigate(`/video/${historyItem.videoDetail.id.videoId}`, {
      state: { videoDetail: historyItem.videoDetail },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // background: "#ef5f",
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
          boxShadow: "1px 1px 10px var(--box-shadow-color)",
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
            alt={historyItem.videoDetail.snippet.title}
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
              {historyItem.videoDetail.snippet.title.length > 50
                ? historyItem.videoDetail.snippet.title.slice(0, 50) + "..."
                : historyItem.videoDetail.snippet.title}
            </Link>
            <Link
              component="button"
              underline="none"
              align="left"
              variant="subtitle2"
              // color="textSecondary"
              color="white"
            >
              {historyItem.videoDetail.snippet.channelTitle}
            </Link>
          </CardContent>
          <Button
            sx={{
              opacity: "0.5",
              color: "gray",
              marginLeft: "auto",
              "&:hover": { color: "#FF3131", opacity: "1" },
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

export default WatchHistoryItem;
