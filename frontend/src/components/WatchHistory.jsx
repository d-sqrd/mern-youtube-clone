import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryItem from "./HistoryItem";

import videos from "../suggestedVideos";

const WatchHistory = () => {
  const [watchHistoryList, setWatchHistoryList] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    const fetchWatchHistory = async () => {
      const authToken = localStorage.getItem("loginAuthToken");
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (authToken && loggedInUserEmail) {
        const URL = "http://localhost:5000/api/v1/watchHistory";
        try {
          const options = {
            method: "GET",
            url: URL,
            data: {
              email: loggedInUserEmail,
            },
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          };
          const response = await axios.request(options);
          console.log(`watch-history response = ${JSON.stringify(response)}`);
          if (response) {
            setWatchHistoryList(response.data.watchHistory);
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
    console.log(`wathc-history-item....isDataLoaded = ${isDataLoaded}`);
  }, []);
  return (
    <Box>
      {!localStorage.getItem("loginAuthToken") && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">
            Please Login to view Watch History
          </Typography>
        </Box>
      )}
      {localStorage.getItem("loginAuthToken") && (
        <Box sx={{ width: "100vw" }}>
          {isDataLoaded && watchHistoryList && (
            <Box>
              {watchHistoryList.map((historyItem, index) => {
                return (
                  <Box key={index}>
                    {/* when watch history list will be fetched from DB then pass the date field as well as prop to HistoryItem */}
                    <HistoryItem
                      historyItem={historyItem}
                      setWatchHistoryList={setWatchHistoryList}
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
