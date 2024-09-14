import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid2 } from "@mui/material";

import data from "../raw_YT_data";
import VideoCard from "./VideoCard";
import Loading from "./Loading";

const Feed = () => {
  const [feedVideos, setFeedVideos] = useState([]);
  const [feedVideosLoaded, setFeedVideosLoaded] = useState(false);
  const fetchFeedData = async () => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_URL,
      params: {
        q: "music",
        part: "snippet,id",
        regionCode: "US",
        maxResults: "101",
        order: "date",
      },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": process.env.REACT_APP_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setFeedVideos(response.data.items);
      setFeedVideosLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetchFeedData();
    setFeedVideos(data.items);
    setFeedVideosLoaded(true);
    // console.log(data);
  }, []);
  return (
    <Box>
      <Grid2 container spacing={2}>
        {feedVideosLoaded ? (
          feedVideos.map((videoItem, index) => {
            return (
              <Grid2 size={{ sm: 6, lg: 4 }}>
                <VideoCard videoDetail={videoItem} key={index} />
              </Grid2>
            );
          })
        ) : (
          <Loading />
        )}
      </Grid2>
    </Box>
  );
};

export default Feed;
