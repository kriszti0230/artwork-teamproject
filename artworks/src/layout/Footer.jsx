import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="created-by">
          <p>Created by thumbRules</p>
          <ul>
            <li>Ghyczy András</li>
            <li>Kovács Patrik</li>
            <li>Németh-Szegedi Judit</li>
            <li>Szilágyi András</li>
            <li>Turzó Kriszti</li>
          </ul>
        </div>
        <div className="social-media-box">
          <p>Follow Us</p>
          <div className="social-media-icons">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
