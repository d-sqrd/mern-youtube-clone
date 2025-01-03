import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@mui/material";
import React, { useContext } from "react";
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
import YouTubeIcon from "@mui/icons-material/YouTube";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

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

const SideBar = ({ setSearchbarString }) => {
  const navigate = useNavigate();
  const handleOnClick = (category) => {
    setSearchbarString(category);
    toggleSidebar();
    navigate("/");
  };
  const handleYTIcon = () => {
    toggleSidebar();
    navigate("/");
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
              background: "#0f0f0f",
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
              color: "#fff",
              backgroundColor: "var(--background-color)",
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
                }),
              }}
            >
              {window.width < 1000 && (
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleYTIcon}
                  >
                    <YouTubeIcon sx={{ color: "red" }} />
                    <Typography variant="h6">YouTube</Typography>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleSidebar}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}

              {categories.map((categoryItem, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: "10px",
                      height: "10%",
                      display: "flex",
                      margin: 2,
                      // width: "100%",
                      ...(window.width < 1000 && {
                        width: "90%",
                        margin: 0,
                      }),
                      color: "#fff",
                      backgroundColor: "var(--background-color)",
                      boxShadow: "1px 1px 10px  var(--box-shadow-color)",
                    }}
                  >
                    <ListItemButton onClick={() => handleOnClick(categoryItem)}>
                      <ListItemIcon sx={{ color: "white" }}>
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
};

export default SideBar;
