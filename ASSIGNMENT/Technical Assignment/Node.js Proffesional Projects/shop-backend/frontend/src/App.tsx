import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import CategorySection from './components/CategorySection/CategorySection';
import ProductGrid from './components/ProductGrid/ProductGrid';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Toast from './components/Toast/Toast';
import { useStore } from './store/useStore';
import './App.css';

const Home = () => {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductGrid />
    </>
  );
};

function App() {
  const { fetchProducts, fetchCart, fetchCartTotals } = useStore();

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchCartTotals();
  }, [fetchProducts, fetchCart, fetchCartTotals]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer glass">
          <div className="container">
            <p>&copy; 2026 E-Commerce App. All rights reserved.</p>
          </div>
        </footer>

        <CartDrawer />
        <Toast />
      </div>
    </Router>
  );
}

export default App;
