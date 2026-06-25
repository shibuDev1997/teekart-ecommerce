import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../services/apiService";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import {
  Heart,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { Button, IconButton, Rating, Avatar } from "@mui/material";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch current product details
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => apiService.getProductById(id || ""),
    enabled: !!id,
  });

  // Fetch similar products in the same category
  const { data: relatedProductsData } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: () =>
      apiService.getProducts({
        limit: 4,
        filters: { category: product?.category },
      }),
    enabled: !!product?.category,
  });

  // Setup defaults when product loads
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0] || "");
      setActiveImageIdx(0);
      setQuantity(1);
    }
  }, [product]);

  if (isLoading) return <LoadingSpinner fullPage message="Fetching product details..." />;

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Product Not Found</h2>
        <p className="text-gray-500">The product you are trying to view does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-block bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-full px-6 py-2"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isFav = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    alert(`Added ${quantity}x ${product.name} (${selectedSize} / ${selectedColor}) to your cart!`);
  };

  const relatedProducts = relatedProductsData?.data.filter((p) => p.id !== product.id) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-sage-dark dark:hover:text-emerald-400">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-sage-dark dark:hover:text-emerald-400">Products</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-semibold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </nav>

      {/* Product Details Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
        
        {/* Left: Gallery Column */}
        <div className="space-y-4">
          
          {/* Main Stage */}
          <div className="relative aspect-[4/5] bg-gray-50 dark:bg-slate-950 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm">
            <img
              src={product.images[activeImageIdx] || "https://placehold.co/600x800"}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {discountPercent > 0 && (
              <div className="absolute left-6 top-6 bg-red-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow">
                -{discountPercent}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 aspect-[4/5] rounded-xl overflow-hidden border-2 bg-gray-50 dark:bg-slate-950 flex-shrink-0 transition-all duration-150 ${
                    activeImageIdx === idx ? "border-sage-dark scale-95 shadow" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400">
              {product.category} Collection
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <Rating value={product.ratings || 4.5} precision={0.1} readOnly size="small" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {product.ratings || 4.5}
              </span>
              <span className="text-xs text-gray-400">
                ({product.reviewsCount || 10} customer reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <hr className="border-gray-100 dark:border-slate-800" />

          <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>

          <hr className="border-gray-100 dark:border-slate-800" />

          {/* Color Selector */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Color: <span className="text-gray-500 font-semibold">{selectedColor}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
                      isSelected
                        ? "bg-slate-50 dark:bg-slate-800 border-sage-dark text-sage-dark dark:text-emerald-400 font-bold shadow-sm"
                        : "border-gray-200 dark:border-slate-700 hover:border-gray-300 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0"
                      style={{
                        backgroundColor:
                          color.toLowerCase().includes("white")
                            ? "#FFFFFF"
                            : color.toLowerCase().includes("black")
                            ? "#000000"
                            : color.toLowerCase().includes("blue")
                            ? "#1D4ED8"
                            : color.toLowerCase().includes("lavender")
                            ? "#D8B4FE"
                            : color.toLowerCase().includes("sage")
                            ? "#84AE92"
                            : color.toLowerCase().includes("gray")
                            ? "#9CA3AF"
                            : color.toLowerCase().includes("burgundy")
                            ? "#7F1D1D"
                            : color.toLowerCase().includes("pink")
                            ? "#F472B6"
                            : "#374151",
                      }}
                    ></span>
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Size: <span className="text-gray-500 font-semibold">{selectedSize}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-2xl text-xs font-bold border transition-all duration-150 ${
                      isSelected
                        ? "bg-sage-dark text-white border-sage-dark shadow-md"
                        : "border-gray-200 dark:border-slate-700 hover:border-gray-300 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-150 dark:border-slate-800">
            
            {/* Quantity select */}
            <div className="flex items-center border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-850 rounded-2xl p-1">
              <IconButton
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                size="small"
                className="text-gray-500 dark:text-gray-400"
              >
                <Minus className="h-4 w-4" />
              </IconButton>
              <span className="px-4 font-bold text-sm text-gray-900 dark:text-white w-8 text-center">{quantity}</span>
              <IconButton
                onClick={() => setQuantity((q) => q + 1)}
                size="small"
                className="text-gray-500 dark:text-gray-400"
              >
                <Plus className="h-4 w-4" />
              </IconButton>
            </div>

            {/* Add to Cart button */}
            {product.inStock ? (
              <Button
                onClick={handleAddToCart}
                variant="contained"
                startIcon={<ShoppingBag className="h-5 w-5" />}
                className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case py-3 flex-grow shadow-lg shadow-sage-dark/20 text-base"
              >
                Add to Shopping Cart
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                className="bg-gray-200 dark:bg-slate-800 text-gray-400 font-bold rounded-2xl normal-case py-3 flex-grow text-base"
              >
                Sold Out
              </Button>
            )}

            {/* Wishlist toggle */}
            <IconButton
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-2xl border transition-all duration-150 ${
                isFav
                  ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-950/30 dark:border-red-900/30"
                  : "border-gray-250 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50"
              }`}
            >
              <Heart className={`h-5 w-5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
            </IconButton>
          </div>

          {/* Trust badges */}
          <div className="bg-gray-50 dark:bg-slate-800/40 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 space-y-3.5">
            <div className="flex gap-3 text-xs items-center">
              <Truck className="h-5 w-5 text-sage-dark dark:text-emerald-400" />
              <div>
                <p className="font-bold">Free Shipping on orders over ₹1500</p>
                <p className="text-gray-400">Delivered within 3 - 5 business days.</p>
              </div>
            </div>
            <div className="flex gap-3 text-xs items-center">
              <RotateCcw className="h-5 w-5 text-sage-dark dark:text-emerald-400" />
              <div>
                <p className="font-bold">Hassle-Free 30-Day returns</p>
                <p className="text-gray-400">Exchange or refund, no questions asked.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Product Reviews */}
      <section className="mb-16 border-t border-gray-100 dark:border-slate-800 pt-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-sage-dark" /> Customer Reviews ({product.reviews?.length || 0})
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4 max-w-3xl">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-850 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="bg-sage-dark text-white font-bold h-9 w-9 text-sm">
                      {rev.userName.charAt(0)}
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">{rev.userName}</h4>
                      <p className="text-xs text-gray-400">{new Date(rev.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Rating value={rev.rating} readOnly size="small" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed pl-1">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No reviews yet for this product. Be the first to share your thoughts!</p>
        )}
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 dark:border-slate-800 pt-10">
          <h2 className="text-2xl font-bold mb-6">Similar Products You Might Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-200 block"
              >
                <div className="aspect-[4/5] bg-gray-50 dark:bg-slate-900 overflow-hidden relative">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-sage-dark dark:group-hover:text-emerald-400 truncate text-sm transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-extrabold text-sm">₹{item.price}</span>
                    <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                      {item.ratings || 4.5} <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
