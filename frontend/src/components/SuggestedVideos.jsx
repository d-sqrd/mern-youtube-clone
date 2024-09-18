import React from "react";
import data from "../raw_YT_data";
import { Box } from "@mui/material";
import VideoCard from "./VideoCard";

const SuggestedVideos = () => {
  console.log(data);
  return (
    <Box sx={{ display: "flex", flexDirection: "row", maxWidth: "100%" }}>
      <Box>
        {data.items.map((video, index) => {
          return (
            <Box>
              <VideoCard videoDetail={video} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SuggestedVideos;
