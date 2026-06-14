import React, { useState, useEffect, useRef } from 'react';
import { api, type Product } from './services/api';
import { useToasts } from './hooks/useToasts';
import { useDebounce } from './hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, PlusCircle, Heart, MapPin, Clock, Camera, 
  Smartphone, Laptop, Home as HomeIcon, Bike, Car, 
  X, CheckCircle, AlertCircle, UploadCloud, Trash2
} from 'lucide-react';
import './index.css';

const CategoryIcons: Record<string, any> = {
  Cars: Car,
  Mobiles: Smartphone,
  Electronics: Laptop,
  Furniture: HomeIcon,
  Bikes: Bike,
  Property: HomeIcon
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { toasts, addToast } = useToasts();
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Modals
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sell Form State
  const [sellForm, setSellForm] = useState({
    title: '', description: '', category: 'Mobiles', price: '', location: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProducts(debouncedSearch);
  }, [debouncedSearch]);

  const fetchInitialData = async () => {
    try {
      const catRes = await api.getCategories();
      setCategories(catRes.data.length ? catRes.data : ['Cars', 'Mobiles', 'Electronics', 'Furniture', 'Bikes', 'Property']);
    } catch (error) {}
  };

  const fetchProducts = async (query: string) => {
    setLoading(true);
    try {
      if (query) {
        const res = await api.searchProducts(query);
        setProducts(res.data);
      } else {
        const res = await api.getProducts();
        setProducts(res.data);
      }
    } catch (error) {
      addToast('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(id)) newWishlist.delete(id);
    else newWishlist.add(id);
    setWishlist(newWishlist);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProduct(id);
      addToast('Deleted Successfully', 'success');
      setSelectedProduct(null);
      fetchProducts(searchQuery);
    } catch (error) {
      addToast('Failed to delete product', 'error');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      addToast('Please upload an image', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload image securely via Multer
      const uploadRes = await api.uploadImage(imageFile);
      
      // 2. Add product with returned URL
      await api.addProduct({
        ...sellForm,
        price: Number(sellForm.price),
        imageUrl: uploadRes.url
      });

      addToast('✓ Product Added successfully!', 'success');
      setShowSellModal(false);
      setSellForm({ title: '', description: '', category: 'Mobiles', price: '', location: '' });
      setImageFile(null);
      setImagePreview(null);
      fetchProducts(searchQuery);
    } catch (error: any) {
      addToast(error.message || 'Failed to add product', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => {setSearchQuery(''); fetchProducts('');}}>
          <span style={{ fontSize: '2rem', letterSpacing: '-1px' }}>OLX Clone</span>
        </div>
        
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Find Cars, Mobile Phones and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
            ENGLISH
          </div>
          <Heart size={24} style={{ cursor: 'pointer' }} />
          <button className="btn btn-outline" style={{ border: 'none', fontWeight: 700, textDecoration: 'underline' }}>Login</button>
          <button className="btn btn-primary" onClick={() => setShowSellModal(true)} style={{ borderRadius: '2rem', padding: '0.75rem 2rem' }}>
            <PlusCircle size={20} /> SELL
          </button>
        </div>
      </nav>

      {/* HERO */}
      {!searchQuery && (
        <section className="hero">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="hero-title floating">Buy & Sell Anything</h1>
            <p className="hero-subtitle">Find amazing deals near you. Start selling your unwanted items today.</p>
          </motion.div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <main className="container">
        
        {/* CATEGORIES */}
        {!searchQuery && (
          <div style={{ marginBottom: '4rem' }}>
            <h2 className="section-title">All Categories</h2>
            <div className="category-grid">
              {categories.map(cat => {
                const Icon = CategoryIcons[cat] || Camera;
                return (
                  <div key={cat} className="category-card" onClick={() => setSearchQuery(cat)}>
                    <Icon size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
                    <p style={{ fontWeight: 600 }}>{cat}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        <h2 className="section-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Fresh Recommendations'}
        </h2>

        {loading ? (
          <div className="product-grid">
            {[1,2,3,4].map(i => (
              <div key={i} className="product-card" style={{ height: '350px', backgroundColor: '#e2e8f0', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                <img src={product.imageUrl} alt={product.title} className="product-image" loading="lazy" />
                <button 
                  className="wishlist-btn"
                  onClick={(e) => toggleWishlist(e, product.id)}
                >
                  <Heart size={20} fill={wishlist.has(product.id) ? "var(--danger)" : "transparent"} color={wishlist.has(product.id) ? "var(--danger)" : "currentColor"} />
                </button>
                <div className="product-info">
                  <div className="product-price">$ {product.price.toLocaleString()}</div>
                  <div className="product-title">{product.title}</div>
                  <div className="product-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={12} /> {product.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-light)' }} />
            <h2>No Products Found</h2>
            <p>Try searching for something else or browse categories.</p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ padding: '3rem 4rem', background: '#0f172a', color: 'white', marginTop: 'auto' }}>
        <p>&copy; {new Date().getFullYear()} OLX Clone. Free Classifieds.</p>
      </footer>

      {/* PRODUCT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedProduct(null)}><X size={24} /></button>
              
              <div className="details-grid">
                <div>
                  <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="details-image" />
                  <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Description</h3>
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>{selectedProduct.description}</p>
                  </div>
                </div>
                
                <div>
                  <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>
                      $ {selectedProduct.price.toLocaleString()}
                    </h2>
                    <h1 style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '1rem' }}>{selectedProduct.title}</h1>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '2rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {selectedProduct.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {new Date(selectedProduct.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="seller-card">
                    <h3 style={{ marginBottom: '1rem' }}>Seller Description</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        U
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>OLX User</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Member since 2024</div>
                      </div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Chat with Seller</button>
                    <button 
                      className="btn btn-danger" 
                      style={{ width: '100%' }}
                      onClick={() => handleDelete(selectedProduct.id)}
                    >
                      <Trash2 size={18} /> Delete Listing
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SELL MODAL */}
      <AnimatePresence>
        {showSellModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSellModal(false)}
          >
            <motion.div 
              className="modal-content"
              style={{ maxWidth: '600px' }}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setShowSellModal(false)}><X size={24} /></button>
              <h2 className="section-title">POST YOUR AD</h2>
              
              <form onSubmit={handleSellSubmit}>
                <div className="form-group">
                  <label className="form-label">Ad Title</label>
                  <input type="text" className="form-input" required value={sellForm.title} onChange={e => setSellForm({...sellForm, title: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" value={sellForm.category} onChange={e => setSellForm({...sellForm, category: e.target.value})}>
                    {['Mobiles', 'Cars', 'Bikes', 'Electronics', 'Furniture', 'Property'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-input" rows={4} required value={sellForm.description} onChange={e => setSellForm({...sellForm, description: e.target.value})} />
                </div>

                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input type="number" className="form-input" required min="0" value={sellForm.price} onChange={e => setSellForm({...sellForm, price: e.target.value})} />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-input" required value={sellForm.location} onChange={e => setSellForm({...sellForm, location: e.target.value})} />
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Image</label>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
                  {imagePreview ? (
                    <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <img src={imagePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                      <button type="button" onClick={() => {setImageFile(null); setImagePreview(null);}} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'white', border: 'none', borderRadius: '50%', padding: '0.25rem', cursor: 'pointer' }}>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                      <UploadCloud size={48} style={{ color: 'var(--text-light)', margin: '0 auto 1rem' }} />
                      <p>Click to upload an image</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>PNG, JPG, WEBP up to 5MB</span>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Posting Ad...' : 'Post Now'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOASTS */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div 
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="toast"
            >
              {toast.type === 'success' ? <CheckCircle color="#22c55e" size={20} /> : <AlertCircle color="#ef4444" size={20} />}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
