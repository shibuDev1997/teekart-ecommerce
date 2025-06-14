import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "@/types"

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, color, quantity = 1) => {
        const existingItemIndex = get().items.findIndex(
          (item) => item.productId === product.id && item.size === size && item.color === color,
        )

        if (existingItemIndex > -1) {
          const items = [...get().items]
          items[existingItemIndex].quantity += quantity
          set({ items })
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${size}-${color}-${Date.now()}`,
            productId: product.id,
            product,
            quantity,
            size,
            color,
          }
          set({ items: [...get().items, newItem] })
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        const items = get().items.map((item) => (item.id === id ? { ...item, quantity } : item))
        set({ items })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
