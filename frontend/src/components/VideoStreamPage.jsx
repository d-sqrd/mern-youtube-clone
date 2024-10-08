import React, { useState, useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import SuggestedVideos from "./SuggestedVideos";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const VideoStreamPage = () => {
  // const { videoId } = useParams();
  // const url = `https://www.youtube.com/watch?v=${videoId}`;
  const {
    state: { videoDetail },
  } = useLocation();
  const url = `https://www.youtube.com/watch?v=${videoDetail.id.videoId}`;
  // console.log(`VideoDetail = ${JSON.stringify(videoDetail)}`);
  const { toggleLoginModal } = useContext(AppContext);
  const [isChannelAlreadySubscribed, setIsChannelAlreadySubscribed] =
    useState(false);
  const handleOnProgress = (event) => {
    console.log(`handleOnProgress = ${JSON.stringify(event)}`);
  };
  const handleOnStart = async () => {
    if (
      localStorage.getItem("loginAuthToken") &&
      localStorage.getItem("loggedInUserEmail")
    ) {
      try {
        const options = {
          method: "POST",
          url: "http://localhost:5000/api/v1/addToWatchHistory",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          data: {
            email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
            watchHistory: {
              date: new Date(),
              videoId: videoDetail.id.videoId,
            },
          },
        };
        const response = await axios.request(options);
        if (response.status === 200) {
          console.log(`video-stream-page...subcribe channel successful`);
          setIsChannelAlreadySubscribed(true);
        }
      } catch (error) {
        console.log(
          `video-stream-page...add to watch history error = ${error}`
        );
      }
    }
  };
  const handleSubscribe = async () => {
    if (
      !localStorage.getItem("loginAuthToken") &&
      !localStorage.getItem("loggedInUserEmail")
    ) {
      // set visibility of login modal to true
      toggleLoginModal();
    } else {
      // add the channel name and channel Id to the current user's DB document and then hide the subscribe button and show the unsubscribe button
      try {
        const options = {
          method: "POST",
          url: "http://localhost:5000/api/v1/subscribeChannel",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          data: {
            email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
            channelName: videoDetail.snippet.channelTitle,
            channelId: videoDetail.snippet.channelId,
          },
        };
        const response = await axios.request(options);
        if (response.status === 200) {
          console.log(`video-stream-page...subcribe channel successful`);
          setIsChannelAlreadySubscribed(true);
        }
      } catch (error) {
        // add UI to handle error
        console.log(`video-stream-page...subscribe channel error = ${error}`);
      }
    }
  };
  const handleUnsubscribe = async () => {
    try {
      const options = {
        method: "POST",
        url: "http://localhost:5000/api/v1/unsubscribeChannel",
        headers: {
          authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
        },
        data: {
          email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
          channelId: videoDetail.snippet.channelId,
        },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        console.log(`video-stream-page...subcribe channel successful`);
        setIsChannelAlreadySubscribed(false);
      }
    } catch (error) {
      // add UI to handle error
      console.log(`video-stream-page...subscribe channel error = ${error}`);
    }
  };
  useEffect(() => {
    const checkChannelSubscriptionStatus = async () => {
      try {
        // get subscribed channel list of currently logged in user from DB
        const options = {
          method: "GET",
          url: "http://localhost:5000/api/v1/getSubscribedChannels",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          data: {
            email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
          },
        };
        const response = await axios.request(options);
        console.log(
          `video-stream-page...getSubscribedChannels response = ${JSON.stringify(
            response
          )}`
        );
        if (response.status === 200) {
          const subscribedChannelList = response.data.subscribedChannels;
          subscribedChannelList.forEach((channelObj) => {
            if (channelObj.channelId === videoDetail.snippet.channelId) {
              // hide subscribe button and show unsubscribe button
              setIsChannelAlreadySubscribed(true);
              return;
            }
          });
        }
      } catch (error) {
        // add UI to handle error
        console.log(
          `video-stream-page...check channel subscription status error = ${error}`
        );
      }
    };
    checkChannelSubscriptionStatus();
  }, [videoDetail.snippet.channelId]);

  return (
    <Box sx={{ pt: 1, background: "#fff" }}>
      <Grid2 container display="flex" direction="row">
        {/* Parent container for the left side of the page */}
        <Grid2 size={{ md: 9 }}>
          {/* Parent container Box for the left side of the page - includes the video player, video title, channel title, like, dislike, subscribe and unsubscribe buttons */}
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
            {/* Container Box for React Player */}
            <Box
              sx={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid red",
              }}
            >
              <ReactPlayer
                url={url}
                controls={true}
                // onProgress={handleOnProgress}
                onStart={handleOnStart}
                width="100%"
              />
            </Box>
            {/* Container Box for video title and channel title, like, dislike, subscribe and unsubscribe buttons */}
            <Box sx={{ flexDirection: "column" }}>
              <Box>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {videoDetail.snippet.title}
                </Typography>
              </Box>
              {/* Container Box for channel title, like, dislike, subscribe and unsubscribe buttons */}
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
                  {!isChannelAlreadySubscribed && (
                    <Button
                      variant="contained"
                      onClick={handleSubscribe}
                      sx={{
                        backgroundColor: "#000",
                        color: "#FFFFFF",
                        borderRadius: "100px",
                      }}
                    >
                      Subscribe
                    </Button>
                  )}
                  {isChannelAlreadySubscribed && (
                    <Button
                      variant="contained"
                      onClick={handleUnsubscribe}
                      sx={{
                        backgroundColor: "#000",
                        color: "#FFFFFF",
                        borderRadius: "100px",
                      }}
                    >
                      Unsubscribe
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid2>
        {/* Parent container for the suggested videos section of the page */}
        <Grid2 size={{ md: 3 }}>
          {/* Parent container Box for the suggested videos section */}
          <Box>
            <SuggestedVideos parentVideoId={videoDetail.id.videoId} />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default VideoStreamPage;
