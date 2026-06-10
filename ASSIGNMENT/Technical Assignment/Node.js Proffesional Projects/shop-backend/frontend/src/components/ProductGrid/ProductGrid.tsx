import ProductCard from '../ProductCard/ProductCard';
import { useStore } from '../../store/useStore';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, searchQuery } = useStore();

  return (
    <div className="product-grid-section container">
      <h2 className="section-title">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
      </h2>

      {products.length === 0 ? (
        <div className="empty-state glass">
          <h3>No products found</h3>
          <p>Try adjusting your search query.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
