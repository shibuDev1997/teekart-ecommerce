// Global type definitions for the TeeKart application

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: "boys" | "girls"
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
  trending: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  size: string
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string
  createdAt: string
}

export interface Order {
  id: string
  userId: string
  user: User
  items: CartItem[]
  total: number
  subtotal: number
  discount: number
  shippingAddress: ShippingAddress
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentId?: string
  promoCode?: string
  createdAt: string
  updatedAt: string
}

export interface ShippingAddress {
  fullName: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
}

export interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minAmount?: number
  maxDiscount?: number
  active: boolean
  expiresAt?: string
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Filter and search types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  sizes?: string[]
  colors?: string[]
  inStock?: boolean
  featured?: boolean
  trending?: boolean
}

export interface SearchParams {
  query?: string
  page?: number
  limit?: number
  sortBy?: "name" | "price-low" | "price-high" | "newest"
  filters?: ProductFilters
}

// UI Component types
export interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
  loading?: boolean
}

export interface CardProps {
  className?: string
  variant?: "default" | "elevated" | "outlined"
}

// Store types
export interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

// Theme types
export interface ThemeColors {
  sageDark: string
  sageMedium: string
  sageLight: string
  sageCream: string
}

export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
}
