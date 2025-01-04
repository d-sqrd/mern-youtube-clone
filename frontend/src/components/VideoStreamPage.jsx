import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import SuggestedVideos from "./SuggestedVideos";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import useWindowSize from "../hooks/useWindowSize";

const VideoStreamPage = () => {
  const location = useLocation();
  const videoDetail = location.state.videoDetail;
  const { toggleLoginModal } = useContext(AppContext);
  const url = `https://www.youtube.com/watch?v=${videoDetail.id.videoId}`;
  const [isChannelAlreadySubscribed, setIsChannelAlreadySubscribed] =
    useState(false);
  const [isLikedVideo, setIsLikedVideo] = useState(null);
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
          method: "PATCH",
          url: "http://localhost:5000/api/v1/addToWatchHistory",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          data: {
            user: {
              email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
            },
            data: {
              watchHistory: {
                date: new Date(),
                videoDetail: videoDetail,
              },
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
          method: "PATCH",
          url: "http://localhost:5000/api/v1/subscribeChannel",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          data: {
            user: {
              email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
            },
            channel: {
              channelName: videoDetail.snippet.channelTitle,
              channelId: videoDetail.snippet.channelId,
            },
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
        method: "PATCH",
        url: "http://localhost:5000/api/v1/unsubscribeChannel",
        headers: {
          authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
        },
        data: {
          user: {
            email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
          },
          channel: {
            channelId: videoDetail.snippet.channelId,
          },
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
  const handleLikeClick = async () => {
    if (
      !localStorage.getItem("loginAuthToken") &&
      !localStorage.getItem("loggedInUserEmail")
    ) {
      // set visibility of login modal to true
      toggleLoginModal();
    } else {
      try {
        const options = {
          method: "PATCH",
          url: "http://localhost:5000/api/v1/addLikedVideo",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          data: {
            user: {
              email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
            },
            videoDetail: {
              videoId: videoDetail.id.videoId,
              videoDetail: videoDetail,
            },
            date: new Date(),
          },
        };
        const response = await axios.request(options);
        if (response.status === 200) {
          console.log(`video-stream-page...like video successful`);
          setIsLikedVideo(!isLikedVideo);
        }
      } catch (error) {
        // add UI to handle error
        console.log(`video-stream-page...subscribe channel error = ${error}`);
      }
    }
  };
  const handleUnlikeClick = async () => {
    if (
      !localStorage.getItem("loginAuthToken") &&
      !localStorage.getItem("loggedInUserEmail")
    ) {
      // set visibility of login modal to true
      toggleLoginModal();
    } else {
      try {
        const options = {
          method: "PATCH",
          url: "http://localhost:5000/api/v1/removeLikedVideo",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          data: {
            user: {
              email: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
            },
            videoDetail: {
              videoId: videoDetail.id.videoId,
            },
          },
        };
        const response = await axios.request(options);
        if (response.status === 200) {
          console.log(`video-stream-page...like video successful`);
          setIsLikedVideo(false);
        }
      } catch (error) {
        // add UI to handle error
        console.log(`video-stream-page...subscribe channel error = ${error}`);
      }
    }
  };
  useEffect(() => {
    console.log(`vid-stream-page...useEffect`);
    const checkChannelSubscriptionStatus = async () => {
      console.log(`vid-stream-page...checkChannelSubscriptionStatus`);
      try {
        // get subscribed channel list of currently logged in user from DB
        const options = {
          method: "GET",
          url: "http://localhost:5000/api/v1/getSubscribedChannels",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          params: {
            userEmail: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
          },
        };
        const response = await axios.request(options);
        console.log(
          `video-stream-page...getSubscribedChannels response = ${JSON.stringify(
            response
          )}`
        );
        if (response.status === 200) {
          const subscribedChannelList = response.data.data.subscribedChannels;
          const existingSubscribedChannel = subscribedChannelList.filter(
            (subscribedChannel) =>
              subscribedChannel.channelId === videoDetail.snippet.channelId
          );
          if (existingSubscribedChannel && existingSubscribedChannel.length) {
            setIsChannelAlreadySubscribed(true);
          } else {
            setIsChannelAlreadySubscribed(false);
          }
        }
      } catch (error) {
        // add UI to handle error
        console.log(
          `video-stream-page...check channel subscription status error = ${error}`
        );
      }
    };
    const checkVideoLikeStatus = async () => {
      // console.log(`vid-stream-page...checkVideoLikeStatus`);
      try {
        // get liked videos list of currently logged in user from DB
        const options = {
          method: "GET",
          url: "http://localhost:5000/api/v1/getLikedVideos",
          headers: {
            authorization: `Bearer ${localStorage.getItem("loginAuthToken")}`,
          },
          params: {
            userEmail: localStorage.getItem("loggedInUserEmail"), // modify code to fetch logged-in user email from AppContext
          },
        };
        const response = await axios.request(options);
        // console.log(
        //   `video-stream-page...checkVideoLikeStatus response = ${JSON.stringify(
        //     response
        //   )}`
        // );
        if (response.status === 200) {
          const likedVideosList = response.data.data.likedVideos;
          const existingLikedVideo = likedVideosList.filter(
            (likedVideo) => likedVideo.videoId === videoDetail.id.videoId
          );
          if (existingLikedVideo && existingLikedVideo.length) {
            setIsLikedVideo(true);
          } else {
            setIsLikedVideo(false);
          }
        }
      } catch (error) {
        // add UI to handle error
        console.log(
          `video-stream-page...check channel subscription status error = ${error}`
        );
      }
    };
    checkChannelSubscriptionStatus();
    checkVideoLikeStatus();
  }, [videoDetail]);

  const windowHook = useWindowSize();
  // console.log(`vid-stream-page - window = ${JSON.stringify(window)}`);
  return (
    <Box
      sx={{
        pt: 1,
      }}
    >
      <Grid2 container display="flex" direction="row">
        {/* Parent container for the left side of the page */}
        <Grid2 size={{ xs: 12, md: 9 }}>
          {/* Parent container Box for the left side of the page - includes the video player, video title, channel title, like, dislike, subscribe and unsubscribe buttons */}
          <Box
            sx={{
              position: "sticky",
              top: "8.5%",
              ml: 1,
              mr: 1,
              display: "flex",
              flexDirection: "column",
              ...(windowHook.width < 500 && { mb: 1 }),
            }}
          >
            {/* Container Box for React Player */}
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
                onStart={handleOnStart}
                width={
                  windowHook.width < 500 ? `${windowHook.width}px` : "100%"
                }
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
                  ...(windowHook.width < 500 && {
                    flexDirection: "column",
                  }),
                  ...(windowHook.width >= 500 && {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }),
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "large" }}>
                    {videoDetail.snippet.channelTitle}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    ...(windowHook.width < 500 && {
                      justifyContent: "space-between",
                    }),
                  }}
                >
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleLikeClick}
                      sx={{
                        color: "black",
                        // backgroundColor: "black",
                        border: "1px solid #fff",
                        borderTopLeftRadius: "100px",
                        borderBottomLeftRadius: "100px",
                        borderRight: 0,
                        ...(isLikedVideo && {
                          color: "white",
                          backgroundColor: "black",
                        }),
                      }}
                    >
                      <ThumbUpIcon
                        sx={{
                          mr: 1,
                          color: "black",
                          ...(isLikedVideo && { color: "white" }),
                        }}
                      />
                      <Typography sx={{ fontSize: "small" }}>
                        {`${Math.floor(Math.random() * 1000)}k`}
                      </Typography>
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleUnlikeClick}
                      sx={{
                        color: "black",
                        border: "1px solid #fff",
                        borderTopRightRadius: "100px",
                        borderBottomRightRadius: "100px",
                        mr: 2,
                        ...(!isLikedVideo && {
                          color: "white",
                          backgroundColor: "black",
                        }),
                      }}
                    >
                      <ThumbDownIcon
                        sx={{
                          color: "black",
                          ...(!isLikedVideo && { color: "white" }),
                        }}
                      />
                    </Button>
                  </Box>
                  <Box>
                    {!isChannelAlreadySubscribed && (
                      <Button
                        variant="contained"
                        onClick={handleSubscribe}
                        sx={{
                          border: "1px solid #fff",
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
                          border: "1px solid #fff",
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
          </Box>
        </Grid2>
        {/* Parent container for the suggested videos section of the page */}
        <Grid2 size={{ xs: 12, md: 3 }}>
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
