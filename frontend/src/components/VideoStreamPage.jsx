import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { Box, Button, Typography, Grid2, Paper } from "@mui/material";
import SuggestedVideos from "./SuggestedVideos";

const VideoStreamPage = () => {
  const { videoId } = useParams();
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  // console.log(`Params = ${videoId}`);
  const {
    state: { videoDetail },
  } = useLocation();
  console.log(`VideoDetail = ${JSON.stringify(videoDetail)}`);
  const handleOnProgress = (event) => {
    console.log(`handleOnProgress = ${JSON.stringify(event)}`);
  };
  return (
    <Box sx={{ marginTop: 1, background: "#888888" }}>
      <Grid2 container display="flex" direction="row">
        <Grid2 size={{ md: 9 }}>
          <Box>
            <Box
              sx={{
                borderRadius: "10px",
                // border: "5px solid red",
                overflow: "hidden",
              }}
            >
              <ReactPlayer
                url={url}
                controls={true}
                // onProgress={handleOnProgress}
                width="100%"
              />
            </Box>

            <Box sx={{ flexDirection: "column" }}>
              <Box>
                <Typography variant="h6">
                  {videoDetail.snippet.title}
                </Typography>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6">
                      {videoDetail.snippet.channelTitle}
                    </Typography>
                  </Box>
                  <Box>
                    <Button>Subscribe</Button>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ height: "100px", borderRadius: "15px" }}>
                    <Paper
                      sx={{
                        height: "100%",
                        padding: "10px",
                        background: "#888899",
                      }}
                    >
                      <Typography>{videoDetail.snippet.description}</Typography>
                    </Paper>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={{ md: 3 }}>
          <SuggestedVideos />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default VideoStreamPage;
