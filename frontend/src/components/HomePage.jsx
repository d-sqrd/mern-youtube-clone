import { Box, Grid2 } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Feed from "./Feed";
import useWindowSize from "../hooks/useWindowSize";
import SideBar from "./SideBar";

const HomePage = () => {
  const size = useWindowSize();
  useEffect(() => {
    // fetch different category YT videos to show on initial page load
  }, []);
  return (
    // <Box sx={{ height: "100vh", border: 1 }}>
    <Box sx={{ marginTop: 1 }}>
      <Grid2 container display="flex" direction="row">
        {size.width >= 600 && (
          <Grid2 size={3}>
            <SideBar />
          </Grid2>
        )}
        <Grid2 size={{ sm: 9 }}>
          <Feed />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HomePage;
