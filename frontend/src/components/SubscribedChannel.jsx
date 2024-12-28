import React from "react";
import { Box, Card, CardContent, CardMedia, Link } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const SubscribedChannel = ({ channel }) => {
  /*
    channel = {
      channelName: <...>,
      channelId: <...>
    }
  */
  console.log(`subscribed-channel...channel = ${JSON.stringify(channel)}`);
  const windowHook = useWindowSize();
  const navigate = useNavigate();
  const thumbnailSrc = "https://picsum.photos/200";

  const handleRouteToChannelPage = () => {
    // when app is live uncomment below lines
    navigate(`/channel/${channel.channelId}`, {
      state: { channelDetail: channel },
    });
    // when app is live comment below lines
    // navigate(`/channel/${channel.items.id}`, {
    //   state: { channelDetail: channel },
    // });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          width: "35vw",
          height: "25vh",
          margin: 1,
          ...(windowHook.width < 1000 && { width: "100%", height: "30%" }),
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CardMedia
            component="img"
            sx={{ maxWidth: "30%", height: "100%", objectFit: "fill" }}
            image={thumbnailSrc}
            // alt={channel.items?.snippet?.title} // when showing data from local dummy file
            alt={channel.channelName} // when app is live
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Link
              component="button"
              underline="none"
              variant="h5"
              color="textPrimary"
              sx={{ fontWeight: "600" }}
              onClick={handleRouteToChannelPage}
            >
              {/* comment below code when app is live */}
              {/* {channel.items?.snippet?.title.length > 50
                ? channel.items?.snippet?.title.slice(0, 50) + "..."
                : channel.items?.snippet?.title} */}

              {/* uncomment below code when app is live */}
              {channel.channelName.length > 50
                ? channel.channelName.slice(0, 50) + "..."
                : channel.channelName}
            </Link>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default SubscribedChannel;
