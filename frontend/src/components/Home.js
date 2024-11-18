import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="welcome-section">
        <h1>Welcome to NoteApp</h1>
        <p>Your personal, secure place to create and manage your notes.</p>
        <div className="button-group">
          <Link to="/login" className="btn primary-btn">Login</Link>
          <Link to="/register" className="btn secondary-btn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
