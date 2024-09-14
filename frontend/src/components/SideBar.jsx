import {
  Box,
  Grid2,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";

const SideBar = () => {
  const categories = [
    "Music",
    "Movies",
    "Gaming",
    "Education",
    "Sports",
    "News",
  ];
  return (
    <Box>
      <Grid2 container display="flex" direction="column">
        {categories.map((categoryItem, index) => {
          return (
            <Grid2 key={index} sx={{ marginLeft: "12px" }}>
              <ListItemButton>
                <ListItemIcon>
                  {/* add utility function to fetch the correct icon for the category */}
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText primary={categoryItem} />
              </ListItemButton>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default SideBar;
