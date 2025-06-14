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

// Re-export all types from global types file
export * from "./global"

// Additional utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// API response helpers
export type SuccessResponse<T> = {
  success: true
  data: T
  message?: string
}

export type ErrorResponse = {
  success: false
  error: string
  message?: string
}

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse
