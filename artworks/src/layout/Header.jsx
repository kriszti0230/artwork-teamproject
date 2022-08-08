import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="container">
        <p>thumbRules</p>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/login">Account</Link>
        </nav>
      </div>
    </header>
  );
}
