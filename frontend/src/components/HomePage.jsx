import { Box, Grid2 } from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import Feed from "./Feed";
import useWindowSize from "../hooks/useWindowSize";
import SideBar from "./SideBar";

const HomePage = ({ searchbarString, sidebarVisibility }) => {
  const renderCount = useRef(0);
  const size = useWindowSize();
  console.log(`homepage search bar string = ${searchbarString}`);
  useEffect(() => {
    renderCount.current += 1;
    // fetch different category YT videos to show on initial page load
  }, []);
  console.log(`Homepage render count = ${renderCount.current}`);
  return (
    // <Box sx={{ height: "100vh", border: 1 }}>
    <Box sx={{ marginTop: 1 }}>
      <Grid2 container display="flex" direction="row">
        {size.width >= 600 && (
          <Grid2 size={3}>
            <SideBar sidebarVisibility={sidebarVisibility} />
          </Grid2>
        )}
        <Grid2 size={{ sm: 9 }}>
          <Feed searchString={searchbarString} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HomePage;
