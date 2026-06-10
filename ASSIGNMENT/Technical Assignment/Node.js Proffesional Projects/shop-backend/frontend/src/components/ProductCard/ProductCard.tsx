import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { useStore, type Product } from '../../store/useStore';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, showToast } = useStore();

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    showToast('✓ Added To Cart');
  };

  return (
    <div className="product-card glass">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star size={14} className="star-icon" fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingBag size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
