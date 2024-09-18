import axios from "axios";
import React, { useEffect, useState } from "react";
import suggestedVideosLocal from "../suggestedVideos";
import { Box } from "@mui/material";
import VideoCard from "./VideoCard";
import Loading from "./Loading";

const SuggestedVideos = ({ parentVideoId }) => {
  console.log(`ParentVidId = ${parentVideoId}`);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchSuggestedVideos = async () => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_URL}/search`,
      params: {
        relatedToVideoId: parentVideoId,
        part: "id,snippet",
        type: "video",
        maxResults: "50",
      },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": process.env.REACT_APP_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      setSuggestedVideos(response.data.items);
      setIsDataLoaded(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetchSuggestedVideos();
    setSuggestedVideos(suggestedVideosLocal);
    setIsDataLoaded(true);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", maxWidth: "100%" }}>
      <Box>
        {isDataLoaded ? (
          suggestedVideos.items.map((video, index) => {
            return (
              <Box>
                <VideoCard videoDetail={video} />
              </Box>
            );
          })
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default SuggestedVideos;
