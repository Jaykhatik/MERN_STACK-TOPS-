import { CategoryBadge } from '../components/Badges'
import { useFetch } from '../hooks/useFetch'

export default function ProductsPage() {
  const { data: products, loading, error } = useFetch('/products')

  if (loading) return <div className="loading">Loading products...</div>
  if (error)   return <div className="error-msg">Error: {error}</div>

  const totalValue = products.reduce((a, p) => a + p.price * p.stock, 0)
  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <div className="page">
      <div className="page-header">
        <h1>Product Inventory</h1>
        <p>Browse and manage all available products in stock.</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-value">{products.length}</span>
          <span className="stat-label">Total Products</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{categories.length}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">₹{(totalValue / 100000).toFixed(1)}L</span>
          <span className="stat-label">Inventory Value</span>
        </div>
      </div>

      <div className="cards-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="card-meta">
              <CategoryBadge category={product.category} />
              <span className="rating">★ {product.rating}</span>
            </div>
            <div className="card-title">{product.name}</div>
            <div className="product-brand">{product.brand}</div>
            <div className="card-body">{product.description}</div>
            <div className="card-footer">
              <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className={product.stock <= 10 ? 'stock-low' : 'stock-ok'}>
                {product.stock <= 10
                  ? `⚠ Only ${product.stock} left`
                  : `✓ ${product.stock} in stock`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
