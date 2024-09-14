import "./App.css";

import Navbar from "../src/components/Navbar";
import HomePage from "./components/HomePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage2 from "./components/HomePage2";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage2" element={<HomePage2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
