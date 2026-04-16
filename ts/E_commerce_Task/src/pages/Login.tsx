import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ NEW
import { getUsers } from "../services/UserServices";
import { User } from "../types/user";


function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    getUsers()
      .then((users: User[]) => {
        console.log("USERS 👉", users);
        if (!Array.isArray(users)) {
          throw new Error("Users is not an array");
        }
        const foundUser = users.find((u) => u.email === email);
        console.log("FOUND USER 👉", foundUser);

        if (!foundUser) {
          alert("Invalid Email");
          return;
        }
        if (!foundUser.password) {
          alert("User data is invalid (password missing)");
          return;
        }


        if (foundUser.password !== password) {
          alert("Incorrect Password");
          return;
        }

        // ✅ save using context
        login(foundUser);

        alert("Login Successful");

        // ✅ redirect after login
        navigate("/carts");
      })
      .catch((err: unknown) => {
        console.error("LOGIN ERROR 👉", err);
        alert("Something went wrong");
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot">Forgot Password?</span>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          <p className="signup-text">
            Don't have an account? <span>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;