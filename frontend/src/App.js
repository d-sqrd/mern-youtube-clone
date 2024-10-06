import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import VideoStreamPage from "./components/VideoStreamPage";
import Navbar from "./components/Navbar";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import { Box } from "@mui/material";
import SideBar from "./components/SideBar";

function App() {
  const [searchbarString, setSearchbarString] = useState("");
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [loginModalVisibility, setLoginModalVisibility] = useState(false);
  // console.log(`App.js searchbarString = ${searchbarString}`);
  return (
    <div className="App">
      {/* <SideBar sidebarVisibility={sidebarVisibility} /> */}
      <Router>
        <Box sx={{ position: "sticky", top: 0, zIndex: "100" }}>
          {/* <SideBar /> */}
          {/* <Navbar
            setSearchbarString={setSearchbarString}
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
            setLoginModalVisibility={setLoginModalVisibility}
            /> */}
          <Navbar
            setSearchbarString={setSearchbarString}
            setLoginModalVisibility={setLoginModalVisibility}
          />
          <LoginModal
            loginModalVisibility={loginModalVisibility}
            setLoginModalVisibility={setLoginModalVisibility}
          />
        </Box>
        <Box>
          <Routes>
            <Route
              path="/"
              element={
                // <HomePage
                //   searchbarString={searchbarString}
                //   sidebarVisibility={sidebarVisibility}
                // />
                <HomePage searchbarString={searchbarString} />
              }
            />
            <Route
              path="/video/:videoId"
              element={
                // <VideoStreamPage sidebarVisibility={sidebarVisibility} />
                <VideoStreamPage />
              }
            />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
