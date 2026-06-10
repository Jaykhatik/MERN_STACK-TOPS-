
import { X, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './CartDrawer.css';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, cartTotals, removeFromCart } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer glass" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBagIcon />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.product.name}</h4>
                  <p className="cart-item-price">₹{item.product.price.toLocaleString()}</p>
                  <p className="cart-item-qty">Qty: {item.quantity}</p>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotals.subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery (5%)</span>
              <span>₹{cartTotals.deliveryCharge.toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cartTotals.total.toLocaleString()}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

const ShoppingBagIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="empty-cart-icon">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export default CartDrawer;
