import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid2 } from "@mui/material";

import data from "../feedVideos";
import VideoCard from "./VideoCard";
import Loading from "./Loading";

const Feed = (props) => {
  const [feedVideos, setFeedVideos] = useState([]);
  const [feedVideosLoaded, setFeedVideosLoaded] = useState(false);
  console.log(`Feed search string = ${props.searchString}`);

  useEffect(() => {
    const fetchFeedData = async () => {
      const options = {
        method: "GET",
        url: process.env.REACT_APP_URL + "/search",
        params: {
          q: props.searchString || "music",
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
      console.log(`options = ${options.url}`);
      try {
        const response = await axios.request(options);
        console.log(`Feed response data = ${JSON.stringify(response.data)}`);
        setFeedVideos(response.data.items);
        setFeedVideosLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    // fetchFeedData();
    setFeedVideos(data.items);
    setFeedVideosLoaded(true);
    // console.log(data);
  }, [props.searchString]);
  return (
    <Box>
      <Grid2 container spacing={2}>
        {feedVideosLoaded ? (
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
