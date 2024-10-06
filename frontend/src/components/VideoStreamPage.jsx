import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { Box, Button, Typography, Grid2, Paper } from "@mui/material";
import SuggestedVideos from "./SuggestedVideos";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const VideoStreamPage = () => {
  const { videoId } = useParams();
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const {
    state: { videoDetail },
  } = useLocation();
  // console.log(`VideoDetail = ${JSON.stringify(videoDetail)}`);
  const handleOnProgress = (event) => {
    console.log(`handleOnProgress = ${JSON.stringify(event)}`);
  };
  return (
    <Box sx={{ pt: 1, background: "#fff" }}>
      <Grid2 container display="flex" direction="row">
        <Grid2 size={{ md: 9 }}>
          <Box
            sx={{
              // margin: 1,
              position: "sticky",
              top: "8.5%",
              ml: 1,
              // top: 0,
              // pt: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: "10px",
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
                <Typography variant="h5" sx={{ mt: 1 }}>
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
                    <Typography variant="h6" sx={{ fontSize: "large" }}>
                      {videoDetail.snippet.channelTitle}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#000",
                        border: "1px solid black",
                        borderTopLeftRadius: "100px",
                        borderBottomLeftRadius: "100px",
                        borderRight: 0,
                      }}
                    >
                      <ThumbUpIcon sx={{ mr: 1 }} />
                      <Typography sx={{ fontSize: "small" }}>
                        {`${Math.floor(Math.random() * 1000)}k`}
                      </Typography>
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#000",
                        border: "1px solid black",
                        borderTopRightRadius: "100px",
                        borderBottomRightRadius: "100px",
                        mr: 2,
                      }}
                    >
                      <ThumbDownIcon />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#000",
                        color: "#FFFFFF",
                        borderRadius: "100px",
                      }}
                    >
                      Subscribe
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{
                      mt: 2,
                      borderRadius: "15px",
                      // border: "1px solid red",
                    }}
                  >
                    <Paper
                      elevation={4}
                      sx={{
                        padding: "10px",
                        // background: "#88b6bd",
                        fontColor: "#fff",
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
          <Box>
            <SuggestedVideos parentVideoId={videoId} />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default VideoStreamPage;
