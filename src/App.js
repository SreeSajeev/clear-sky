// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/weatherScreen/weatherScreen"; // Import Home component
import AboutUs from "./Components/AboutUs/aboutUs"; // Import AboutUs component
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <NavBar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route exact path="/" element={<Home theme={theme} />} />
          <Route path="/about" element={<AboutUs theme={theme} />} />
          {/* Add more routes for other pages */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
