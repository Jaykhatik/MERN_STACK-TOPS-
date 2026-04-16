import React from "react";
import "../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const  Header:React.FC=()=>{
  const navigate = useNavigate();

  // Get the logged-in user from localStorage
  // const user = JSON.parse(localStorage.getItem("user"));
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();              // ✅ updates React state
    navigate("/login");    // ✅ redirect
  };

  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>

      <ul className="nav-links">
        <li>
          <NavLink to="/">Products</NavLink>
        </li>

        {/* Only show if user is logged in */}
        {user && (
          <>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/carts">Carts</NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        )}

        {/* Only show login if user is NOT logged in */}
        {!user && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;