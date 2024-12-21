import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TheatersIcon from "@mui/icons-material/Theaters";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SchoolIcon from "@mui/icons-material/School";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dialog } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
    case "Shopping":
      return <ShoppingBagIcon />;
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
    "Shopping",
  ];
  const { isSidebarOpen, toggleSidebar } = useContext(AppContext);
  const window = useWindowSize();
  console.log(`sidebar isSidebarOpen = ${isSidebarOpen}`);
  return (
    <div>
      <Dialog open={isSidebarOpen} onClose={toggleSidebar}>
        <Slide direction="right" in={isSidebarOpen} mountOnEnter unmountOnExit>
          <Box
            style={{
              position: "fixed",
              background: "#FFF",
              height: "100%",
              width: "20%",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              ...(window.width < 1000 && {
                width: "100%",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }),
              top: 0,
              left: 0,
              boxShadow: "2px solid black",
            }}
          >
            <Box
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                ...(window.width < 1000 && {
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginLeft: 1,
                  marginRight: 1,
                }),
              }}
            >
              {window.width < 1000 && (
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleSidebar}
                >
                  <CloseIcon />
                </IconButton>
              )}

              {categories.map((categoryItem, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: "10px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      height: "10%",
                      display: "flex",
                      margin: 2,
                      ...(window.width < 1000 && {
                        width: "100%",
                      }),
                    }}
                  >
                    <ListItemButton onClick={() => handleOnClick(categoryItem)}>
                      <ListItemIcon>
                        {getSidebarIcon(categoryItem)}
                      </ListItemIcon>
                      <ListItemText primary={categoryItem} />
                    </ListItemButton>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Slide>
      </Dialog>
    </div>
  );

  // return (
  //   <>
  //     <aside
  //       className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
  //     >
  // <Box container display="flex" flexDirection="column">
  //   {categories.map((categoryItem, index) => {
  //     return (
  //       <Box
  //         key={index}
  //         sx={{
  //           marginLeft: 2,
  //           // border: "1px solid red",
  //           borderRadius: "10px",
  //         }}
  //       >
  //         <ListItemButton onClick={() => handleOnClick(categoryItem)}>
  //           <ListItemIcon>{getSidebarIcon(categoryItem)}</ListItemIcon>
  //           <ListItemText primary={categoryItem} />
  //         </ListItemButton>
  //       </Box>
  //     );
  //   })}
  // </Box>
  //     </aside>
  //   </>
  // );
};

export default SideBar;
