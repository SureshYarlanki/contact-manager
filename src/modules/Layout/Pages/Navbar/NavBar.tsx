import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  color: string;
  heading?: string;
}

export const NavBar: React.FC<IProps> = (props) => {
  return (
    <>
      <nav className={`navbar navbar-dark ${props.color} navbar-expand-sm`}>
        <div className="container">
          {/* Navbar Brand */}
          <Link to="/" className="navbar-brand">
            {props.heading}
            <i className="bi bi-phone">
              Contacts<span className="text-warning"> Manager </span>
            </i>
          </Link>

          {/* Navbar Toggler for Mobile View */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/contacts/admin" className="nav-link">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
