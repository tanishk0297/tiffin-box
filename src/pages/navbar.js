import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const Navbar = ({ setShowScreen }) => {
  const navbarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isUserLoggedIn = localStorage.getItem('UserObject');
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const navbar = navbarRef.current;
    if (navbar) {
      navbar.classList.remove('active');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // Clear user data and token from local storage
    localStorage.removeItem('UserObject');
    localStorage.removeItem('Token');
  };

  return (
    <header>
      <div
        id="menu-bar"
        className={`fas fa-bars ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      ></div>
      <div className="logo-container">
        <a href="/" className="logo">
          <span>Tiffin</span> Box
        </a>
      </div>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`} ref={navbarRef}>
        <a href="/" onClick={closeMenu}>
          Home
        </a>
        <a href="#book" onClick={closeMenu}>
          Book
        </a>
        <a href="#packages" onClick={closeMenu}>
          Packages
        </a>
        <a href="#services" onClick={closeMenu}>
          Services
        </a>
        <a href="/review" className="tanishk-link" onClick={closeMenu}>
          Review
        </a>
        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
        {isUserLoggedIn && (
          <div className="logout-dropdown">
            <button
              className={`logout-button ${showLogoutButton ? 'show' : ''}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <div>
        {!isUserLoggedIn && (
          <i
            className="fas fa-user"
            id="login-btn"
            onClick={() => {
              setShowScreen('Login');
            }}
          ></i>
        )}
        {isUserLoggedIn && (
          <div
            className="welcome-message"
            onMouseEnter={() => setShowLogoutButton(true)}
            onMouseLeave={() => setShowLogoutButton(false)}
          >
            <span>
              Welcome{' '}
              <span className="username">
                {JSON.parse(localStorage.getItem('UserObject')).email.substring(
                  0,
                  JSON.parse(localStorage.getItem('UserObject')).email.lastIndexOf('@')
                )}
              </span>
            </span>
            <i
              className={`fas fa-caret-down ${showLogoutButton ? 'show' : ''}`}
              onClick={() => setShowLogoutButton(!showLogoutButton)}
            ></i>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
