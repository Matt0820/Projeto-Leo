import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCompass, FaMusic, FaHeart } from "react-icons/fa";
import "./sidebar.css";

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-wrapper">
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" className="nav-item">
            <FaHome className="icon" />
            {isOpen && <span>Home</span>}
          </Link>

          <Link to="/explore" className="nav-item">
            <FaCompass className="icon" />
            {isOpen && <span>Explorar</span>}
          </Link>

          <Link to="/player" className="nav-item">
            <FaMusic className="icon" />
            {isOpen && <span>Player</span>}
          </Link>

          <Link to="/favorites" className="nav-item">
            <FaHeart className="icon" />
            {isOpen && <span>Favoritos</span>}
          </Link>
        </nav>

        <div className="sidebar-footer">
          {isOpen && (
            <div className="playlist-section">
              <h3>Minhas Playlists</h3>
              <ul>
                <li><a href="#">Pop Hits</a></li>
                <li><a href="#">Rock Clássico</a></li>
                <li><a href="#">Indie Vibes</a></li>
              </ul>
            </div>
          )}
        </div>
      </aside>

      <main className="sidebar-content">
        {children}
      </main>
    </div>
  );
}
