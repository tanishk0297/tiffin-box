import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const Navbar = ({ setShowScreen }) => {
  const navbarRef = useRef(null);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isUserLoggedIn = localStorage.getItem('UserObject');
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutsideMenu);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClickOutsideMenu);
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

  const handleClickOutsideMenu = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !document.getElementById('menu-bar').contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };
  

  const handleLogout = () => {
    // Perform logout logic here
    // Clear user data and token from local storage
    localStorage.removeItem('UserObject');
    localStorage.removeItem('Token');
    window.location.reload(); // Refresh the page after logout
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
          <span >भोजन</span> Box {/* Increase the size and weight of the logo */}
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
      </nav>
      <div ref={menuRef}>
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
              
              <span className="username">
                {JSON.parse(localStorage.getItem('UserObject')).email.substring(
                  0,
                  JSON.parse(localStorage.getItem('UserObject')).email.lastIndexOf('@')
                )}
              </span>
            </span>
            {showLogoutButton && (
              <div className="logout-dropdown">
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
