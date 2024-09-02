import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/categories" className="navbar-link">Categories</Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Main</Link>
        </li>
        <li className="navbar-item">
          <Link to="/selected-recipes" className="navbar-link">Selected Recipes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;