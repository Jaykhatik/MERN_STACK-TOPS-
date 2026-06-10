
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero container animate-fade">
      <div className="hero-content">
        <h1 className="hero-title">
          Biggest Tech Sale <span className="highlight">2026</span>
        </h1>
        <p className="hero-subtitle">Up To 70% OFF on premium gadgets.</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
      
      <div className="hero-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
};

export default Hero;
