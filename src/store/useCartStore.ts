import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, PromoCode } from "../types";
import { dummyPromoCodes } from "../constants/mockData";

interface CartState {
  items: CartItem[];
  coupon: PromoCode | null;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getCalculations: () => {
    subtotal: number;
    discount: number;
    shippingFee: number;
    tax: number;
    total: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      addItem: (product, size, color, quantity = 1) => {
        set((state) => {
          const id = `${product.id}-${size}-${color}`;
          const existingItemIndex = state.items.findIndex((item) => item.id === id);

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          }

          const newItem: CartItem = {
            id,
            productId: product.id,
            product,
            quantity,
            size,
            color,
          };
          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      clearCart: () => set({ items: [], coupon: null }),
      applyCoupon: (code) => {
        const foundCoupon = dummyPromoCodes.find(
          (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
        );

        if (!foundCoupon) {
          return { success: false, message: "Invalid or inactive promo code." };
        }

        const calculations = get().getCalculations();
        if (foundCoupon.minAmount && calculations.subtotal < foundCoupon.minAmount) {
          return {
            success: false,
            message: `Minimum order amount of ₹${foundCoupon.minAmount} required.`,
          };
        }

        set({ coupon: foundCoupon });
        return { success: true, message: `Coupon Applied: ${foundCoupon.discount}% Off!` };
      },
      removeCoupon: () => set({ coupon: null }),
      getCalculations: () => {
        const { items, coupon } = get();
        const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

        let discount = 0;
        if (coupon) {
          if (coupon.type === "percentage") {
            discount = subtotal * (coupon.discount / 100);
            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
              discount = coupon.maxDiscount;
            }
          } else {
            discount = coupon.discount;
          }
        }

        // Free shipping above ₹1500, otherwise ₹100
        const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 100;

        // 18% Tax calculated on subtotal minus discount
        const taxableAmount = Math.max(0, subtotal - discount);
        const tax = Math.round(taxableAmount * 0.18);

        const total = taxableAmount + shippingFee + tax;

        return {
          subtotal,
          discount,
          shippingFee,
          tax,
          total,
        };
      },
    }),
    {
      name: "teekart-cart-storage",
    }
  )
);
