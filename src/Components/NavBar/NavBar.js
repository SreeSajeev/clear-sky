import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import toggle_dark from "../../assets/dark.png";
import toggle_light from "../../assets/light.png";
import dark_logo from "../../assets/dark_logo.png";
import light_logo from "../../assets/light_logo.png";

function NavBar({ theme, setTheme }) {
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <>
      <div className={`navbar ${theme}`}>
        <img src={theme === "dark" ? dark_logo : light_logo} alt="logo" className="logo" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
        <img
          onClick={() => {
            toggle_mode();
          }}
          src={theme === "light" ? toggle_dark : toggle_light}
          alt="dark-mode-on"
          className="theme"
        />
      </div>
    </>
  );
}

export default NavBar;
