import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import VideoStreamPage from "./components/VideoStreamPage";
import Navbar from "./components/Navbar";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import { Box } from "@mui/material";

function App() {
  const [searchbarString, setSearchbarString] = useState("");
  // console.log(`App.js searchbarString = ${searchbarString}`);
  return (
    <div className="App">
      <Router>
        <Box sx={{ position: "sticky", top: 0, zIndex: "100" }}>
          <Navbar setSearchbarString={setSearchbarString} />
          <LoginModal />
        </Box>
        <Box>
          <Routes>
            <Route
              path="/"
              element={<HomePage searchbarString={searchbarString} />}
            />
            <Route path="/video/:videoId" element={<VideoStreamPage />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
