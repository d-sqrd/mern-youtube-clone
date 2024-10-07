import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TheatersIcon from "@mui/icons-material/Theaters";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SchoolIcon from "@mui/icons-material/School";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const getSidebarIcon = (category) => {
  switch (category) {
    case "Music":
      return <MusicNoteIcon />;
    case "Movies":
      return <TheatersIcon />;
    case "Gaming":
      return <SportsEsportsIcon />;
    case "Education":
      return <SchoolIcon />;
    case "Sports":
      return <SportsTennisIcon />;
    case "News":
      return <NewspaperIcon />;
    default:
      break;
  }
};

const SideBar = ({ sidebarVisibility }) => {
  console.log(`Sidebar sidebarVisibility = ${sidebarVisibility}`);
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

  const { isSidebarOpen } = useContext(AppContext);
  //   return (
  //     <>
  //       {sidebarVisibility && (
  //         <Box container display="flex" flexDirection="column">
  //           {categories.map((categoryItem, index) => {
  //             return (
  //               <Box key={index} sx={{ marginLeft: "12px" }}>
  //                 <ListItemButton onClick={() => handleOnClick(categoryItem)}>
  //                   <ListItemIcon>
  //                     {/* add utility function to fetch the correct icon for the category */}
  //                     <ImageIcon />
  //                   </ListItemIcon>
  //                   <ListItemText primary={categoryItem} />
  //                 </ListItemButton>
  //               </Box>
  //             );
  //           })}
  //         </Box>
  //       )}
  //     </>
  //   );
  // };
  console.log(`sidebar isSidebarOpen = ${isSidebarOpen}`);
  return (
    <>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <Box container display="flex" flexDirection="column">
          {categories.map((categoryItem, index) => {
            return (
              <Box
                key={index}
                sx={{
                  marginLeft: 2,
                  // border: "1px solid red",
                  borderRadius: "10px",
                }}
              >
                <ListItemButton onClick={() => handleOnClick(categoryItem)}>
                  <ListItemIcon>{getSidebarIcon(categoryItem)}</ListItemIcon>
                  <ListItemText primary={categoryItem} />
                </ListItemButton>
              </Box>
            );
          })}
        </Box>
      </aside>
    </>
  );
};

export default SideBar;
