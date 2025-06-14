"use client"

import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { useWishlistStore } from "@/store/wishlist-store"

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">Save items you love to your wishlist and shop them later.</p>
          <Link href="/products">
            <Button size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">{items.length} items saved</p>
        </div>
        <Button variant="outline" onClick={clearWishlist}>
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
