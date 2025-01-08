import "./App.css";
import "./variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import VideoStreamPage from "./components/VideoStreamPage";
import Navbar from "./components/Navbar";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import { Box } from "@mui/material";
import WatchHistory from "./components/WatchHistory";
import LikedVideos from "./components/LikedVideos";
import SubscribedChannels from "./components/SubscribedChannels";
import ChannelPage from "./components/ChannelPage";

function App() {
  const [searchbarString, setSearchbarString] = useState("");
  // console.log(`App.js searchbarString = ${searchbarString}`);
  return (
    <div className="App">
      <Router>
        {/* <Box sx={{ position: "sticky", top: 0, zIndex: "100" }}>
          <Navbar setSearchbarString={setSearchbarString} />
          <LoginModal />
        </Box> */}
        <Box
          sx={
            {
              // height: "100%",
              // border: "2px solid yellow",
            }
          }
        >
          <Box sx={{ position: "sticky", top: 0, zIndex: "100" }}>
            <Navbar setSearchbarString={setSearchbarString} />
            <LoginModal />
          </Box>
          <Routes>
            <Route
              path="/"
              element={<HomePage searchbarString={searchbarString} />}
            />
            <Route path="/video/:videoId" element={<VideoStreamPage />} />
            <Route path="/watchhistory" element={<WatchHistory />} />
            <Route path="/likedvideos" element={<LikedVideos />} />
            <Route
              path="/subscribedchannels"
              element={<SubscribedChannels />}
            />
            <Route path="/channel/:channelId" element={<ChannelPage />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
