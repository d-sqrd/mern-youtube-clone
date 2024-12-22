import React from "react";
import { Box, Card, CardContent, CardMedia, Link } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const LikedVIdeoItem = ({ likedVideo }) => {
  const windowHook = useWindowSize();
  const navigate = useNavigate();
  const thumbnailSrc =
    likedVideo?.snippet?.thumbnails?.default?.url ||
    likedVideo?.snippet?.thumbnails?.medium?.url ||
    likedVideo?.snippet?.thumbnails?.high?.url;

  //   const handleDelete = async (likedVideo) => {
  //     const authToken = localStorage.getItem("loginAuthToken");
  //     const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  //     if (authToken && loggedInUserEmail) {
  //       const URL = "http://localhost:5000/api/v1/deleteFromWatchHistory";
  //       try {
  //         const optionsForDelete = {
  //           method: "DELETE",
  //           url: URL,
  //           data: {
  //             email: loggedInUserEmail,
  //             objectId: likedVideo._id,
  //           },
  //           headers: {
  //             authorization: `Bearer ${authToken}`,
  //           },
  //         };
  //         const responseAfterDelete = await axios.request(optionsForDelete);
  //         if (responseAfterDelete.statusCode === 200) {
  //           // TODO::intimate user on the UI
  //         }
  //         const optionsForFetch = {
  //           method: "GET",
  //           url: URL,
  //           data: {
  //             email: loggedInUserEmail,
  //           },
  //           headers: {
  //             authorization: `Bearer ${authToken}`,
  //           },
  //         };
  //         const updatedLikedVideoList = await axios.request(optionsForFetch);
  //         if (updatedLikedVideoList) {
  //             setLikedVideoList(updatedLikedVideoList);
  //           // setWatchHistoryList(updatedWatchHistoryList.data.watchHistory);
  //         }
  //       } catch (error) {
  //         // TODO::add UI to handle error
  //         console.log(`watch-history error = ${error}`);
  //       }
  //     }
  //   };

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
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
              color="textPrimary"
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
              color="textSecondary"
            >
              {likedVideo?.snippet?.channelTitle}
            </Link>
          </CardContent>
          {/* <Button
            sx={{
              opacity: "0.5",
              color: "gray",
              marginLeft: "auto",
              "&:hover": { color: "red", opacity: "1" },
            }}
            onClick={() => handleDelete(likedVideo)}
          >
            <DeleteIcon />
          </Button> */}
        </Box>
      </Card>
    </Box>
  );
};

export default LikedVIdeoItem;
