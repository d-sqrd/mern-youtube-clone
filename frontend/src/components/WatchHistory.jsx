import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WatchHistoryItem from "./WatchHistoryItem";

import videos from "../suggestedVideos";

const WatchHistory = () => {
  const [watchHistoryList, setWatchHistoryList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const sortAndSetWatchHistoryList = (responseFromDB) => {
    let watchHistoryList = responseFromDB.data.data.watchHistory;
    watchHistoryList.sort((watchHistoryItem1, watchHistoryItem2) => {
      return watchHistoryItem1.date - watchHistoryItem2.date;
    });
    setWatchHistoryList(watchHistoryList);
  };

  useEffect(() => {
    console.log(`watch-history...offsetY = ${window.pageYOffset}`);
    const fetchWatchHistory = async () => {
      const authToken = localStorage.getItem("loginAuthToken");
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (authToken && loggedInUserEmail) {
        const URL = "http://localhost:5000/api/v1/watchHistory";
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
          console.log(`watch-history response = ${JSON.stringify(response)}`);
          if (response.status === 200) {
            sortAndSetWatchHistoryList(response);
          }
        } catch (error) {
          // add UI to handle error
          console.log(`watch-history error = ${error}`);
        }
      }
    };
    // fetchWatchHistory();
    setWatchHistoryList(videos.items);
    setIsDataLoaded(true);
  }, []);
  return (
    <Box sx={{ height: "100vh" }}>
      {/* UI when user is not logged in but tries to access Watch History route */}
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
            Please Login to view Watch History
          </Typography>
        </Box>
      )}
      {/* UI when logged in user is routed to Watch History route */}
      {localStorage.getItem("loginAuthToken") && (
        <Box sx={{ width: "100%" }}>
          {/* UI when user has no watch history */}
          {isDataLoaded && watchHistoryList && !watchHistoryList.length && (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">
                Please watch some videos to create your Watch History!
              </Typography>
            </Box>
          )}
          {/* UI when user has watch history */}
          {isDataLoaded && watchHistoryList && watchHistoryList.length && (
            <Box>
              {watchHistoryList.map((historyItem, index) => {
                return (
                  <Box key={index}>
                    {/* when watch history list will be fetched from DB then pass the date field as well as prop to HistoryItem */}
                    <WatchHistoryItem
                      historyItem={historyItem}
                      setWatchHistoryList={sortAndSetWatchHistoryList}
                    />
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

export default WatchHistory;
