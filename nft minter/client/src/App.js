import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import GenerateImage from "./components/GenerateImage";
import MintNFT from "./components/MintNFT";
import About from "./components/About";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : ""}`}>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">MINTVERSE</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2024 MINTVERSE. All rights reserved.</p>
      </footer>
    </div>
  );
}

const HomePage = () => {
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1639431682329-4963b8863434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80");

  return (
    <div className="homepage-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content-wrapper">
        <h1 className="main-heading">MINTVERSE</h1>
        <p className="sub-heading">Create and mint your unique NFTs with ease.</p>
        <div className="components-wrapper">
          <GenerateImage setImageUrl={setImageUrl} />
          <MintNFT imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default App;
