import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import SubscribedChannel from "./SubscribedChannel";
import channelList from "../sampleChannelDetails";

const SubscribedChannels = () => {
  const [subscribedChannelList, setSubscribedChannelList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const sortAndSetSubscribedChannelList = (responseFromDB) => {
    // sort the subscribed channels alphabetically
    try {
      let subscribedChannelListList =
        responseFromDB.data.data.subscribedChannels;
      subscribedChannelListList.sort(
        (subscribedChannelListItem1, subscribedChannelListItem2) => {
          return (
            subscribedChannelListItem1.channelName -
            subscribedChannelListItem2.channelName
          );
        }
      );
      setSubscribedChannelList(subscribedChannelListList);
    } catch (err) {
      console.log(`subscribed-channel...error setting list from DB = ${err}`);
    }
  };

  useEffect(() => {
    const fetchSubscribedChannels = async () => {
      const authToken = localStorage.getItem("loginAuthToken");
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (authToken && loggedInUserEmail) {
        const URL = "http://localhost:5000/api/v1/getSubscribedChannels";
        try {
          const options = {
            method: "GET",
            url: URL,
            params: {
              userEmail: loggedInUserEmail,
            },
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          };
          const response = await axios.request(options);
          //   console.log(
          //     `subscribed-channel response = ${JSON.stringify(response)}`
          //   );
          if (response.status === 200) {
            sortAndSetSubscribedChannelList(response);
          }
        } catch (error) {
          // add UI to handle error
          console.log(`watch-history error = ${error}`);
        } finally {
          setIsDataLoaded(true);
        }
      }
    };
    // fetchSubscribedChannels();
    console.log(
      `subscribed-channels...channelList = ${JSON.stringify(channelList)}`
    );
    setSubscribedChannelList(channelList);
    setIsDataLoaded(true);
  }, []);
  return (
    <Box sx={{ height: "100vh" }}>
      {/* UI when user is not logged in but tries to access Subscribed Channels route */}
      {!localStorage.getItem("loginAuthToken") && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateY(500%)",
          }}
        >
          <Typography variant="h5">
            Please Login to view your Subcribed Channels
          </Typography>
        </Box>
      )}
      {/* UI when logged in user is routed to Suncribed Channels route */}
      {localStorage.getItem("loginAuthToken") && (
        <Box sx={{ width: "100%" }}>
          {/* UI when user has no channels subscribed */}
          {isDataLoaded &&
            subscribedChannelList &&
            !subscribedChannelList.length && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5">
                  Please susbcribe some channels to create your Subcribed
                  Channels list!
                </Typography>
              </Box>
            )}
          {/* UI when user has some channels subcribed */}
          {isDataLoaded &&
            subscribedChannelList &&
            subscribedChannelList.length && (
              <Box>
                {subscribedChannelList.map((subscribedChannel, index) => {
                  return (
                    <Box key={index}>
                      {/* when subscribed channels list will be fetched from DB then pass the date field as well as prop to HistoryItem */}
                      <SubscribedChannel
                        channel={subscribedChannel}
                        // setSubscribedChannelList={
                        //   sortAndSetSubscribedChannelList
                        // }
                      />
                    </Box>
                  );
                })}
              </Box>
            )}
        </Box>
      )}
    </Box>
  );
};

export default SubscribedChannels;
