import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';  // Import the CSS file

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>NoteApp</h1>
      <div className="nav-links">
        <Link to="/dashboard" className="hover:text-gray-300">Home</Link>
        <Link to="/dashboard/profile" className="hover:text-gray-300">Profile</Link>
        <Link to="/dashboard/notes" className="hover:text-gray-300">Notes</Link>
        <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

