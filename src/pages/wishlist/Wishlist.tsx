import React from "react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/useCartStore";
import { Heart, Trash2, ShoppingBag, Star } from "lucide-react";
import { Button, IconButton } from "@mui/material";

export const Wishlist: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (product: any) => {
    addItem(product, product.sizes[0] || "M", product.colors[0] || "Black", 1);
    removeItem(product.id);
    alert(`Moved ${product.name} to your cart!`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6 dark:bg-slate-900 dark:text-white transition-colors duration-300">
        <div className="w-20 h-20 bg-gray-150 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-gray-400">
          <Heart className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Your wishlist is empty</h2>
        <p className="text-gray-500 max-w-sm mx-auto text-sm">
          Save your favorite products to buy them later. Start exploring the store to add items here.
        </p>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          className="bg-sage-dark hover:bg-emerald-700 font-bold rounded-full normal-case text-white px-8 py-3"
        >
          Explore Catalog
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 dark:text-white transition-colors duration-300">
      
      <div className="flex items-center justify-between border-b dark:border-slate-850 pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Wishlist</h1>
          <p className="text-gray-500 text-sm mt-1">You have {items.length} items saved.</p>
        </div>
        <button
          onClick={clearWishlist}
          className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
          >
            
            {/* Remove Action */}
            <div className="absolute right-3 top-3 z-10">
              <IconButton
                onClick={() => removeItem(product.id)}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-gray-500 hover:text-red-500 p-2 shadow-sm"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </IconButton>
            </div>

            {/* Thumbnail */}
            <Link to={`/products/${product.id}`} className="aspect-[4/5] bg-gray-50 dark:bg-slate-950 overflow-hidden block">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-350"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white font-bold uppercase text-xs">
                  Sold Out
                </div>
              )}
            </Link>

            {/* Content info */}
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
                {product.category}
              </span>
              <Link
                to={`/products/${product.id}`}
                className="font-bold text-gray-800 dark:text-gray-100 hover:text-sage-dark line-clamp-1 text-sm mb-1"
              >
                {product.name}
              </Link>

              <div className="flex items-center gap-1 mb-4">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {product.ratings || 4.5}
                </span>
              </div>

              <div className="mt-auto space-y-3 pt-2 border-t border-gray-50 dark:border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-base text-gray-900 dark:text-white">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {product.inStock ? (
                  <Button
                    onClick={() => handleAddToCart(product)}
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingBag className="h-4 w-4" />}
                    className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case py-2"
                  >
                    Move to Cart
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled
                    fullWidth
                    className="bg-gray-100 text-gray-400 font-bold rounded-2xl py-2"
                  >
                    Out of Stock
                  </Button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
