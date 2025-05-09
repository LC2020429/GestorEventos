import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/index.css";
import "../assets/navbar.css";

const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
};

const Navbar = () => {
  return (
    <header className="navbar">
      <nav className="container">
        <h1 className="logo">Gestor de Eventos</h1>
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Calendario
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
