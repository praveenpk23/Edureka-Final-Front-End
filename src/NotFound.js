import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'
const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-text">The page you are looking for does not exist.</p>
        <Link to="/" className="not-found-link">Go back to home page</Link>
      </div>
    </div>
  );
}

export default NotFound;
