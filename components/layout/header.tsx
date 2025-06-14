"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"

// Simple mock auth hook
function useAuth() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)

  const signIn = (email: string) => {
    if (email === "admin@teekart.com") {
      setUser({ name: "Admin User", email, role: "admin" })
    } else {
      setUser({ name: "John Doe", email, role: "user" })
    }
  }

  const signOut = () => setUser(null)

  return { user, signIn, signOut }
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const wishlistItems = useWishlistStore((state) => state.items.length)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sage-light/30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 rounded-full bg-sage-medium flex items-center justify-center group-hover:bg-sage-dark transition-colors duration-300">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl text-sage-dark group-hover:text-sage-medium transition-colors duration-300">
              TeeKart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/products"
              className="text-sm font-medium text-sage-dark hover:text-sage-medium transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/products?category=boys"
              className="text-sm font-medium text-sage-dark hover:text-sage-medium transition-colors"
            >
              Boys
            </Link>
            <Link
              href="/products?category=girls"
              className="text-sm font-medium text-sage-dark hover:text-sage-medium transition-colors"
            >
              Girls
            </Link>
            <Link
              href="/products?featured=true"
              className="text-sm font-medium text-sage-dark hover:text-sage-medium transition-colors"
            >
              Featured
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-dark/50 h-4 w-4" />
              <Input placeholder="Search products..." className="pl-10 border-sage-light/50 focus:border-sage-medium" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-sage-dark hover:text-sage-medium hover:bg-sage-cream/50"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-sage-medium text-white">
                    {wishlistItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-sage-dark hover:text-sage-medium hover:bg-sage-cream/50"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-sage-medium text-white">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-sage-dark hover:text-sage-medium hover:bg-sage-cream/50"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-sage-light/50">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sage-dark hover:text-sage-medium hover:bg-sage-cream/50"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-sage-dark hover:text-sage-medium"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-sage-light/30 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-dark/50 h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10 border-sage-light/50" />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/products"
                  className="text-sm font-medium text-sage-dark hover:text-sage-medium transition-colors py-2"
                >
                  All Products
                </Link>
                <Link
                  href="/products?category=boys"
                  className="text-sm font-medium text-sage-dark hover:text-sage-medium transition-colors py-2"
                >
                  Boys
                </Link>
                <Link
                  href="/products?category=girls"
                  className="text-sm font-medium text-sage-dark hover:text-sage-medium transition-colors py-2"
                >
                  Girls
                </Link>
                <Link
                  href="/products?featured=true"
                  className="text-sm font-medium text-sage-dark hover:text-sage-medium transition-colors py-2"
                >
                  Featured
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
