import { api } from "../api/apiClient";
import { Product, Order, User, SearchParams, PaginatedResponse, AdminDashboardStats } from "../types";

// Local storage helpers for simulated persistence of client-created orders/products
const getStoredOrders = (): Order[] => {
  const data = localStorage.getItem("teekart-orders");
  return data ? JSON.parse(data) : [];
};

const setStoredOrders = (orders: Order[]) => {
  localStorage.setItem("teekart-orders", JSON.stringify(orders));
};

const getStoredProducts = (): Product[] => {
  const data = localStorage.getItem("teekart-products");
  return data ? JSON.parse(data) : [];
};

const setStoredProducts = (products: Product[]) => {
  localStorage.setItem("teekart-products", JSON.stringify(products));
};

// Map DummyJSON products to TeeKart structure
const mapProduct = (p: any): Product => {
  const priceINR = Math.round(p.price * 80); // Simulate INR conversion
  const hasDiscount = p.discountPercentage && p.discountPercentage > 0;
  const originalPrice = hasDiscount ? Math.round((priceINR / (1 - p.discountPercentage / 100))) : undefined;
  
  // Categorize based on DummyJSON tags and categories
  const cat = p.category.toLowerCase();
  const isGirl = cat.includes("women") || cat.includes("beauty") || cat.includes("fragrances") || cat.includes("tops");
  
  return {
    id: p.id.toString(),
    name: p.title,
    description: p.description,
    price: priceINR,
    originalPrice,
    images: p.images && p.images.length > 0 ? p.images : [p.thumbnail],
    category: isGirl ? "girls" : "boys",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy Blue", "Heather Gray"],
    inStock: p.stock > 0,
    featured: p.rating >= 4.5,
    trending: p.rating >= 4.0 && p.rating < 4.5,
    ratings: p.rating,
    reviewsCount: p.reviews?.length || 0,
    reviews: p.reviews?.map((r: any, i: number) => ({
      id: `rev-${p.id}-${i}`,
      userName: r.reviewerName,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.date,
    })) || [],
    createdAt: p.meta?.createdAt || new Date().toISOString(),
    updatedAt: p.meta?.updatedAt || new Date().toISOString(),
  };
};

