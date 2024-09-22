import React, { useRef, useState } from "react";
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
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

export default function Navbar({
  setSearchbarString,
  sidebarVisibility,
  setSidebarVisibility,
  setLoginModalVisibility,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleYTIcon = () => {
    navigate("/");
  };
  const handleMenu = (event) => {
    // setAnchorEl(event.currentTarget);
    console.log("menu clicked");
    setSidebarVisibility(!sidebarVisibility);
  };

  const handleSearch = () => {
    console.log(`search bar val = ${inputRef.current.value}`);
    setSearchbarString(inputRef.current.value);
    setSidebarVisibility(true);
    navigate("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setLoginModalVisibility(true);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static">
        <Box
          container
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ ml: 2, mr: 2 }}
        >
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
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
              <Typography variant="h6">YoutTube</Typography>
            </IconButton>
          </Box>
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
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Search>
          </Box>
          <Box>
            <Button variant="contained" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="contained">Signup</Button>
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={handleMenu}
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
