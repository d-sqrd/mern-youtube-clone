import axios from "axios";
import React, { useEffect, useState } from "react";
import suggestedVideosLocal from "../suggestedVideos";
import { Box } from "@mui/material";
import VideoCard from "./VideoCard";
import Loading from "./Loading";

const SuggestedVideos = ({ parentVideoId }) => {
  // console.log(`ParentVidId = ${parentVideoId}`);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchSuggestedVideos = async () => {
      const options = {
        method: "GET",
        url: "http://localhost:5000/api/v1/getRelatedVideos",
        params: {
          relatedVideoId: parentVideoId,
        },
      };
      try {
        const response = await axios.request(options);
        if (response.status === 200) {
          setSuggestedVideos(response.data.videoList);
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log(`Suggested-vids...error = ${err}`);
      } finally {
        setIsDataLoaded(true);
      }
    };
    // fetchSuggestedVideos();
    // setSuggestedVideos(suggestedVideosLocal.items);
  }, [parentVideoId]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
      }}
    >
      {isDataLoaded && suggestedVideos ? (
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
  );
};

export default SuggestedVideos;
