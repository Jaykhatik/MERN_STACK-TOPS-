import { Smartphone, Laptop, Headphones, Watch, Gamepad } from 'lucide-react';
import './CategorySection.css';

const categories = [
  { name: 'Phones', icon: Smartphone },
  { name: 'Laptops', icon: Laptop },
  { name: 'Headphones', icon: Headphones },
  { name: 'Accessories', icon: Watch },
  { name: 'Gaming', icon: Gamepad },
];

const CategorySection = () => {
  return (
    <div className="category-section container animate-slide">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-card glass">
            <div className="category-icon-wrapper">
              <cat.icon size={28} className="category-icon" />
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
