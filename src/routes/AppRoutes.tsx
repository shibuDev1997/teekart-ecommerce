import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ProtectedRoute } from "../components/common/ProtectedRoutes";

// Lazy-loaded pages for optimization and route-based splitting
const ProductCatalog = lazy(() =>
  import("../pages/products/ProductCatalog").then((module) => ({ default: module.ProductCatalog }))
);
const ProductDetails = lazy(() =>
  import("../pages/products/ProductDetails").then((module) => ({ default: module.ProductDetails }))
);
const Cart = lazy(() => import("../pages/cart/Cart").then((module) => ({ default: module.Cart })));
const Wishlist = lazy(() => import("../pages/wishlist/Wishlist").then((module) => ({ default: module.Wishlist })));
const Login = lazy(() => import("../pages/auth/Login").then((module) => ({ default: module.Login })));
const Register = lazy(() => import("../pages/auth/Register").then((module) => ({ default: module.Register })));
const ForgotPassword = lazy(() =>
  import("../pages/auth/ForgotPassword").then((module) => ({ default: module.ForgotPassword }))
);
const Checkout = lazy(() => import("../pages/checkout/Checkout").then((module) => ({ default: module.Checkout })));
const Profile = lazy(() => import("../pages/profile/Profile").then((module) => ({ default: module.Profile })));
const AdminDashboard = lazy(() =>
  import("../pages/admin/AdminDashboard").then((module) => ({ default: module.AdminDashboard }))
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullPage message="Loading section..." />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
