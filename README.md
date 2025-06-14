# 🌿 TeeKart - Premium T-Shirt E-Commerce Platform

A modern, enterprise-grade e-commerce application built with Next.js 14, featuring a beautiful sage green theme and comprehensive shopping functionality.

## 🚀 Features

### 🛍️ **E-Commerce Core**
- **Product Catalog**: Browse boys & girls t-shirt collections
- **Advanced Filtering**: Category, price, size, color filters
- **Shopping Cart**: Persistent cart with quantity management
- **Wishlist**: Save favorite products
- **Promo Codes**: Discount system (WELCOME10, FREESHIP, SAVE20)
- **Responsive Design**: Mobile-first, works on all devices

### 🎨 **Design & UX**
- **Custom Sage Theme**: Beautiful green color palette (#5A827E, #84AE92, #B9D4AA, #FAFFCA)
- **Smooth Animations**: Tailwind CSS animations with custom keyframes
- **Modern UI**: Shadcn/ui components with custom styling
- **Image Optimization**: Next.js Image component with proper sizing
- **Accessibility**: WCAG compliant with proper ARIA labels

### 🔧 **Technical Stack**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: Shadcn/ui
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📁 Project Structure

\`\`\`
teekart-ecommerce/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 products/             # Product endpoints
│   │   └── 📁 promo-codes/          # Promo code validation
│   ├── 📁 auth/                     # Authentication pages
│   ├── 📁 products/                 # Product pages
│   ├── 📁 cart/                     # Shopping cart
│   ├── 📁 wishlist/                 # Wishlist page
│   ├── globals.css                  # Global styles + theme
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Homepage
│   └── providers.tsx                # App providers
├── 📁 components/                   # Reusable components
│   ├── 📁 layout/                   # Layout components
│   │   ├── header.tsx               # Navigation header
│   │   └── footer.tsx               # Site footer
│   ├── 📁 product/                  # Product components
│   │   ├── product-card.tsx         # Product display card
│   │   └── product-filters.tsx      # Filter sidebar
│   ├── 📁 ui/                       # Shadcn/ui components
│   └── theme-provider.tsx           # Theme context
├── 📁 hooks/                        # Custom React hooks
│   └── use-products.ts              # Product data fetching
├── 📁 lib/                          # Utilities & configuration
│   ├── dummy-data.ts                # Mock data for development
│   └── utils.ts                     # Helper functions
├── 📁 store/                        # State management
│   ├── cart-store.ts                # Shopping cart state
│   └── wishlist-store.ts            # Wishlist state
├── 📁 types/                        # TypeScript definitions
│   └── index.ts                     # Global type definitions
├── 📁 public/                       # Static assets
│   └── 📁 images/                   # Product & UI images
├── .env.local                       # Environment variables
├── package.json                     # Dependencies
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
\`\`\`

## 🎨 Design System

### **Color Palette**
\`\`\`css
--sage-dark: #5A827E     /* Primary buttons, headers */
--sage-medium: #84AE92   /* Secondary elements, badges */
--sage-light: #B9D4AA    /* Soft accents, borders */
--sage-cream: #FAFFCA    /* Light backgrounds, highlights */
\`\`\`

### **Typography**
- **Headings**: Inter font family, gradient text effects
- **Body**: Clean, readable typography with proper hierarchy
- **Buttons**: Bold, accessible text with hover states

### **Components**
- **Cards**: Elevated shadows, rounded corners, hover animations
- **Buttons**: Gradient backgrounds, smooth transitions
- **Forms**: Clean inputs with sage theme integration
- **Navigation**: Sticky header with backdrop blur

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm/yarn/pnpm

### **Installation**

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd teekart-ecommerce
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### **Environment Variables**
\`\`\`env
# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Admin Configuration  
ADMIN_EMAIL="admin@teekart.com"
NEXT_PUBLIC_ADMIN_EMAIL="admin@teekart.com"

# Payment Integration (Future)
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Database (Future)
DATABASE_URL="your_database_url_here"
\`\`\`

## 📱 Features Overview

### **Homepage**
- **Hero Section**: Animated gradient background with product showcase
- **Categories**: Boys & Girls collections with hover effects
- **Featured Products**: Curated product grid with animations
- **Trending Products**: Popular items with special badges
- **Newsletter**: Subscription form with sage theme

### **Product Pages**
- **Product Listing**: Grid/list view with advanced filtering
- **Product Details**: Image gallery, size/color selection, reviews
- **Quick Actions**: Add to cart, wishlist, share functionality
- **Related Products**: Intelligent product recommendations

### **Shopping Experience**
- **Cart Management**: Add, remove, update quantities
- **Promo Codes**: Discount validation and application
- **Wishlist**: Save and manage favorite products
- **Responsive Design**: Seamless mobile experience

## 🎯 Demo Credentials

### **User Account**
- **Email**: `john@example.com`
- **Password**: `password123`

### **Admin Account**
- **Email**: `admin@teekart.com`
- **Password**: `password123`

### **Promo Codes**
- `WELCOME10` - 10% off (min ₹500)
- `FREESHIP` - Free shipping (min ₹1000)
- `SAVE20` - 20% off (min ₹1500)

## 🛠️ Development

### **Code Quality**
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance

### **Performance**
- **Next.js Image**: Optimized image loading and sizing
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Efficient data caching with TanStack Query
- **Bundle Analysis**: Webpack bundle analyzer integration

### **Testing** (Future Implementation)
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright for end-to-end testing
- **Component Tests**: Storybook for component documentation

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

### **Other Platforms**
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🔮 Future Enhancements

### **Phase 1 - Core Features**
- [ ] User authentication with NextAuth.js
- [ ] Order management system
- [ ] Payment integration (Razorpay)
- [ ] Admin dashboard

### **Phase 2 - Advanced Features**
- [ ] Product reviews and ratings
- [ ] Advanced search with Algolia
- [ ] Email notifications
- [ ] Inventory management

### **Phase 3 - Enterprise Features**
- [ ] Multi-vendor support
- [ ] Analytics dashboard
- [ ] A/B testing framework
- [ ] Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Shadcn** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library
- **Vercel** - Deployment platform

## 📞 Support

For support, email support@teekart.com or join our Slack channel.

---

**Built with ❤️ using Next.js 14 and the power of modern web technologies.**
