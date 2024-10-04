import { Box } from "@mui/material";
import React, { useRef, useEffect } from "react";
import Feed from "./Feed";

const HomePage = ({ searchbarString, sidebarVisibility }) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  }, []);

  console.log(`Homepage render count = ${renderCount.current}`);
  return (
    <Box sx={{ marginTop: 1 }}>
      <Feed searchString={searchbarString} />
    </Box>
  );
};

export default HomePage;
