// import React from "react";
import { CartItem } from "../../types/cart";
import { ProductType } from "../../types/product";
import ProductCard from "./ProductCard";


interface Props {
  cart: CartItem;
  userMap: Record<number, string>;
  productMap: Record<number, ProductType>;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, change: number) => void;
}

function CartCard({
  cart,
  userMap,
  productMap,
  removeFromCart,
  updateQuantity,
}: Props) {
  const product = productMap[cart.productId];

  if (!product) return null;

  return (
    <div className="cart-card">
      <div className="cart-header">
        <h2>👤 {userMap[cart.userId] || "Guest User"}</h2>

        <button onClick={() => removeFromCart(cart.productId)}>
          Remove
        </button>
      </div>

      <div className="products-grid">
        <ProductCard
          key={cart.productId}
          product={product}
          quantity={cart.quantity}
          increase={() => updateQuantity(cart.productId, 1)}
          decrease={() => updateQuantity(cart.productId, -1)}
        />
      </div>
    </div>
  );
}

export default CartCard;