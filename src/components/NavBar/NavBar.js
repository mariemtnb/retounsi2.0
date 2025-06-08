import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">{/* You can place logo/text here */}</div>
      <div className="navbar-right">
        <ul className="nav-buttons-group">
          <li><button onClick={() => handleNavigation("/")}>Home</button></li>
          <li><button onClick={() => handleNavigation("/category")}>Shop</button></li>
          <li><button onClick={() => handleNavigation("/about-us")}>About Us</button></li>
          <li><button onClick={() => handleNavigation("/cart")}>Cart</button></li>
        </ul>
        <button className="signin-button" onClick={() => handleNavigation("/login")}>
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default NavBar;