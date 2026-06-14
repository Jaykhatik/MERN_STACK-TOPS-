import React from 'react';
import { Search, User, Ticket } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar glass">
      <div className="nav-brand">
        <Ticket color="var(--primary)" /> BookMyShow Clone
      </div>
      
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for Movies, Events, Plays..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="nav-links">
        <a className="nav-link">Movies</a>
        <a className="nav-link">Offers</a>
        <a className="nav-link">Events</a>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={18} /> Sign In
        </button>
      </div>
    </nav>
  );
};
