import React from "react";
import './Navbar.css';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="SmartStay Logo" className="navbar-logo" />
        <h1 className="navbar-title">SmartStay</h1>
      </div>
      <div className="navbar-links">
        <button className="navbar-login">Connexion</button>
      </div>
    </div>
  );
};

export default Navbar;
