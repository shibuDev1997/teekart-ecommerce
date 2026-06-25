import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../services/apiService";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { Product } from "../../types";
import {
  Grid,
  List as ListIcon,
  Search,
  SlidersHorizontal,
  X,
  Star,
  ShoppingBag,
  Heart,
  Scale,
  RefreshCw,
} from "lucide-react";
import {
  Slider,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Pagination,
  IconButton,
  Button,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

export const ProductCatalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  // Local state for layout
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // States mirroring URL filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debouncing search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Sync route parameters
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";
  const sortBy = (searchParams.get("sortBy") || "newest") as any;
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "3000");
  const rating = parseFloat(searchParams.get("rating") || "0");
  const selectedSizes = searchParams.getAll("size");
  const selectedColors = searchParams.getAll("color");

  // Fetch products via React Query
  const { data, isLoading } = useQuery({
    queryKey: [
      "catalog-products",
      debouncedSearch,
      page,
      category,
      sortBy,
      minPrice,
      maxPrice,
      rating,
      selectedSizes,
      selectedColors,
    ],
    queryFn: () =>
      apiService.getProducts({
        query: debouncedSearch,
        page,
        limit: 9,
        sortBy,
        filters: {
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          rating: rating || undefined,
          sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
          colors: selectedColors.length > 0 ? selectedColors : undefined,
        },
      }),
  });

  // Product Comparison State
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [compareDrawerOpen, setCompareDrawerOpen] = useState(false);

  const toggleCompare = (product: Product) => {
    setCompareItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 items at a time.");
        return prev;
      }
      return [...prev, product];
    });
    setCompareDrawerOpen(true);
  };

  // Update query parameters helper
  const updateParams = (newParams: Record<string, string | string[] | null>) => {
    const updated = new URLSearchParams(searchParams);
    
    // Always reset page if filters change
    if (newParams.page === undefined) {
      updated.set("page", "1");
    }

    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === "") {
        updated.delete(key);
      } else if (Array.isArray(val)) {
        updated.delete(key);
        val.forEach((v) => updated.append(key, v));
      } else {
        updated.set(key, val);
      }
    });

    setSearchParams(updated);
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    updateParams({ minPrice: min.toString(), maxPrice: max.toString() });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    updateParams({ size: newSizes });
  };

  const handleColorToggle = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    updateParams({ color: newColors });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSearchParams(new URLSearchParams({ page: "1" }));
  };

  const productsList = data?.data || [];
  const pagination = data?.pagination;

  // Sizes and Colors Constants
  const SIZES = ["XS", "S", "M", "L", "XL"];
  const COLORS = ["Black", "White", "Navy Blue", "Heather Gray", "Lavender", "Sage Green", "Charcoal", "Burgundy", "Pink"];

  const renderSidebarFilters = () => (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Category</h3>
        <RadioGroup
          value={category}
          onChange={(e) => updateParams({ category: e.target.value })}
          className="space-y-1.5"
        >
          <FormControlLabel
            value=""
            control={<Radio size="small" className="text-sage-dark" />}
            label={<span className="text-sm dark:text-gray-300">All Collections</span>}
          />
          <FormControlLabel
            value="boys"
            control={<Radio size="small" className="text-sage-dark" />}
            label={<span className="text-sm dark:text-gray-300">Boys</span>}
          />
          <FormControlLabel
            value="girls"
            control={<Radio size="small" className="text-sage-dark" />}
            label={<span className="text-sm dark:text-gray-300">Girls</span>}
          />
        </RadioGroup>
      </div>

      <hr className="border-gray-100 dark:border-slate-800" />

      {/* Price Slider */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Price Range</h3>
        <Slider
          value={[minPrice, maxPrice]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={3000}
          step={100}
          className="text-sage-dark"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
          <span>₹{minPrice}</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>

      <hr className="border-gray-100 dark:border-slate-800" />

      {/* Rating Filters */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Minimum Rating</h3>
        <RadioGroup
          value={rating.toString()}
          onChange={(e) => updateParams({ rating: e.target.value === "0" ? null : e.target.value })}
          className="space-y-1.5"
        >
          <FormControlLabel
            value="0"
            control={<Radio size="small" className="text-sage-dark" />}
            label={<span className="text-sm dark:text-gray-300">Any Rating</span>}
          />
          {[4, 4.5].map((rate) => (
            <FormControlLabel
              key={rate}
              value={rate.toString()}
              control={<Radio size="small" className="text-sage-dark" />}
              label={
                <span className="text-sm dark:text-gray-300 flex items-center gap-1">
                  {rate}+ <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </span>
              }
            />
          ))}
        </RadioGroup>
      </div>

      <hr className="border-gray-100 dark:border-slate-800" />

      {/* Sizes Selection */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all duration-150 ${
                  isSelected
                    ? "bg-sage-dark text-white border-sage-dark shadow-sm"
                    : "border-gray-200 dark:border-slate-700 hover:border-sage-medium dark:text-gray-300"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-100 dark:border-slate-800" />

      {/* Colors Selection */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Colors</h3>
        <div className="grid grid-cols-2 gap-2">
          {COLORS.map((color) => {
            const isSelected = selectedColors.includes(color);
            return (
              <button
                key={color}
                onClick={() => handleColorToggle(color)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold text-left transition-all duration-150 ${
                  isSelected
                    ? "bg-slate-50 dark:bg-slate-800 border-sage-dark text-sage-dark dark:text-emerald-400 shadow-sm"
                    : "border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:text-gray-300"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                  style={{
                    backgroundColor:
                      color === "White"
                        ? "#FFFFFF"
                        : color === "Black"
                        ? "#000000"
                        : color === "Navy Blue"
                        ? "#1E3A8A"
                        : color === "Lavender"
                        ? "#D8B4FE"
                        : color === "Sage Green"
                        ? "#84AE92"
                        : color === "Heather Gray"
                        ? "#9CA3AF"
                        : color === "Charcoal"
                        ? "#374151"
                        : color === "Burgundy"
                        ? "#7F1D1D"
                        : "#EC4899",
                  }}
                ></span>
                <span className="truncate">{color}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Filters */}
      <Button
        onClick={clearFilters}
        fullWidth
        startIcon={<RefreshCw className="h-4 w-4" />}
        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl normal-case font-bold py-2"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Search & Tool Bar Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-6 mb-8">
        
        {/* Title */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Catalog Catalog
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Showing {pagination?.total || 0} premium items.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sage-medium focus:border-transparent transition-all duration-200 text-sm"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="text-sm">
            <Select
              value={sortBy}
              onChange={(e) => updateParams({ sortBy: e.target.value })}
              className="rounded-2xl bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white"
              size="small"
            >
              <MenuItem value="newest">New Arrivals</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Top Rated</MenuItem>
              <MenuItem value="name">Alphabetical</MenuItem>
            </Select>
          </div>

          {/* View Toggles */}
          <div className="border border-gray-200 dark:border-slate-700 rounded-2xl p-1 flex bg-gray-50 dark:bg-slate-800">
            <IconButton
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-xl ${viewMode === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-sage-dark dark:text-emerald-400" : "text-gray-400"}`}
            >
              <Grid className="h-4 w-4" />
            </IconButton>
            <IconButton
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-xl ${viewMode === "list" ? "bg-white dark:bg-slate-700 shadow-sm text-sage-dark dark:text-emerald-400" : "text-gray-400"}`}
            >
              <ListIcon className="h-4 w-4" />
            </IconButton>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-gray-100"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700/50 shadow-sm h-fit">
          {renderSidebarFilters()}
        </aside>

        {/* Products Grid/List Container */}
        <main className="lg:col-span-3">
          {isLoading ? (
            <LoadingSpinner fullPage />
          ) : productsList.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
              <Scale className="h-12 w-12 text-gray-300 mx-auto" />
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">No items match your filters</h2>
              <p className="text-gray-400 max-w-sm mx-auto text-sm">
                Try widening your price range, searching with a different term, or resetting your filter options.
              </p>
              <Button
                onClick={clearFilters}
                className="bg-sage-dark text-white rounded-full px-6 py-2 normal-case mt-2"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productsList.map((product) => {
                    const isFav = isInWishlist(product.id);
                    const isComparing = compareItems.some((p) => p.id === product.id);

                    return (
                      <div
                        key={product.id}
                        className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
                      >
                        {/* Wishlist Icon */}
                        <div className="absolute right-4 top-4 z-10">
                          <IconButton
                            onClick={() => toggleWishlist(product)}
                            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-red-50 hover:text-red-500 text-gray-500 p-2 shadow-sm"
                          >
                            <Heart className={`h-5 w-5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                          </IconButton>
                        </div>

                        {/* Compare Icon */}
                        <div className="absolute left-4 top-4 z-10">
                          <IconButton
                            onClick={() => toggleCompare(product)}
                            className={`p-2 shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-slate-100 ${
                              isComparing ? "text-sage-dark dark:text-emerald-400 font-bold" : "text-gray-500"
                            }`}
                          >
                            <Scale className="h-5 w-5" />
                          </IconButton>
                        </div>

                        {/* Image */}
                        <Link to={`/products/${product.id}`} className="aspect-[4/5] bg-gray-50 dark:bg-slate-900 overflow-hidden block">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white font-bold uppercase text-xs">
                              Out of stock
                            </div>
                          )}
                        </Link>

                        {/* Info */}
                        <div className="p-5 flex flex-col flex-grow">
                          <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                            {product.category}
                          </span>
                          <Link
                            to={`/products/${product.id}`}
                            className="font-semibold text-gray-800 dark:text-gray-100 hover:text-sage-dark dark:hover:text-emerald-400 transition-colors line-clamp-1 text-base mb-1"
                          >
                            {product.name}
                          </Link>

                          <div className="flex items-center gap-1 mb-3">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                              {product.ratings || 4.5}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({product.reviewsCount || 10})
                            </span>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50 dark:border-slate-700/50">
                            <div>
                              <span className="font-extrabold text-base text-gray-900 dark:text-white">
                                ₹{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through ml-1.5">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                            {product.inStock && (
                              <button
                                onClick={() => addItem(product, product.sizes[0] || "M", product.colors[0] || "Black", 1)}
                                className="bg-sage-dark hover:bg-emerald-700 text-white p-2 rounded-full shadow transition-all duration-200"
                              >
                                <ShoppingBag className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // LIST VIEW MODE
                <div className="space-y-4">
                  {productsList.map((product) => {
                    const isFav = isInWishlist(product.id);
                    const isComparing = compareItems.some((p) => p.id === product.id);

                    return (
                      <div
                        key={product.id}
                        className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row relative"
                      >
                        {/* Image wrapper */}
                        <div className="relative w-full sm:w-48 aspect-[4/5] bg-gray-50 dark:bg-slate-900 flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white font-bold uppercase text-xs">
                              Out of stock
                            </div>
                          )}
                        </div>

                        {/* Text Info */}
                        <div className="p-6 flex flex-col justify-between flex-grow">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400">
                                {product.category}
                              </span>
                              <div className="flex gap-1.5">
                                <IconButton
                                  size="small"
                                  onClick={() => toggleCompare(product)}
                                  className={isComparing ? "text-sage-dark dark:text-emerald-400" : "text-gray-400"}
                                >
                                  <Scale className="h-4 w-4" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => toggleWishlist(product)}
                                  className={isFav ? "text-red-500" : "text-gray-400"}
                                >
                                  <Heart className="h-4 w-4" />
                                </IconButton>
                              </div>
                            </div>

                            <Link
                              to={`/products/${product.id}`}
                              className="font-bold text-lg text-gray-900 dark:text-white hover:text-sage-dark dark:hover:text-emerald-400 transition-colors line-clamp-1"
                            >
                              {product.name}
                            </Link>

                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>

                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="font-bold text-gray-700 dark:text-gray-300">
                                {product.ratings || 4.5}
                              </span>
                              <span className="text-gray-400">
                                ({product.reviewsCount || 10} reviews)
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-gray-50 dark:border-slate-700/50 pt-4 mt-4">
                            <div>
                              <span className="font-extrabold text-xl text-gray-900 dark:text-white">
                                ₹{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through ml-2">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                            {product.inStock && (
                              <Button
                                onClick={() => addItem(product, product.sizes[0] || "M", product.colors[0] || "Black", 1)}
                                variant="contained"
                                startIcon={<ShoppingBag className="h-4 w-4" />}
                                className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-xl normal-case py-2"
                              >
                                Add to Cart
                              </Button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination Controls */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center pt-8 border-t border-gray-100 dark:border-slate-800">
                  <Pagination
                    count={pagination.totalPages}
                    page={page}
                    onChange={(_e, val) => updateParams({ page: val.toString() })}
                    color="primary"
                    shape="rounded"
                    size="large"
                    className="dark:text-white"
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter Option */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        PaperProps={{
          className: "w-80 p-6 dark:bg-slate-900 dark:text-white",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Filter Options</h2>
          <IconButton onClick={() => setMobileFilterOpen(false)}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        {renderSidebarFilters()}
      </Drawer>

      {/* Product Comparison Drawer at Bottom */}
      {compareItems.length > 0 && (
        <Drawer
          anchor="bottom"
          open={compareDrawerOpen}
          onClose={() => setCompareDrawerOpen(false)}
          PaperProps={{
            className: "rounded-t-3xl max-h-[50vh] p-6 border-t dark:bg-slate-900 dark:text-white",
          }}
        >
          <div className="flex items-center justify-between border-b dark:border-slate-850 pb-4 mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Scale className="h-5 w-5 text-sage-dark dark:text-emerald-400" /> Compare Products ({compareItems.length}/3)
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setCompareItems([])}
                className="text-red-500 border-red-500 hover:bg-red-50 font-bold"
              >
                Clear All
              </Button>
              <IconButton onClick={() => setCompareDrawerOpen(false)}>
                <X className="h-5 w-5" />
              </IconButton>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-[600px] border dark:border-slate-800">
              <TableBody>
                {/* Images row */}
                <TableRow>
                  <TableCell className="font-bold border-r dark:border-slate-800 bg-gray-50 dark:bg-slate-950/30 w-1/4">Product Image</TableCell>
                  {compareItems.map((item) => (
                    <TableCell key={item.id} className="text-center w-1/4 border-r dark:border-slate-800">
                      <img src={item.images[0]} alt={item.name} className="h-20 object-contain mx-auto mb-2" />
                      <p className="font-bold text-xs line-clamp-1">{item.name}</p>
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                    <TableCell key={i} className="text-center text-gray-400 italic text-xs w-1/4 border-r dark:border-slate-800">
                      Add another product to compare
                    </TableCell>
                  ))}
                </TableRow>

                {/* Price row */}
                <TableRow>
                  <TableCell className="font-bold border-r dark:border-slate-800 bg-gray-50 dark:bg-slate-950/30">Price</TableCell>
                  {compareItems.map((item) => (
                    <TableCell key={item.id} className="text-center font-bold text-emerald-600 dark:text-emerald-400 border-r dark:border-slate-800">
                      ₹{item.price}
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                    <TableCell key={i} className="border-r dark:border-slate-800" />
                  ))}
                </TableRow>

                {/* Rating row */}
                <TableRow>
                  <TableCell className="font-bold border-r dark:border-slate-800 bg-gray-50 dark:bg-slate-950/30">Rating</TableCell>
                  {compareItems.map((item) => (
                    <TableCell key={item.id} className="text-center border-r dark:border-slate-800">
                      <span className="inline-flex items-center gap-1 font-bold text-sm">
                        {item.ratings || 4.5} <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      </span>
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                    <TableCell key={i} className="border-r dark:border-slate-800" />
                  ))}
                </TableRow>

                {/* Sizes row */}
                <TableRow>
                  <TableCell className="font-bold border-r dark:border-slate-800 bg-gray-50 dark:bg-slate-950/30">Sizes Available</TableCell>
                  {compareItems.map((item) => (
                    <TableCell key={item.id} className="text-center text-xs border-r dark:border-slate-800">
                      {item.sizes.join(", ")}
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                    <TableCell key={i} className="border-r dark:border-slate-800" />
                  ))}
                </TableRow>

                {/* Color row */}
                <TableRow>
                  <TableCell className="font-bold border-r dark:border-slate-800 bg-gray-50 dark:bg-slate-950/30">Colors Available</TableCell>
                  {compareItems.map((item) => (
                    <TableCell key={item.id} className="text-center text-xs border-r dark:border-slate-800">
                      {item.colors.join(", ")}
                    </TableCell>
                  ))}
                  {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                    <TableCell key={i} className="border-r dark:border-slate-800" />
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Drawer>
      )}

    </div>
  );
};
