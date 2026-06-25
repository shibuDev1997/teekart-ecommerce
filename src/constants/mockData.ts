import { Product, User, Order, PromoCode } from "../types";

export const dummyUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@teekart.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Urban Explorer Graphic Tee",
    description: "Express your streetwear vibe with this heavy-weight premium cotton graphic tee. Featuring an artistic urban landscape chest print, dropped shoulders, and a relaxed crew neckline. Designed to retain shape after countless washes.",
    price: 899,
    originalPrice: 1299,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600"
    ],
    category: "boys",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Sage Green"],
    inStock: true,
    featured: true,
    trending: true,
    ratings: 4.8,
    reviewsCount: 128,
    reviews: [
      { id: "r1", userName: "Marcus K.", rating: 5, comment: "Absolutely love the fabric weight! Feels super premium, fits perfectly.", createdAt: "2024-05-12T10:00:00Z" },
      { id: "r2", userName: "Alek S.", rating: 4, comment: "Nice graphic quality. Shrunk just a tiny bit in the dryer, so maybe air dry.", createdAt: "2024-05-14T14:30:00Z" }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Eco-Active Performance Shirt",
    description: "Designed for high-intensity training and warm summer days. Crafted from 100% recycled polyester that wicks sweat instantly. Flatlock seams reduce chafing, while reflective details increase visibility during night runs.",
    price: 1199,
    originalPrice: 1599,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600"
    ],
    category: "boys",
    sizes: ["M", "L", "XL"],
    colors: ["Cobalt Blue", "Carbon Gray", "Neon Green"],
    inStock: true,
    featured: true,
    trending: true,
    ratings: 4.6,
    reviewsCount: 94,
    reviews: [
      { id: "r3", userName: "Dave R.", rating: 5, comment: "Super breathable! Perfect for basketball and running.", createdAt: "2024-04-18T18:22:00Z" }
    ],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z"
  },
  {
    id: "3",
    name: "Vintage Classic Rock Tee",
    description: "Bring back the 70s rock aesthetic with this garment-dyed vintage tee. Features a cracked-ink retro band graphic on the front for an authentic worn-in look. Heavy wash treated for a super soft peach-skin feel.",
    price: 1099,
    originalPrice: 1499,
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600"
    ],
    category: "boys",
    sizes: ["S", "M", "L"],
    colors: ["Charcoal", "Burgundy"],
    inStock: true,
    featured: false,
    trending: true,
    ratings: 4.2,
    reviewsCount: 45,
    reviews: [
      { id: "r4", userName: "Chris L.", rating: 4, comment: "The print looks exactly like an old band tee. Fabric is comfortable.", createdAt: "2024-03-22T08:15:00Z" }
    ],
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z"
  },
  {
    id: "4",
    name: "Meadow Floral Crop Tee",
    description: "A gorgeous loose-fit crop top printed with hand-drawn meadow wildflowers. Made from sustainable organic bamboo-cotton blend that is exceptionally soft, hypoallergenic, and highly breathable. Pairs perfectly with high-waisted denim.",
    price: 999,
    originalPrice: 1399,
    images: [
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600"
    ],
    category: "girls",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Lavender", "Cream White", "Dusty Pink"],
    inStock: true,
    featured: true,
    trending: true,
    ratings: 4.9,
    reviewsCount: 88,
    reviews: [
      { id: "r5", userName: "Emma W.", rating: 5, comment: "So soft and the print is so pretty! Fits exactly as expected.", createdAt: "2024-05-02T11:00:00Z" }
    ],
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z"
  },
  {
    id: "5",
    name: "Stardust Oversized Boyfriend Tee",
    description: "Ultimate lounge aesthetic. Extra-roomy dropped shoulder fit with a minimalist glittery stardust logo printed on the chest. Made from premium french-terry cotton that keeps you cozy yet stylish all day long.",
    price: 1299,
    originalPrice: 1799,
    images: [
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600"
    ],
    category: "girls",
    sizes: ["S", "M", "L"],
    colors: ["Onyx Black", "Heather Gray", "Blush Pink"],
    inStock: true,
    featured: true,
    trending: false,
    ratings: 4.7,
    reviewsCount: 56,
    reviews: [
      { id: "r6", userName: "Sophia M.", rating: 5, comment: "My new favorite tee. Extremely comfortable and the fit is wonderfully oversized.", createdAt: "2024-05-19T20:10:00Z" }
    ],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z"
  },
  {
    id: "6",
    name: "Minimalist Ribbed Knit Tee",
    description: "Elevate your basic essentials. Fine ribbed knit structure offers a hugging, flattering fit. Crafted with micro-modal fibers that feel silky smooth against the skin. Great for layering under jackets or cardigans.",
    price: 799,
    originalPrice: 999,
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600"
    ],
    category: "girls",
    sizes: ["XS", "S", "M"],
    colors: ["Beige", "Olive Green", "Black"],
    inStock: false,
    featured: false,
    trending: true,
    ratings: 4.3,
    reviewsCount: 30,
    reviews: [],
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z"
  },
  // Extra items for pagination and infinite scroll
  ...Array.from({ length: 44 }, (_, i) => {
    const id = (i + 7).toString();
    const isBoy = i % 2 === 0;
    const category: "boys" | "girls" = isBoy ? "boys" : "girls";
    const rating = parseFloat((4 + Math.random()).toFixed(1));
    const price = Math.floor(Math.random() * 800) + 499;
    const originalPrice = price + Math.floor(Math.random() * 400) + 200;

    return {
      id,
      name: `${category === "boys" ? "Men's" : "Women's"} Casual Crewneck ${id}`,
      description: `Step up your everyday wardrobe with our classic style #${id}. Expertly stitched using breathable fabric, providing all-day comfort and a sleek modern silhouette that goes with anything.`,
      price,
      originalPrice,
      images: [
        isBoy 
          ? "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600"
          : "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600"
      ],
      category,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Navy Blue", "Heather Gray"],
      inStock: Math.random() > 0.15,
      featured: Math.random() > 0.8,
      trending: Math.random() > 0.7,
      ratings: rating,
      reviewsCount: Math.floor(Math.random() * 50),
      reviews: [
        { id: `r_anon_${id}`, userName: "Verified Buyer", rating: Math.round(rating), comment: "Good quality for daily wear. Worth the price.", createdAt: "2024-06-01T12:00:00Z" }
      ],
      createdAt: new Date(2024, 0, i + 7).toISOString(),
      updatedAt: new Date(2024, 0, i + 7).toISOString()
    };
  })
];

