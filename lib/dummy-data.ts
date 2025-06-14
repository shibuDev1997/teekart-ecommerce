import type { Product, User, Order, PromoCode } from "@/types"

export const dummyProducts: Product[] = [
  // Boys T-Shirts
  {
    id: "1",
    name: "Cool Graphic Tee - Urban Style",
    description:
      "Trendy graphic t-shirt perfect for casual wear. Made with premium cotton blend for ultimate comfort and featuring modern urban-inspired designs.",
    price: 899,
    originalPrice: 1299,
    images: ["/images/tshirt-1.jpg", "/images/tshirt-2.jpg"],
    category: "boys",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Gray"],
    inStock: true,
    featured: true,
    trending: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Sports Active Performance Tee",
    description:
      "Moisture-wicking sports t-shirt ideal for active boys. Breathable fabric with modern athletic fit and quick-dry technology.",
    price: 1199,
    images: ["/images/tshirt-2.jpg"],
    category: "boys",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Green", "Orange"],
    inStock: true,
    featured: false,
    trending: true,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Vintage Band Tee - Classic Rock",
    description:
      "Classic vintage-style band t-shirt with retro graphics. Soft cotton material with authentic distressed look and feel.",
    price: 1099,
    images: ["/images/tshirt-3.jpg"],
    category: "boys",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Gray", "Maroon"],
    inStock: true,
    featured: true,
    trending: false,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  // Girls T-Shirts
  {
    id: "4",
    name: "Floral Print Tee - Spring Collection",
    description:
      "Beautiful floral print t-shirt perfect for girls. Comfortable fit with vibrant colors and delicate flower patterns.",
    price: 999,
    originalPrice: 1399,
    images: ["/images/tshirt-4.jpg", "/images/tshirt-1.jpg"],
    category: "girls",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "Purple", "White", "Lavender"],
    inStock: true,
    featured: true,
    trending: true,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Unicorn Magic Tee - Fantasy Dreams",
    description:
      "Magical unicorn themed t-shirt with glitter accents. Perfect for young girls who love fantasy and sparkles.",
    price: 1299,
    images: ["/images/tshirt-1.jpg"],
    category: "girls",
    sizes: ["XS", "S", "M"],
    colors: ["Pink", "Purple", "White", "Rainbow"],
    inStock: true,
    featured: false,
    trending: true,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  // More products for pagination
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 6}`,
    name: `${i % 2 === 0 ? "Boys" : "Girls"} Premium T-Shirt ${i + 1}`,
    description: `Premium quality t-shirt with modern design. Perfect for everyday wear with comfortable fit and durable construction.`,
    price: Math.floor(Math.random() * 1000) + 500,
    originalPrice: Math.floor(Math.random() * 500) + 1000,
    images: ["/images/tshirt-1.jpg"],
    category: (i % 2 === 0 ? "boys" : "girls") as "boys" | "girls",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Blue", "Red", "Green", "Pink"],
    inStock: Math.random() > 0.1,
    featured: Math.random() > 0.7,
    trending: Math.random() > 0.6,
    createdAt: new Date(2024, 0, i + 6).toISOString(),
    updatedAt: new Date(2024, 0, i + 6).toISOString(),
  })),
]

export const dummyUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@teekart.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export const dummyPromoCodes: PromoCode[] = [
  {
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    minAmount: 500,
    maxDiscount: 200,
    active: true,
  },
  {
    code: "FREESHIP",
    discount: 100,
    type: "fixed",
    minAmount: 1000,
    active: true,
  },
  {
    code: "SAVE20",
    discount: 20,
    type: "percentage",
    minAmount: 1500,
    maxDiscount: 500,
    active: true,
  },
]

export const dummyOrders: Order[] = [
  {
    id: "1",
    userId: "1",
    user: dummyUsers[0],
    items: [
      {
        id: "1",
        productId: "1",
        product: dummyProducts[0],
        quantity: 2,
        size: "M",
        color: "Black",
      },
    ],
    subtotal: 1798,
    discount: 180,
    total: 1618,
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210",
    },
    status: "delivered",
    promoCode: "WELCOME10",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
]
