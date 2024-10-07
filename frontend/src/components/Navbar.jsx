import React, { useContext, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AppContext } from "../context/AppContext";
import SideBar from "./SideBar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid black",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({ setSearchbarString }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { toggleSidebar, toggleLoginModal } = useContext(AppContext);
  const handleYTIcon = () => {
    navigate("/");
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("menu clicked");
  };

  const handleSearch = () => {
    console.log(`search bar val = ${inputRef.current.value}`);
    setSearchbarString(inputRef.current.value);
    navigate("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignup = () => {
    console.log(`Navbar signup btn clicked`);
  };

  const handleLogout = () => {
    localStorage.clear("loginAuthToken");
    localStorage.clear("loggedInUserEmail");
    navigate("/");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      {/* <AppBar position="static"> */}
      <Box
        container
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          // backgroundColor: "#fff",
          pt: 1,
          backgroundColor: "#fff",
        }}
      >
        {/* Sidebar, Sidebar Toggle Button and Youtube Icon Parent Box */}
        <Box display="flex" direction="column">
          {/* Sidebar Toggle Button and Youtube Icon Box */}
          <Box sx={{ ml: 2 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleYTIcon}
            >
              <YouTubeIcon />
              <Typography variant="h6">YouTube</Typography>
            </IconButton>
          </Box>
          {/* Sidebar Box */}
          <Box sx={{ mt: 2 }}>
            <SideBar />
          </Box>
        </Box>
        {/* Search Bar Box */}
        <Box sx={{ width: "50%" }}>
          <Search
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              borderRadius: "50px",
            }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              ref={inputRef}
              onChange={(e) => (inputRef.current.value = e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>
              <SearchIcon />
            </Button>
          </Search>
        </Box>
        {/* Login/Signup/Account Menu Boxes */}
        <Box sx={{ mr: 2 }}>
          {/* render below only if guest user */}
          {!localStorage.getItem("loginAuthToken") && (
            <Box spacing={2}>
              <Button
                variant="contained"
                onClick={toggleLoginModal}
                sx={{
                  borderRadius: "100px",
                  backgroundColor: "#000",
                  color: "#FFFFFF",
                }}
              >
                Login
              </Button>
              {/* Add Signup button inside login modal pop-up */}
              {/* <Button
                  variant="contained"
                  onClick={handleSignup}
                  sx={{ borderRadius: "100px" }}
                >
                  Signup
                </Button> */}
            </Box>
          )}
          {/* render below Box only if logged in user */}
          {localStorage.getItem("loginAuthToken") && (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Watch History</MenuItem>
                <MenuItem onClick={handleClose}>Liked Videos</MenuItem>
                <MenuItem onClick={handleClose}>My Subscriptions</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Box>
      {/* </AppBar> */}
    </Box>
  );
}
