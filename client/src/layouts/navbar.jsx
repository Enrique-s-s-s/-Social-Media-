import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function NavigationBar() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    alert('You have been signed out.');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ET.NETWORK
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/explore" className="nav-link">
                <i className="fas fa-compass"></i> Explore
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="accountDropdown"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-user-circle"></i> Account
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      <i className="fas fa-user"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="dropdown-item">
                      <i className="fas fa-cog"></i> Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleSignOut}
                    >
                      <i className="fas fa-sign-out-alt"></i> Sign Out
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="accountDropdown"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-user"></i> Account
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/login" className="dropdown-item">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="dropdown-item">
                      <i className="fas fa-user-plus"></i> Register
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
