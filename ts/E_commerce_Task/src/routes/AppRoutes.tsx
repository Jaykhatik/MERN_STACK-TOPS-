
import Product from "../pages/Product";
import Users from "../pages/Users";
import Carts from "../pages/Carts";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Product />} />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/carts"
                    element={
                        <ProtectedRoute>
                            <Carts />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;