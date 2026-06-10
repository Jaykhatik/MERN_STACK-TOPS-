import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, setIsCartOpen, searchQuery, setSearchQuery, searchProducts, fetchProducts } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() !== '') {
      searchProducts(value);
    } else {
      fetchProducts();
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Menu className="mobile-menu-icon" />
          <span className="logo-text">TechStore.</span>
        </div>

        <div className="navbar-search">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="navbar-actions">
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="cart-badge animate-bounce">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
