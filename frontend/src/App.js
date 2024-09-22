import "./App.css";

import HomePage from "./components/HomePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoStreamPage from "./components/VideoStreamPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video/:videoId" element={<VideoStreamPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
