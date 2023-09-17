import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg  bg-black">
        <div className="container-fluid">
          <Link to="/">
            <img
              className="header__icon"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="img"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{ color: "white" }}>
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li className="nav-item">
                <Link
                  to="/movies/popular"
                  className="nav-link"
                  style={{ color: "white", marginLeft: "10px" }}
                >
                  Popular
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/movies/top_rated"
                  className="nav-link"
                  style={{ color: "white", marginLeft: "10px" }}
                >
                  Top-Rated
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/movies/upcoming"
                  className="nav-link"
                  style={{ color: "white", marginLeft: "10px" }}
                >
                  Upcoming
                </Link>
              </li>
            </ul>
            <div>Login</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
