import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid2 } from "@mui/material";

import data from "../feedVideos";
import VideoCard from "./VideoCard";
import Loading from "./Loading";

// const Feed = ({ searchString }) => {
const Feed = ({ optionsForFetchingFeedVideos }) => {
  const [feedVideos, setFeedVideos] = useState([]);
  const [feedVideosLoaded, setFeedVideosLoaded] = useState(false);
  console.log(
    `feed...optionsForFetchingFeedVideos = ${JSON.stringify(
      optionsForFetchingFeedVideos
    )}`
  );
  useEffect(() => {
    const fetchFeedData = async () => {
      const options = optionsForFetchingFeedVideos;
      try {
        const response = await axios.request(options);
        if (response.status === 200) {
          setFeedVideos(response.data.videoList);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFeedVideosLoaded(true);
      }
    };

    // for fetching data from API uncomment below line
    fetchFeedData();

    // for fetching data from local uncomment below 2 lines
    // setFeedVideos(data.items);
    // setFeedVideosLoaded(true);
  }, [optionsForFetchingFeedVideos]);

  return (
    <Box>
      <Grid2 container spacing={2}>
        {feedVideosLoaded && feedVideos ? (
          feedVideos.map((videoItem, index) => {
            return (
              <Grid2 key={index} size={{ sm: 6, md: 4, xl: 3 }}>
                <VideoCard videoDetail={videoItem} />
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
