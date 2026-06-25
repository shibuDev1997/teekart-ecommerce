import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ChevronLeft,
  Ticket,
  Percent,
} from "lucide-react";
import { Button, Alert, IconButton } from "@mui/material";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    coupon,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    getCalculations,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [couponAlert, setCouponAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const { subtotal, discount, shippingFee, tax, total } = getCalculations();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    const res = applyCoupon(promoCode.trim());
    if (res.success) {
      setCouponAlert({ type: "success", message: res.message });
      setPromoCode("");
    } else {
      setCouponAlert({ type: "error", message: res.message });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponAlert(null);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6 dark:bg-slate-900 dark:text-white transition-colors duration-300">
        <div className="w-20 h-20 bg-gray-150 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-gray-400">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Your shopping cart is empty</h2>
        <p className="text-gray-500 max-w-sm mx-auto text-sm">
          It looks like you haven't added any products to your cart yet. Visit our shop catalog to get started.
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
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b dark:border-slate-850 pb-4 mb-2">
            <span className="text-sm font-bold text-gray-500">{items.length} unique items</span>
            <button
              onClick={clearCart}
              className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col sm:flex-row items-center gap-5 justify-between"
              >
                {/* Product Detail Thumbnail */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 aspect-[4/5] rounded-xl object-cover bg-gray-50 flex-shrink-0"
                  />
                  <div>
                    <Link
                      to={`/products/${item.productId}`}
                      className="font-bold text-gray-900 dark:text-white hover:text-sage-dark dark:hover:text-emerald-400 transition-colors line-clamp-1 text-base"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-1 flex flex-wrap gap-2">
                      <span>Size: <strong className="text-gray-700 dark:text-gray-200">{item.size}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-gray-700 dark:text-gray-200">{item.color}</strong></span>
                    </p>
                    <span className="font-extrabold text-sm text-gray-900 dark:text-white block mt-2">
                      ₹{item.product.price}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls and Remove */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center border border-gray-200 dark:border-slate-750 bg-gray-50 dark:bg-slate-850 rounded-xl p-0.5">
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      size="small"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </IconButton>
                    <span className="px-3 text-xs font-bold text-gray-800 dark:text-white w-6 text-center">{item.quantity}</span>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      size="small"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>

                  {/* Total Line Price */}
                  <span className="font-extrabold text-base text-gray-900 dark:text-white w-20 text-right">
                    ₹{item.product.price * item.quantity}
                  </span>

                  {/* Delete Button */}
                  <IconButton
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                    size="small"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          {/* Continue shopping Link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm font-bold text-sage-dark dark:text-emerald-400 hover:underline pt-4"
          >
            <ChevronLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 shadow-md rounded-3xl p-6 space-y-6">
            <h3 className="font-extrabold text-lg border-b dark:border-slate-850 pb-4">Order Summary</h3>

            {/* Calculations Breakdown */}
            <div className="space-y-3.5 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Percent className="h-3.5 w-3.5" /> Coupon Discount {coupon ? `(${coupon.code})` : ""}
                  </span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {shippingFee === 0 ? <strong className="text-emerald-500 font-bold uppercase text-xs">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (18% GST)</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{tax}</span>
              </div>

              <hr className="border-gray-100 dark:border-slate-850" />

              <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-1">
                <span>Estimated Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Coupon Application Form */}
            <div className="space-y-3 border-t dark:border-slate-850 pt-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Ticket className="h-3.5 w-3.5 text-sage-dark" /> Have a Coupon?
              </h4>
              
              {coupon ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 dark:border-emerald-900/30 rounded-2xl p-3.5 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-bold text-emerald-700 dark:text-emerald-400">{coupon.code}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-500">{coupon.discount}% Promo applied</p>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Code (WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-4 py-2 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-medium uppercase font-bold text-center"
                  />
                  <Button
                    type="submit"
                    variant="outlined"
                    className="text-sage-dark border-sage-dark hover:bg-slate-50 font-bold rounded-2xl normal-case"
                  >
                    Apply
                  </Button>
                </form>
              )}

              {couponAlert && (
                <Alert
                  severity={couponAlert.type}
                  className="rounded-2xl py-0.5 px-3 text-xs border dark:border-slate-800"
                  onClose={() => setCouponAlert(null)}
                >
                  {couponAlert.message}
                </Alert>
              )}
            </div>

            {/* Checkout Button */}
            <Button
              onClick={() => navigate("/checkout")}
              variant="contained"
              fullWidth
              endIcon={<ArrowRight className="h-5 w-5" />}
              className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case py-3.5 shadow-lg shadow-sage-dark/20 text-base"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
