import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import LikedVideo from "./LikedVideo";

const LikedVideos = () => {
  const [likedVideoList, setLikedVideoList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const sortAndSetLikedVideoList = (responseFromDB) => {
    let likedVideoList = responseFromDB.data.data.likedVideos;
    likedVideoList.sort((likedVideo1, likedVideo2) => {
      return likedVideo1.date - likedVideo2.date;
    });
    setLikedVideoList(likedVideoList);
  };

  useEffect(() => {
    const fetchLikedVideos = async () => {
      const authToken = localStorage.getItem("loginAuthToken");
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (authToken && loggedInUserEmail) {
        const URL = "http://localhost:5000/api/v1/getLikedVideos";
        try {
          const options = {
            method: "GET",
            url: URL,
            params: {
              userEmail: loggedInUserEmail,
            },
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          };
          const response = await axios.request(options);
          console.log(`liked-videos response = ${JSON.stringify(response)}`);
          if (response) {
            sortAndSetLikedVideoList(response);
          }
        } catch (error) {
          // add UI to handle error
          console.log(`liked-videos error = ${error}`);
        } finally {
          setIsDataLoaded(true);
        }
      }
    };
    fetchLikedVideos();
  }, []);
  return (
    <Box
      sx={{
        // background: "#ef5f",
        height: "100vh",
      }}
    >
      {/* UI when user is not logged in but tries to access Liked Videos route */}
      {!localStorage.getItem("loginAuthToken") && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateY(500%)",
          }}
        >
          <Typography variant="h5">
            Please Login to view Liked Videos
          </Typography>
        </Box>
      )}
      {/* UI when logged in user is routed to Liked Videos route */}
      {localStorage.getItem("loginAuthToken") && (
        <Box sx={{ width: "100%" }}>
          {/* UI when user has no liked video */}
          {isDataLoaded && likedVideoList && !likedVideoList.length && (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">
                Please watch and like some videos to create your Liked Videos
                list!
              </Typography>
            </Box>
          )}
          {/* UI when user has watch history */}
          {isDataLoaded && likedVideoList && likedVideoList.length && (
            <Box>
              {likedVideoList.map((likedVideo, index) => {
                return (
                  <Box key={index}>
                    {/* when watch history list will be fetched from DB then pass the date field as well as prop to HistoryItem */}
                    <LikedVideo likedVideo={likedVideo.videoDetail} />
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default LikedVideos;
