import { Box, Grid2 } from "@mui/material";
import React, { useRef, useEffect } from "react";
import Feed from "./Feed";

const HomePage = ({ searchbarString }) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  }, []);

  console.log(`Homepage render count = ${renderCount.current}`);
  return (
    <Grid2 container size={{ sm: 10 }} offset="auto">
      <Box sx={{ marginTop: 1 }}>
        <Feed searchString={searchbarString} />
      </Box>
    </Grid2>
  );
};

export default HomePage;
