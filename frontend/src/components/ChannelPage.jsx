import {
  Box,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import Feed from "./Feed";

const ChannelPage = () => {
  const location = useLocation();
  const channel = location.state.channelDetail; // this will only store channelId and the channel name _> use this to fetch other details related to the channel from the API
  const backgroundImgUrl =
    channel.items?.brandingSettings?.image?.bannerExternalUrl;
  const thumbnailImgUrl =
    channel.items.snippet.thumbnails?.default?.url ||
    channel.items.snippet.thumbnails?.medium?.url ||
    channel.items.snippet.thumbnails?.high?.url;
  //   console.log(
  //     `channel-page...channel = ${JSON.stringify(channel.items.snippet)}`
  //   );
  //   useEffect(() => {
  //     const fetchChannelDetails = async () => {
  //       // fetch list of videos of the current channel
  //       const authToken = localStorage.getItem("loginAuthToken");
  //       const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  //       if (authToken && loggedInUserEmail) {
  //         const URL = "http://localhost:5000/api/v1/getLikedVideos";
  //         try {
  //           const options = {
  //             method: "GET",
  //             url: URL,
  //             params: {
  //               userEmail: loggedInUserEmail,
  //             },
  //             headers: {
  //               authorization: `Bearer ${authToken}`,
  //             },
  //           };
  //           const response = await axios.request(options);
  //           console.log(`liked-videos response = ${JSON.stringify(response)}`);
  //           if (response) {
  //             sortAndSetLikedVideoList(response);
  //           }
  //         } catch (error) {
  //           // add UI to handle error
  //           console.log(`liked-videos error = ${error}`);
  //         } finally {
  //           setIsDataLoaded(true);
  //         }
  //     };
  //     fetchChannelDetails();
  //   });
  const optionsForFetchingFeedVideos = {
    method: "GET",
    url: "http://localhost:5000/api/v1/getChannelVideos",
    params: {
      // channelId: channel.channelId,  // should work like this _> refactor code
      channelId: channel.items.id,
    },
  };

  return (
    <Box sx={{ border: "1px solid magenta" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100px",
            margin: 1,
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "10px",
            backgroundImage: `url(${backgroundImgUrl})`,
            backgroundSize: "100% 100%",
          }}
        />
      </Box>
      <Box
        sx={{
          height: "1px",
          width: "100%",
          border: "1px solid black",
          margin: 1,
        }}
      />
      {/* Below box will contain everything below the banner picture */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* below box will contain channel thumbnail, channel name, views and subscriber counts */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // border: "1px solid black",
            margin: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              //   border: "1px solid black",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "10vw",
                height: "10%",
                borderRadius: "50%",
                objectFit: "fill",
                marginRight: 2,
              }}
              image={thumbnailImgUrl}
              alt={channel.items.snippet.title}
            />
            <Box>
              <Typography variant="h4">
                {channel.items.snippet.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="p" sx={{ marginRight: 1 }}>
                  {channel.items.statistics?.subscriberCount >= 1000000000
                    ? `$(channel.items.statistics?.subscriberCount / 1000000000)B `
                    : channel.items.statistics?.subscriberCount < 1000000000 &&
                      channel.items.statistics?.subscriberCount >= 1000000
                    ? `${channel.items.statistics?.subscriberCount / 1000000}M `
                    : channel.items.statistics?.subscriberCount >= 1000 &&
                      channel.items.statistics?.subscriberCount < 1000000
                    ? `${channel.items.statistics?.subscriberCount / 1000}K `
                    : channel.items.statistics?.subscriberCount}
                  subscribers
                </Typography>
                <CircleIcon
                  sx={{
                    transform: "scale(0.2)",
                  }}
                />
                <Typography variant="p" sx={{ marginRight: 1 }}>
                  {channel.items.statistics?.videoCount} videos
                </Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
                {channel.items?.brandingSettings?.channel?.description}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "1px%",
            width: "100%",
            border: "1px solid black",
            margin: 1,
          }}
        />
        {/* below box will contain channel videos _> basically the Feed component */}
        <Box
          sx={{
            // border: "1px solid black",
            marginTop: 1,
          }}
        >
          <Feed optionsForFetchingFeedVideos={optionsForFetchingFeedVideos} />
        </Box>
      </Box>

      {/* old code */}
      {/* <Box>
        <Box sx={{ display: "flex", margin: 1 }}>
          <CardMedia
            component="img"
            sx={{
              width: "10%",
              height: "10%",
              borderRadius: "50%",
              objectFit: "fill",
            }}
            image={thumbnailImgUrl}
            alt={channel.items.snippet.title}
          />
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4">{channel.items.snippet.title}</Typography>
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="p" sx={{ marginRight: 1 }}>
                {channel.items.statistics?.subscriberCount} subscribers
              </Typography>
              <Typography variant="p" sx={{ marginRight: 1 }}>
                ||
              </Typography>
              <Typography variant="p" sx={{ marginRight: 1 }}>
                {channel.items.statistics?.videoCount} videos
              </Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
              {channel.items?.brandingSettings?.channel?.description}
            </Typography>
          </CardContent>
          <Box>
            <Feed />
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};

export default ChannelPage;
