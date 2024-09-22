import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";
import axios from "axios";

const SideBar = () => {
  const fetchCategoryWiseVideos = async (category) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_URL + "/search",
      params: {
        q: category,
        part: "snippet,id",
        regionCode: "US",
        maxResults: "101",
        order: "date",
      },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": process.env.REACT_APP_HOST,
      },
    };
    console.log(`options = ${options.url}`);
    try {
      const response = await axios.request(options);
      console.log(`Sidebar = ${JSON.stringify(response.data)}`);
      // setFeedVideos(response.data.items);
      // setFeedVideosLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnClick = (category) => {
    fetchCategoryWiseVideos(category);
  };
  const categories = [
    "Music",
    "Movies",
    "Gaming",
    "Education",
    "Sports",
    "News",
  ];
  return (
    <Box container display="flex" flexDirection="column">
      {categories.map((categoryItem, index) => {
        return (
          <Box key={index} sx={{ marginLeft: "12px" }}>
            <ListItemButton onClick={() => handleOnClick(categoryItem)}>
              <ListItemIcon>
                {/* add utility function to fetch the correct icon for the category */}
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary={categoryItem} />
            </ListItemButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default SideBar;
