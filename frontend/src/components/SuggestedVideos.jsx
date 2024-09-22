import axios from "axios";
import React, { useEffect, useState } from "react";
import suggestedVideosLocal from "../suggestedVideos";
import { Box } from "@mui/material";
import VideoCard from "./VideoCard";
import Loading from "./Loading";

const SuggestedVideos = (props) => {
  const { parentVideoId } = props;
  // const parentVideoId = "parentVideoId";
  console.log(`ParentVidId = ${parentVideoId}`);
  // const [relatedVideoId, setRelatedVideoId] = useState("");
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchSuggestedVideos = async () => {
      const options = {
        method: "GET",
        url: `${process.env.REACT_APP_URL}/search`,
        params: {
          relatedToVideoId: parentVideoId,

          part: "id,snippet",
          type: "video",
          maxResults: "10",
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
    // setRelatedVideoId(parentVideoId);
    // fetchSuggestedVideos();
    setSuggestedVideos(suggestedVideosLocal.items);
    setIsDataLoaded(true);
  }, [parentVideoId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", maxWidth: "100%" }}>
      <Box>
        {isDataLoaded ? (
          suggestedVideos.map((videoDetail, index) => {
            return (
              <Box key={index}>
                <VideoCard videoDetail={videoDetail} />
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
