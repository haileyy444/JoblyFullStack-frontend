import React, { useState } from "react";
import "./NavBar.css";
import { Dropdown } from "reactstrap";



function NavBar({currentUser, logout}) {
  const [menuOpen, setMenuOpen] = useState(false); //  Define menu state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); //  Function to toggle menu
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  }
  const handleMouseLeave = () => {
    setDropdownOpen(false);
  }

  return (
    <nav className="NavBar">
      {/* Brand Name */}
      <a href="/" className="Jobly">
        Jobly
      </a>

      {/* Hamburger Menu Button */}
      <div className="hamburger" onClick={toggleMenu}> ☰ </div>
      {/* Desktop Navigation */}
      <div className="Components">
          {!currentUser ? (
            <>
              
                <a href="https://joblyfullstack-frontend.onrender.com/login" className="nav-item">Login</a>
                <a href="/signup" className="nav-item" >Signup</a>
            </>
        
          ) : (
            <>

            {/* Desktop Navigation */}

            <a href="/companies" className="nav-item">Companies</a>
            <a href="/jobs" className="nav-item">Jobs</a>

            <div className="nav-item dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <span className="username">{currentUser.username}</span>
           
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <a href="/profile" className="dropdown-item">Profile</a>
                  <a href="/" onClick={(e) => {e.preventDefault(); logout();}} className="dropdown-item">Logout</a>
                </div>
             
                )}
                </div>
            </>
          ) }
      </div>


      {/* Mobile Navigation */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        {!currentUser ? (
          <>
            <a href="/login" className="nav-item" onClick={toggleMenu}>Login</a>
            <a href="/signup" className="nav-item" onClick={toggleMenu}>Signup</a>
          </>
        ): (
          <>
             <a href="/companies" className="nav-item" onClick={toggleMenu}>Companies</a>
            <a href="/jobs" className="nav-item" onClick={toggleMenu}>Jobs</a>
            <a href="/profile" className="nav-item" onClick={toggleMenu}>Profile</a>
            <a href="/" className="nav-item" onClick={(e) => {e.preventDefault(); logout();}}>Logout</a>
        
          </>
        )}
      </div>
    </nav>
  
  );
}



export default NavBar;


