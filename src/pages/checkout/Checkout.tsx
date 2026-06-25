import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { apiService } from "../../services/apiService";
import { ShippingAddress } from "../../types";
import {
  CreditCard,
  MapPin,
  CheckCircle,
  Truck,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { Button, TextField, FormControlLabel, Checkbox, Radio, RadioGroup, Alert } from "@mui/material";

export const Checkout: React.FC = () => {
  const { user } = useAuthStore();
  const { items, coupon, getCalculations, clearCart } = useCartStore();
  const { subtotal, discount, shippingFee, tax, total } = getCalculations();

  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: user?.name || "",
      address: "42, Green Heights, Phase II",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      phone: "+91 9998887776",
    },
  });

  const onSubmit = async (data: ShippingAddress) => {
    if (items.length === 0) return;
    setLoading(true);
    setErrorMsg("");

    try {
      // Create new order on local mock server DB
      const placedOrder = await apiService.createOrder({
        userId: user?.id || "anonymous",
        user: user || {
          id: "anonymous",
          name: data.fullName,
          email: "anonymous@teekart.com",
          role: "user",
          createdAt: new Date().toISOString(),
        },
        items: [...items],
        subtotal,
        discount,
        shippingFee,
        tax,
        total,
        shippingAddress: data,
        status: "pending",
        promoCode: coupon?.code || undefined,
      });

      // Clear local cart store
      clearCart();
      setOrderPlaced(placedOrder.id);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process order.");
    } finally {
      setLoading(false);
    }
  };

  // If order is placed, show confirmation screen
  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 dark:bg-slate-900 dark:text-white transition-colors duration-300">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Order Confirmed!</h1>
        <p className="text-gray-500 text-sm">
          Thank you for shopping with TeeKart. Your order has been successfully placed.
        </p>
        
        <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-750 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Order ID:</span>
            <span className="font-mono font-bold text-gray-800 dark:text-white">{orderPlaced}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated Delivery:</span>
            <span className="font-bold text-gray-800 dark:text-white">3-5 Business Days</span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-100 dark:border-slate-700 pt-2 mt-2">
            <span className="text-gray-400">Total Paid:</span>
            <span className="font-extrabold text-gray-900 dark:text-white">₹{total}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            component={Link}
            to="/profile"
            variant="contained"
            fullWidth
            className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case py-3"
          >
            Track Order History
          </Button>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            fullWidth
            className="text-sage-dark border-sage-dark hover:bg-slate-50 font-bold rounded-2xl normal-case py-3"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Checkout</h1>

      {errorMsg && (
        <Alert severity="error" className="mb-8 rounded-2xl">
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Columns: Address & Payment */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Address Card */}
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 shadow-sm rounded-3xl p-6 space-y-5">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b dark:border-slate-850 pb-3">
              <MapPin className="h-5 w-5 text-sage-dark" /> Shipping Address
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                {...register("fullName", { required: "Full name is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                InputProps={{ className: "rounded-2xl dark:text-white" }}
                InputLabelProps={{ className: "dark:text-gray-400" }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                {...register("phone", { required: "Phone number is required" })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                InputProps={{ className: "rounded-2xl dark:text-white" }}
                InputLabelProps={{ className: "dark:text-gray-400" }}
              />

              <div className="sm:col-span-2">
                <TextField
                  fullWidth
                  label="Street Address"
                  variant="outlined"
                  {...register("address", { required: "Street address is required" })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  InputProps={{ className: "rounded-2xl dark:text-white" }}
                  InputLabelProps={{ className: "dark:text-gray-400" }}
                />
              </div>

              <TextField
                fullWidth
                label="City"
                variant="outlined"
                {...register("city", { required: "City is required" })}
                error={!!errors.city}
                helperText={errors.city?.message}
                InputProps={{ className: "rounded-2xl dark:text-white" }}
                InputLabelProps={{ className: "dark:text-gray-400" }}
              />

              <TextField
                fullWidth
                label="State"
                variant="outlined"
                {...register("state", { required: "State is required" })}
                error={!!errors.state}
                helperText={errors.state?.message}
                InputProps={{ className: "rounded-2xl dark:text-white" }}
                InputLabelProps={{ className: "dark:text-gray-400" }}
              />

              <TextField
                fullWidth
                label="Pincode / Postal Code"
                variant="outlined"
                {...register("pincode", { required: "Pincode is required" })}
                error={!!errors.pincode}
                helperText={errors.pincode?.message}
                InputProps={{ className: "rounded-2xl dark:text-white" }}
                InputLabelProps={{ className: "dark:text-gray-400" }}
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsBilling}
                  onChange={(e) => setSameAsBilling(e.target.checked)}
                  className="text-sage-dark"
                />
              }
              label={<span className="text-sm text-gray-500">Billing address is same as shipping</span>}
            />
          </div>

          {/* Payment Method Card */}
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 shadow-sm rounded-3xl p-6 space-y-5">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b dark:border-slate-850 pb-3">
              <CreditCard className="h-5 w-5 text-sage-dark" /> Payment Details
            </h2>

            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              
              {/* Card option */}
              <div className="border border-gray-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col gap-4 mb-3">
                <FormControlLabel
                  value="card"
                  control={<Radio className="text-sage-dark" />}
                  label={<span className="font-bold text-sm">Credit / Debit Card</span>}
                />
                
                {paymentMethod === "card" && (
                  <div className="grid sm:grid-cols-3 gap-4 pt-2">
                    <div className="sm:col-span-3">
                      <TextField
                        fullWidth
                        label="Card Number"
                        placeholder="4111 2222 3333 4444"
                        defaultValue="4111222233334444"
                        variant="outlined"
                        InputProps={{ className: "rounded-2xl dark:text-white" }}
                        InputLabelProps={{ className: "dark:text-gray-400" }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <TextField
                        fullWidth
                        label="Expiry Date"
                        placeholder="MM/YY"
                        defaultValue="12/29"
                        variant="outlined"
                        InputProps={{ className: "rounded-2xl dark:text-white" }}
                        InputLabelProps={{ className: "dark:text-gray-400" }}
                      />
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        label="CVV"
                        placeholder="123"
                        defaultValue="123"
                        variant="outlined"
                        InputProps={{ className: "rounded-2xl dark:text-white" }}
                        InputLabelProps={{ className: "dark:text-gray-400" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* COD option */}
              <div className="border border-gray-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between">
                <FormControlLabel
                  value="cod"
                  control={<Radio className="text-sage-dark" />}
                  label={<span className="font-bold text-sm">Cash on Delivery (COD)</span>}
                />
                <Truck className="h-5 w-5 text-gray-400" />
              </div>
            </RadioGroup>

            <div className="flex gap-2 text-xs text-gray-500 items-center justify-center pt-2">
              <ShieldCheck className="h-4.5 w-4.5 text-sage-dark" /> Secure payments encrypted with 256-bit SSL protocol.
            </div>
          </div>
        </div>

        {/* Right Column: Summaries */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 shadow-md rounded-3xl p-6 space-y-5">
            <h3 className="font-extrabold text-lg border-b dark:border-slate-850 pb-4">Checkout Review</h3>

            {/* Cart Items Summary */}
            <div className="max-h-60 overflow-y-auto pr-1 space-y-3.5 border-b dark:border-slate-850 pb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center justify-between text-xs">
                  <div className="flex gap-2 items-center">
                    <img src={item.product.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg bg-gray-50" />
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{item.product.name}</p>
                      <p className="text-gray-400">Qty: {item.quantity} | Size: {item.size}</p>
                    </div>
                  </div>
                  <span className="font-extrabold">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Promo Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (18%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t dark:border-slate-800">
                <span>Order Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Place Order */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || items.length === 0}
              className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case py-3.5 shadow-lg shadow-sage-dark/20 text-base"
            >
              {loading ? "Placing Order..." : `Place Order (₹${total})`}
            </Button>

            <Link
              to="/cart"
              className="inline-flex items-center justify-center gap-1 text-xs text-gray-500 font-bold hover:underline w-full pt-1"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Return to Cart
            </Link>
          </div>
        </div>

      </form>
    </div>
  );
};
