import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'
const DetailNotFound = ({foodData}) => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404 - Food Details Not Found for {foodData}</h1>
        <p className="not-found-text">The page you are looking for does not exist.</p>
        <Link to={-1} className="not-found-link">Go back </Link>
      </div>
    </div>
  );
}

export default DetailNotFound;
