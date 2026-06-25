# TeeKart - Enterprise E-Commerce Frontend

An enterprise-grade MNC standard e-commerce frontend project built with **React**, **TypeScript**, **Vite**, **Zustand**, and **TanStack Query (React Query)**.

This project showcases clean modular design, SOLID principles, scalable state management, responsive grids, and Material UI + Tailwind CSS styling suited for Technical Interviews, Portfolio projects, and Production deployments.

---

## Technical Stack

* **Build Tool & Framework**: React.js 18 with Vite and TypeScript (Strict Mode)
* **Client State Management**: Zustand with LocalStorage Session Persistence
* **Server State Management**: TanStack React Query v5 for API caching, pagination, mutations, and query management
* **Styling**: Tailwind CSS combined with Material UI (MUI) components
* **Routing**: React Router DOM (v6) with Protected / Guarded routes
* **Forms & Validation**: React Hook Form with Zod schema resolution
* **API Layer**: Centralized Axios instances with request/response interceptors, latency simulation, and retry logic
* **Icons**: Lucide React & Material Icons

---

## Folder Structure

```text
src/
├── api/            # Axios HTTP client instance, request/response interceptors, and error handlers
├── app/            # Main App component layout and routing configuration
├── assets/         # Project images, custom icons, and static graphics
├── components/     # Shared layout/design system components
│   ├── common/     # Global components: ProtectedRoutes, ErrorBoundaries, LoadingSpinners
│   ├── forms/      # Reusable form components
│   ├── layouts/    # Global layout templates: Header, Footer, Admin Sidebars
│   └── ui/         # Base UI components
├── constants/      # App constants, mock database models
├── features/       # Feature-sliced modules (e.g. Products list, cart drawers, profiles)
├── hooks/          # Shared custom React hooks (useDebounce, useAuth, etc.)
├── pages/          # Primary page views (Home, Catalog, Checkout, Admin Console)
├── providers/      # Global provider registry (QueryClientProvider, MUI ThemeProviders)
├── routes/         # Central routes registry (AppRoutes.tsx)
├── services/       # Mock service layer executing CRUD database actions
├── store/          # Zustand global states (Cart, Wishlist, Authentication, Theme Mode)
├── styles/         # Global Tailwind CSS and brand configuration styles
├── types/          # Global TypeScript interfaces and domain objects
├── validations/    # Zod schemas for form validations
└── main.tsx        # React Application mounting entry point
```

---

## Key Features

1. **Role-Based Routing**: Guarded pages for standard users (`/profile`, `/checkout`) and admins (`/admin`).
2. **Product Catalog**: Supports full-text search, multi-category filters, price sliders, star rating checks, sorting options, and grid/list views.
3. **Comparison Drawer**: Side-by-side comparison matrix for up to 3 chosen products.
4. **Zustand Store**: Cart calculations (subtotal, shipping, 18% GST tax, promo code discount vouchers), wishlist saves, light/dark theme switching, and persistent user sessions.
5. **Admin Console**: Metrics cards (Revenue, orders, customer count), dynamic Recharts graphs, and CRUD tables for products, orders, and users.
6. **API Reliability**: Axios interceptors that auto-retry failed requests and simulate real-world latency.

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) (v10+) installed.

### Installation

1. Clean install all package dependencies:
   ```bash
   pnpm install
   ```

2. Run the local development server:
   ```bash
   pnpm dev
   ```
   *The app will open automatically at [http://localhost:3000](http://localhost:3000)*

### Useful CLI Commands

* **Run Dev Server**: `pnpm dev`
* **Build Production Bundle**: `pnpm build`
* **Preview Build Locally**: `pnpm preview`
* **Format Source Code**: `pnpm format`
* **Lint Check**: `pnpm lint`

---

## Deployment Guide

### Vercel / Netlify Deployment

1. Set the build command to:
   ```bash
   pnpm build
   ```
2. Set the publish directory to:
   ```text
   dist
   ```
3. Set the node engine version to `18.x` or `20.x`.
