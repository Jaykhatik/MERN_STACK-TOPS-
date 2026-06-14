import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar glass">
      <div className="nav-brand">
        <span role="img" aria-label="logo">✨</span> PosterMaker
      </div>
      <div className="nav-links">
        <a className="nav-link active">Templates</a>
        <a className="nav-link">Projects</a>
        <a className="nav-link">Upload</a>
        <button className="btn btn-outline">Profile</button>
      </div>
    </nav>
  );
};
