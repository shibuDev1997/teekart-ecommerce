// Validation schemas using Zod

import { z } from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  originalPrice: z.number().positive().optional(),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  category: z.enum(["boys", "girls"]),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  inStock: z.boolean(),
  featured: z.boolean(),
  trending: z.boolean(),
})

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
})

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number"),
})

export const promoCodeSchema = z.object({
  code: z.string().min(3, "Promo code must be at least 3 characters"),
  amount: z.number().positive("Amount must be positive"),
})

export const searchParamsSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
  category: z.enum(["boys", "girls"]).optional(),
  sortBy: z.enum(["name", "price-low", "price-high", "newest"]).default("name"),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  featured: z.coerce.boolean().optional(),
  trending: z.coerce.boolean().optional(),
})

export type ProductInput = z.infer<typeof productSchema>
export type CartItemInput = z.infer<typeof cartItemSchema>
export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>
export type PromoCodeInput = z.infer<typeof promoCodeSchema>
export type SearchParamsInput = z.infer<typeof searchParamsSchema>