export const dummyPromoCodes: PromoCode[] = [
  {
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    minAmount: 500,
    maxDiscount: 200,
    active: true
  },
  {
    code: "FREESHIP",
    discount: 100,
    type: "fixed",
    minAmount: 1000,
    active: true
  },
  {
    code: "SAVE200",
    discount: 200,
    type: "fixed",
    minAmount: 1500,
    active: true
  }
];

export const dummyOrders: Order[] = [
  {
    id: "ORD-9281",
    userId: "1",
    user: dummyUsers[0],
    items: [
      {
        id: "c1",
        productId: "1",
        product: dummyProducts[0],
        quantity: 2,
        size: "M",
        color: "Black"
      },
      {
        id: "c2",
        productId: "4",
        product: dummyProducts[3],
        quantity: 1,
        size: "S",
        color: "Lavender"
      }
    ],
    subtotal: 2797,
    discount: 279.7,
    shippingFee: 0,
    tax: 125.8,
    total: 2643.1,
    shippingAddress: {
      fullName: "John Doe",
      address: "Suite 4B, Hillcrest Apartments, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      phone: "+91 9876543210"
    },
    status: "delivered",
    promoCode: "WELCOME10",
    createdAt: "2024-05-15T14:22:00Z",
    updatedAt: "2024-05-20T10:00:00Z"
  },
  {
    id: "ORD-1102",
    userId: "1",
    user: dummyUsers[0],
    items: [
      {
        id: "c3",
        productId: "2",
        product: dummyProducts[1],
        quantity: 1,
        size: "L",
        color: "Cobalt Blue"
      }
    ],
    subtotal: 1199,
    discount: 0,
    shippingFee: 80,
    tax: 54,
    total: 1333,
    shippingAddress: {
      fullName: "John Doe",
      address: "Suite 4B, Hillcrest Apartments, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      phone: "+91 9876543210"
    },
    status: "processing",
    createdAt: "2026-06-24T09:15:00Z",
    updatedAt: "2026-06-24T09:15:00Z"
  }
];
