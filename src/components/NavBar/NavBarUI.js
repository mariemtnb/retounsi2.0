import React from "react";
import "./NavBar.css"; // ✅ Make sure the filename matches
import NavBar from "./NavBar"; // ✅ Import the correct component
import { useNavigate } from "react-router-dom"; // Import useNavigate

function NavBarUI() {
  const navigate = useNavigate(); // Initialize navigate

  // Function to navigate to the home page
  const goToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* Separate "ReTounsi." text from the rest of the navbar */}
        <div className="navbar-left">
          {/* Wrap the text with an onClick handler */}
          <span className="navbar-logo" onClick={goToHome}>
            ReTounsi.
          </span>
        </div>
        <div className="navbar-right">
          <NavBar />
        </div>
      </nav>
    </div>
  );
}

export default NavBarUI;