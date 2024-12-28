import React from "react";
import { Box, Card, CardContent, CardMedia, Link } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const SubscribedChannel = ({ channel }) => {
  console.log(`subscribed-channel...channel = ${JSON.stringify(channel)}`);
  const windowHook = useWindowSize();
  const navigate = useNavigate();
  const thumbnailSrc =
    channel.items?.snippet?.thumbnails?.high?.url ||
    channel.items?.snippet?.thumbnails?.medium?.url ||
    channel.items?.snippet?.thumbnails?.default?.url;

  const handleRouteToChannelPage = () => {
    navigate(`/channel/${channel.items.id}`, {
      state: { channelDetail: channel },
    });
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
            alt={channel.items?.snippet?.title}
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
              {channel.items?.snippet?.title.length > 50
                ? channel.items?.snippet?.title.slice(0, 50) + "..."
                : channel.items?.snippet?.title}
            </Link>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default SubscribedChannel;
