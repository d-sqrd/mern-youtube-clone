import "./App.css";

import HomePage from "./components/HomePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoStreamPage from "./components/VideoStreamPage";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [searchbarString, setSearchbarString] = useState("");
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  return (
    <div className="App">
      <Router>
        <Navbar
          setSearchbarString={setSearchbarString}
          sidebarVisibility={sidebarVisibility}
          setSidebarVisibility={setSidebarVisibility}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchbarString={searchbarString}
                sidebarVisibility={sidebarVisibility}
              />
            }
          />
          <Route
            path="/video/:videoId"
            element={
              <VideoStreamPage
                sidebarVisibility={sidebarVisibility}
                setSidebarVisibility={setSidebarVisibility}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
