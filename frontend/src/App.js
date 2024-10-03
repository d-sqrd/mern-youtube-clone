import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import VideoStreamPage from "./components/VideoStreamPage";
import Navbar from "./components/Navbar";
import { useState } from "react";
import LoginModal from "./components/LoginModal";

function App() {
  const [searchbarString, setSearchbarString] = useState("");
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [loginModalVisibility, setLoginModalVisibility] = useState(false);
  // console.log(`App.js searchbarString = ${searchbarString}`);
  return (
    <div className="App">
      <Router>
        <Navbar
          setSearchbarString={setSearchbarString}
          sidebarVisibility={sidebarVisibility}
          setSidebarVisibility={setSidebarVisibility}
          setLoginModalVisibility={setLoginModalVisibility}
        />
        <LoginModal
          loginModalVisibility={loginModalVisibility}
          setLoginModalVisibility={setLoginModalVisibility}
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
            element={<VideoStreamPage sidebarVisibility={sidebarVisibility} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
