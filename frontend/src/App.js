import "./App.css";

import HomePage from "./components/HomePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoStreamPage from "./components/VideoStreamPage";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [searchbarString, setSearchbarString] = useState("");
  return (
    <div className="App">
      <Router>
        <Navbar setSearchbarString={setSearchbarString} />
        <Routes>
          <Route
            path="/"
            element={<HomePage searchbarString={searchbarString} />}
          />
          <Route path="/video/:videoId" element={<VideoStreamPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
