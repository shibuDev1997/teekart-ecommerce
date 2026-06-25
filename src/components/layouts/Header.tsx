import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import {
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Search,
  Menu as MenuIcon,
  X,
  LogOut,
  LayoutDashboard,
  UserCheck,
} from "lucide-react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { mode, toggleTheme } = useThemeStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-xl gradient-sage flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sage-dark/20 animate-pulse-slow">
                T
              </span>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-sage-dark to-emerald-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                TeeKart
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-grow max-w-md relative"
          >
            <input
              type="text"
              placeholder="Search premium t-shirts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sage-medium focus:border-transparent transition-all duration-200"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-gray-600 dark:text-gray-300">
            <Link to="/products" className="hover:text-sage-dark dark:hover:text-emerald-400 transition-colors">
              All Shirts
            </Link>
            <Link to="/products?category=boys" className="hover:text-sage-dark dark:hover:text-emerald-400 transition-colors">
              Boys
            </Link>
            <Link to="/products?category=girls" className="hover:text-sage-dark dark:hover:text-emerald-400 transition-colors">
              Girls
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme} color="inherit" className="text-gray-600 dark:text-gray-300">
              {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </IconButton>

            {/* Wishlist Icon */}
            <IconButton
              component={Link}
              to="/wishlist"
              className="text-gray-600 dark:text-gray-300"
            >
              <Badge badgeContent={wishlistItems.length} color="error">
                <Heart className="h-5 w-5" />
              </Badge>
            </IconButton>

            {/* Cart Icon */}
            <IconButton
              component={Link}
              to="/cart"
              className="text-gray-600 dark:text-gray-300"
            >
              <Badge badgeContent={totalCartItems} color="success">
                <ShoppingBag className="h-5 w-5" />
              </Badge>
            </IconButton>

            {/* Profile Dropdown / Login */}
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleMenuOpen} size="small" className="ml-1">
                  <Avatar
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-8 w-8 border border-sage-medium"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  PaperProps={{
                    elevation: 3,
                    className: "dark:bg-slate-800 dark:text-white mt-1 border dark:border-slate-700",
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                    <p className="font-semibold text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>
                  
                  {user?.role === "admin" && (
                    <MenuItem onClick={() => navigate("/admin")}>
                      <ListItemIcon>
                        <LayoutDashboard className="h-4 w-4 text-sage-dark dark:text-emerald-400" />
                      </ListItemIcon>
                      <ListItemText primary="Admin Dashboard" />
                    </MenuItem>
                  )}

                  <MenuItem onClick={() => navigate("/profile")}>
                    <ListItemIcon>
                      <UserCheck className="h-4 w-4 text-sage-dark dark:text-emerald-400" />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </MenuItem>

                  <MenuItem onClick={handleLogout} className="text-red-500">
                    <ListItemIcon>
                      <LogOut className="h-4 w-4 text-red-500" />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-white bg-sage-dark hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-medium shadow-md shadow-sage-dark/10 transition-all duration-200"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </IconButton>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 px-4 pt-2 pb-4 space-y-3">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sage-medium"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          <div className="flex flex-col gap-2 font-medium text-gray-700 dark:text-gray-200 pt-2">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              All Products
            </Link>
            <Link
              to="/products?category=boys"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              Boys Collection
            </Link>
            <Link
              to="/products?category=girls"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              Girls Collection
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sage-dark dark:text-emerald-400 hover:bg-gray-50 dark:hover:bg-slate-800 font-semibold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
