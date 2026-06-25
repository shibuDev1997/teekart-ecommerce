export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: "boys" | "girls";
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  trending: boolean;
  ratings?: number;
  reviewsCount?: number;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique cart item id (combining productId, size, color)
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  user: User;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  shippingAddress: ShippingAddress;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentId?: string;
  promoCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minAmount?: number;
  maxDiscount?: number;
  active: boolean;
  expiresAt?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  inStock?: boolean;
  featured?: boolean;
  trending?: boolean;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "price-low" | "price-high" | "newest" | "rating";
  filters?: ProductFilters;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminDashboardStats {
  revenue: number;
  ordersCount: number;
  usersCount: number;
  productsCount: number;
  recentOrders: Order[];
  salesByMonth: { month: string; amount: number }[];
  categoryDistribution: { category: string; count: number }[];
}
