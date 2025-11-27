import React from "react";
import Logo from "../../assets/Logo-removebg-preview.png";
import "./styles/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Header() {
  return (
    <div className="bg-all">
      <div className="header-wrapper">
        <nav className="navbar navbar-expand-lg custom-navbar">
          {/* LOGO */}
          <div className="navbar-left">
            <img src={Logo} alt="logo" className="logoNav" />
          </div>

          {/* DROPDOWN (sempre fora do collapse) */}
          <div className="dropdown dropdown-user">
            <a
              className="nav-link dropdown-toggle user-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </a>

            <ul className="dropdown-menu custom-dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Perfil
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Player
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Configurações
                </a>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  Sair
                </a>
              </li>
            </ul>
          </div>

          {/* BOTÃO HAMBURGUER */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarArea"
            aria-controls="navbarArea"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* ITENS DO MENU (colapsáveis) */}
          <div className="collapse navbar-collapse" id="navbarArea">
            <ul className="navbar-nav ms-3">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Explorar
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Biblioteca
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
