import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import * as api from "../services/api";
import { type Product } from "../store/useStore";
import ProductCard from "../components/ProductCard/ProductCard";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  // Local state — completely independent from the global products store
  // so navigating back to home won't clobber this data
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryName) return;

    setLoading(true);
    setProducts([]); // reset on category change

    api
      .getProductsByCategory(categoryName)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [categoryName]);

  return (
    <div className="category-page container">
      <div className="category-page-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1 className="category-page-title">
          {categoryName} <span className="title-accent">Products</span>
        </h1>
        {!loading && (
          <p className="category-page-sub">
            {products.length} item{products.length !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      {loading ? (
        <div className="category-skeleton-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-img" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state glass">
          <h3>No products in "{categoryName}"</h3>
          <p>We don't carry any {categoryName} products right now. Check back soon!</p>
          <button
            className="back-btn"
            onClick={() => navigate("/")}
            style={{ marginTop: "1rem" }}
          >
            ← Browse All Products
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