export const apiService = {
  // ==========================================
  // PRODUCTS API
  // ==========================================
  getProducts: async (params: SearchParams = {}): Promise<PaginatedResponse<Product>> => {
    const { query = "", page = 1, limit = 9, sortBy = "newest", filters = {} } = params;

    let url = "/products";
    const requestParams: any = {
      limit: 100, // Fetch a batch to apply filters client-side
    };

    if (query) {
      url = "/products/search";
      requestParams.q = query;
    }

    const response = await api.get(url, { params: requestParams });
    const fetched = response.data.products.map(mapProduct);

    // Merge with any custom client-side created products
    const clientProducts = getStoredProducts();
    let allProducts = [...clientProducts, ...fetched];

    // Filter Category
    if (filters.category) {
      allProducts = allProducts.filter(
        (p) => p.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }
    // Filter Price
    if (filters.minPrice !== undefined) {
      allProducts = allProducts.filter((p) => p.price >= (filters.minPrice ?? 0));
    }
    if (filters.maxPrice !== undefined) {
      allProducts = allProducts.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
    }
    // Filter Ratings
    if (filters.rating !== undefined) {
      allProducts = allProducts.filter((p) => (p.ratings ?? 0) >= (filters.rating ?? 0));
    }
    // Filter Sizes
    if (filters.sizes && filters.sizes.length > 0) {
      allProducts = allProducts.filter((p) => p.sizes.some((s: string) => filters.sizes?.includes(s)));
    }
    // Filter Colors
    if (filters.colors && filters.colors.length > 0) {
      allProducts = allProducts.filter((p) => p.colors.some((c: string) => filters.colors?.includes(c)));
    }

    // Sort Products
    if (sortBy === "name") {
      allProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price-low") {
      allProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      allProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      allProducts.sort((a, b) => (b.ratings ?? 0) - (a.ratings ?? 0));
    } else {
      // newest
      allProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // Pagination
    const total = allProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = allProducts.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  getProductById: async (id: string): Promise<Product> => {
    // Check local created products first
    const clientProducts = getStoredProducts();
    const foundLocal = clientProducts.find((p) => p.id === id);
    if (foundLocal) return foundLocal;

    const response = await api.get(`/products/${id}`);
    return mapProduct(response.data);
  },

  createProduct: async (productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> => {
    // Post to DummyJSON mock endpoint
    await api.post("/products/add", productData);
    
    // Since mock endpoints don't persist on server, we save it locally to memory/localStorage
    const newProduct: Product = {
      ...productData,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ratings: 5.0,
      reviewsCount: 0,
      reviews: [],
    };

    const stored = getStoredProducts();
    setStoredProducts([newProduct, ...stored]);
    return newProduct;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    // If it's a client created product
    if (id.startsWith("client-")) {
      const stored = getStoredProducts();
      const idx = stored.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error("Product not found.");
      const updated = { ...stored[idx], ...updates, updatedAt: new Date().toISOString() };
      stored[idx] = updated;
      setStoredProducts(stored);
      return updated;
    }

    // Standard API request
    const response = await api.put(`/products/${id}`, updates);
    return mapProduct(response.data);
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    if (id.startsWith("client-")) {
      const stored = getStoredProducts();
      const filtered = stored.filter((p) => p.id !== id);
      setStoredProducts(filtered);
      return true;
    }
    
    await api.delete(`/products/${id}`);
    return true;
  },

  // ==========================================
  // CATEGORIES API
  // ==========================================
  getCategories: async (): Promise<string[]> => {
    return ["boys", "girls"];
  },

  // ==========================================
  // ORDERS API
  // ==========================================
  getOrders: async (userId?: string): Promise<Order[]> => {
    const orders = getStoredOrders();
    if (userId) {
      return orders.filter((o) => o.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getOrderById: async (id: string): Promise<Order> => {
    const orders = getStoredOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found.");
    return order;
  },

  createOrder: async (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orders = getStoredOrders();
    orders.unshift(newOrder);
    setStoredOrders(orders);
    return newOrder;
  },

  updateOrderStatus: async (id: string, status: Order["status"]): Promise<Order> => {
    const orders = getStoredOrders();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new Error("Order not found.");
    
    orders[idx] = {
      ...orders[idx],
      status,
      updatedAt: new Date().toISOString(),
    };
    setStoredOrders(orders);
    return orders[idx];
  },

  // ==========================================
  // USERS API
  // ==========================================
  getUsers: async (): Promise<User[]> => {
    const response = await api.get("/users?limit=10");
    return response.data.users.map((u: any) => ({
      id: u.id.toString(),
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      role: u.role === "admin" ? "admin" : "user",
      avatar: u.image,
      createdAt: new Date().toISOString(),
    }));
  },

  updateUserRole: async (id: string, role: "admin" | "user"): Promise<User> => {
    const response = await api.put(`/users/${id}`, { role });
    const u = response.data;
    return {
      id: u.id.toString(),
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      role: role,
      avatar: u.image,
      createdAt: new Date().toISOString(),
    };
  },

  deleteUser: async (id: string): Promise<boolean> => {
    await api.delete(`/users/${id}`);
    return true;
  },

  // ==========================================
  // DASHBOARD ANALYTICS API
  // ==========================================
  getDashboardStats: async (): Promise<AdminDashboardStats> => {
    const orders = getStoredOrders();
    const responseProd = await api.get("/products?limit=1");
    const responseUsers = await api.get("/users?limit=1");

    const revenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((acc, o) => acc + o.total, 0);

    const ordersCount = orders.length;
    const usersCount = responseUsers.data.total;
    const productsCount = responseProd.data.total;

    const recentOrders = orders.slice(0, 5);

    const salesByMonth = [
      { month: "Jan", amount: 15000 },
      { month: "Feb", amount: 24000 },
      { month: "Mar", amount: 18000 },
      { month: "Apr", amount: 35000 },
      { month: "May", amount: 48000 },
      { month: "Jun", amount: Math.round(revenue) || 12000 },
    ];

    const categoryDistribution = [
      { category: "Boys Collection", count: Math.round(productsCount / 2) },
      { category: "Girls Collection", count: Math.round(productsCount / 2) },
    ];

    return {
      revenue: Math.round(revenue) || 0,
      ordersCount,
      usersCount,
      productsCount,
      recentOrders,
      salesByMonth,
      categoryDistribution,
    };
  },
};
