import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/apiService";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
  Star,
  Flame,
  Clock,
  Leaf,
} from "lucide-react";
import { Button, Tooltip, IconButton } from "@mui/material";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  // Fetch products with React Query
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["home-products"],
    queryFn: () => apiService.getProducts({ limit: 10 }),
  });

  const products = productsData?.data || [];
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const trendingProducts = products.filter((p) => p.trending).slice(0, 4);
  const newArrivals = products.slice(0, 4);

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0] || "M", product.colors[0] || "Black", 1);
  };

  const renderProductCard = (product: any) => {
    const isFav = isInWishlist(product.id);
    return (
      <div
        key={product.id}
        onClick={() => navigate(`/products/${product.id}`)}
        className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700/50 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
        {/* Wishlist Button */}
        <div className="absolute right-4 top-4 z-10">
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40 text-gray-500 dark:text-gray-400 p-2 shadow-sm"
          >
            <Heart className={`h-5 w-5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
          </IconButton>
        </div>

        {/* Product Image */}
        <div className="relative aspect-[4/5] bg-gray-50 dark:bg-slate-900 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.originalPrice && (
            <div className="absolute left-4 top-4 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white font-semibold tracking-wider uppercase text-sm">
              Out of stock
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-grow">
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            {product.category}
          </span>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-sage-dark dark:group-hover:text-emerald-400 line-clamp-1 transition-colors text-base mb-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {product.ratings || 4.5}
            </span>
            <span className="text-xs text-gray-400">
              ({product.reviewsCount || 20})
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-gray-50 dark:border-slate-700/50">
            <div>
              <span className="font-extrabold text-lg text-gray-900 dark:text-white">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-1.5">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.inStock && (
              <Tooltip title="Quick Add to Cart">
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="bg-sage-dark hover:bg-emerald-700 text-white rounded-full p-2.5 shadow-md shadow-sage-dark/15 hover:shadow-lg transition-all duration-200"
                >
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 pb-16 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* 1. Hero Banner */}
      <section className="relative min-h-[85vh] gradient-sage text-white flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-cream/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-lg">
                <Leaf className="h-4 w-4 text-sage-cream" />
                <span className="text-xs font-semibold tracking-wider text-sage-cream">
                  100% Organic Eco-Friendly Cotton
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                Premium T-Shirts
                <br />
                <span className="bg-gradient-to-r from-sage-cream to-amber-200 text-gradient">
                  for Boys & Girls
                </span>
              </h1>

              <p className="text-lg text-sage-cream/80 max-w-xl leading-relaxed">
                Discover standard comfort combined with premium modern style. Tailored fits, clean seams, and breathable organic fabrics made to last.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  endIcon={<ArrowRight className="h-5 w-5" />}
                  className="bg-white text-sage-dark hover:bg-sage-cream hover:text-sage-dark font-bold px-8 py-3 rounded-full normal-case text-base shadow-xl shadow-black/10"
                >
                  Shop Catalog
                </Button>
                <Button
                  component={Link}
                  to="/products?category=boys"
                  variant="outlined"
                  className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white font-bold px-6 py-3 rounded-full normal-case text-base"
                >
                  View Boys
                </Button>
              </div>
            </div>

            {/* Right Images (Modern overlapping card style) */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-72 sm:w-80 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600"
                  alt="Boy Tee Style"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute w-56 sm:w-64 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 transform -translate-x-16 translate-y-16 -rotate-6 hover:rotate-0 transition-transform duration-500 z-0 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600"
                  alt="Girl Tee Style"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Shop Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="flex items-center justify-center gap-1.5 text-sage-dark dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <Sparkles className="h-4 w-4" /> Categorized Collections
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Shop by Category</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Check out our tailored selections crafted specifically for boys and girls.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Boys Card */}
          <Link
            to="/products?category=boys"
            className="group relative h-96 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800"
              alt="Boys"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-8 left-8 z-20 space-y-2">
              <h3 className="text-3xl font-bold text-white">Boys Collection</h3>
              <p className="text-gray-200 text-sm max-w-xs">Streetwear graphics, athletic fits, and everyday cotton shirts.</p>
              <div className="inline-flex items-center gap-1 text-sage-cream font-bold text-sm group-hover:underline">
                Explore Now <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Girls Card */}
          <Link
            to="/products?category=girls"
            className="group relative h-96 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800"
              alt="Girls"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-8 left-8 z-20 space-y-2">
              <h3 className="text-3xl font-bold text-white">Girls Collection</h3>
              <p className="text-gray-200 text-sm max-w-xs">Floral crops, oversized boyfriend tees, and cozy knit pieces.</p>
              <div className="inline-flex items-center gap-1 text-sage-cream font-bold text-sm group-hover:underline">
                Explore Now <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sage-dark dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">
              <Star className="h-4 w-4 fill-current" /> Handpicked Designs
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Featured Products</h2>
          </div>
          <Link
            to="/products?featured=true"
            className="text-sm font-bold text-sage-dark dark:text-emerald-400 flex items-center gap-1 hover:underline"
          >
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(renderProductCard)}
          </div>
        )}
      </section>

      {/* 4. Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-red-500 font-bold text-xs uppercase tracking-widest">
              <Flame className="h-4 w-4 fill-current" /> Selling Fast
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Trending Now</h2>
          </div>
          <Link
            to="/products?trending=true"
            className="text-sm font-bold text-red-500 flex items-center gap-1 hover:underline"
          >
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(renderProductCard)}
          </div>
        )}
      </section>

      {/* 5. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs uppercase tracking-widest">
              <Clock className="h-4 w-4" /> Just Dropped
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">New Arrivals</h2>
          </div>
          <Link
            to="/products?sort=newest"
            className="text-sm font-bold text-blue-500 flex items-center gap-1 hover:underline"
          >
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(renderProductCard)}
          </div>
        )}
      </section>

    </div>
  );
};
