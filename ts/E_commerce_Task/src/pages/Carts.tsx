import { useEffect, useState } from "react";
import "../styles/pages.css";
import { getProducts } from "../services/cartService";
import CartCard from "../components/Carts/CartCard";
import { getUsers } from "../services/UserServices";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, removeFromCart, updateQuantity } from "../redux/features/cartSlice";
import { RootState, AppDispatch } from "../redux/app/store";
import { ProductType } from "../types/product";
import { User } from "../types/user";
// import { Cart } from "../types/cart";

// ✅ Types
// interface UserType {
//   id: number;
//   username: string;
//   [key: string]: any;
// }



function Carts() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user: loggedUser } = useAuth();

  //redux
  const carts = useSelector((state: RootState) => state.carts.carts) as CartItem[];
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, productsData] = await Promise.all([
        getUsers(),
        getProducts(),
      ]);

      setUsers(usersData);
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ If not logged in
  if (!loggedUser) {
    return <Navigate to="/login" />;
  }
  // console.log(loggedUser)
  // ✅ User Map
  const userMap: Record<number, string> = {};
  users.forEach((u) => {
    userMap[u.id] = u.username;
  });

  // ✅ Product Map
  const productMap: Record<number, ProductType> = {};
  products.forEach((p) => {
    productMap[p.id] = p;
  });

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // ✅ Filter carts for logged-in user only
  const userCarts = carts.filter(
    (cart) => cart.userId === loggedUser.id
  );
  // console.log(userCarts)


  // Remove item
  const handleRemove = (productId: number) => {
    dispatch(removeFromCart({ productId, userId: loggedUser.id }));
  };

  // handle quantity
  const handleQuantity = (productId: number, delta: number) => {
    dispatch(
      updateQuantity({
        productId,
        userId: loggedUser.id,
        delta,
      })
    );
  };
  return (
    <div className="cart-container">
      <h1 className="title">🛒 Cart Page</h1>
      {userCarts.length === 0 && <h2>No carts available</h2>}

      {userCarts.map((cart) => (
        <CartCard
          key={cart.productId}
          cart={cart}
          userMap={userMap}
          productMap={productMap}
          removeFromCart={handleRemove}
          updateQuantity={handleQuantity}
        />
      ))}
    </div>
  );
}

export default Carts;