import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <h1 className="portfolio-name">PUSHKAL VASHIST</h1>

      <div className="animation-container" aria-hidden="true">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
};

export default Loader;
