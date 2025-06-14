"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import { useWishlistStore } from "@/store/wishlist-store"
import { useCartStore } from "@/store/cart-store"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)
  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  const handleAddToCart = () => {
    addToCart(product, product.sizes[0], product.colors[0])
    toast.success("Added to cart")
  }

  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0

  // Use actual product images with fallback
  const productImages = ["/images/tshirt-1.jpg", "/images/tshirt-2.jpg", "/images/tshirt-3.jpg", "/images/tshirt-4.jpg"]
  const imageIndex = Number.parseInt(product.id) % productImages.length
  const productImage = productImages[imageIndex] || product.images[0] || "/placeholder.svg"

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-sage-cream/20">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={productImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Overlay */}
        <div className="absolute inset-0 bg-sage-dark/0 group-hover:bg-sage-dark/20 transition-all duration-300"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.featured && (
            <Badge className="bg-sage-light text-sage-dark border-0 shadow-lg animate-pulse">⭐ Featured</Badge>
          )}
          {product.trending && <Badge className="bg-sage-medium text-white border-0 shadow-lg">🔥 Trending</Badge>}
          {discount > 0 && (
            <Badge className="bg-sage-dark text-sage-cream border-0 shadow-lg font-bold">{discount}% OFF</Badge>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <Button
            size="icon"
            variant={inWishlist ? "default" : "secondary"}
            onClick={handleWishlistToggle}
            className={`h-10 w-10 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
              inWishlist
                ? "bg-sage-medium text-white hover:bg-sage-dark"
                : "bg-white/90 text-sage-dark hover:bg-sage-cream"
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </Button>
          <Link href={`/products/${product.id}`}>
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full shadow-lg bg-white/90 text-sage-dark hover:bg-sage-cream transition-all duration-300 transform hover:scale-110"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-sage-medium hover:bg-sage-dark text-white border-0 shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 text-sage-dark hover:text-sage-medium transition-colors line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-sage-dark group-hover:to-sage-medium">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-sage-light text-sage-light" : "text-gray-300"}`} />
          ))}
          <span className="text-sm text-sage-dark/60 ml-2">(4.0) • 128 reviews</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="font-bold text-2xl bg-gradient-to-r from-sage-dark to-sage-medium bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-sage-dark/50 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border-2 border-sage-light shadow-sm transform hover:scale-125 transition-transform duration-200"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-5 h-5 rounded-full border-2 border-sage-light bg-sage-cream flex items-center justify-center">
                <span className="text-xs font-medium text-sage-dark">+{product.colors.length - 4}</span>
              </div>
            )}
          </div>
          <Badge
            variant="outline"
            className={`font-medium ${
              product.category === "boys"
                ? "border-sage-medium text-sage-medium bg-sage-cream"
                : "border-sage-light text-sage-dark bg-sage-light/30"
            }`}
          >
            {product.category === "boys" ? "👦 Boys" : "👧 Girls"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
