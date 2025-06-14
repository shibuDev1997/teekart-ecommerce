// Application constants and configuration

export const APP_CONFIG = {
  name: "TeeKart",
  description: "Premium T-Shirts for Boys & Girls",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  adminEmail: process.env.ADMIN_EMAIL || "admin@teekart.com",
} as const

export const THEME_COLORS = {
  sageDark: "#5A827E",
  sageMedium: "#84AE92",
  sageLight: "#B9D4AA",
  sageCream: "#FAFFCA",
} as const

export const PRODUCT_CONFIG = {
  categories: ["boys", "girls"] as const,
  sizes: ["XS", "S", "M", "L", "XL"] as const,
  colors: ["Black", "White", "Red", "Blue", "Green", "Pink", "Purple", "Gray"] as const,
  defaultLimit: 12,
  maxLimit: 50,
} as const

export const PROMO_CODES = {
  WELCOME10: {
    code: "WELCOME10",
    discount: 10,
    type: "percentage" as const,
    minAmount: 500,
    maxDiscount: 200,
  },
  FREESHIP: {
    code: "FREESHIP",
    discount: 100,
    type: "fixed" as const,
    minAmount: 1000,
  },
  SAVE20: {
    code: "SAVE20",
    discount: 20,
    type: "percentage" as const,
    minAmount: 1500,
    maxDiscount: 500,
  },
} as const

export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const

export const ROUTES = {
  home: "/",
  products: "/products",
  cart: "/cart",
  wishlist: "/wishlist",
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
  },
  admin: "/admin",
  profile: "/profile",
  orders: "/orders",
} as const
