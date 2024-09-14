import { Box, Grid2 } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import SideBar from "./SideBar";
import Feed from "./Feed";

const HomePage = () => {
  useEffect(() => {
    // fetch different category YT videos to show on initial page load
  }, []);
  return (
    // <Box sx={{ height: "100vh", border: 1 }}>
    <Box sx={{ marginTop: "30px" }}>
      <Grid2 container display="flex" direction="row">
        <Grid2 size={3}>
          <SideBar />
        </Grid2>
        <Grid2 size={9}>
          <Feed />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HomePage;
