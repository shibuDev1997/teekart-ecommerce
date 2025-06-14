"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Minus, Plus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProduct } from "@/hooks/use-products"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import { toast } from "sonner"
import { ProductCard } from "@/components/product/product-card"
import { dummyProducts } from "@/lib/dummy-data"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const { data: product, isLoading, error } = useProduct(params.id)
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-muted rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-12 bg-muted rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0
  const relatedProducts = dummyProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size")
      return
    }
    if (!selectedColor) {
      toast.error("Please select a color")
      return
    }

    addToCart(product, selectedSize, selectedColor, quantity)
    toast.success("Added to cart")
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {discount > 0 && (
              <Badge className="absolute top-4 left-4" variant="destructive">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImageIndex === index ? "border-primary" : "border-muted"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.featured && <Badge>Featured</Badge>}
              {product.trending && <Badge variant="secondary">Trending</Badge>}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.0) • 128 reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="w-12 h-12"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-primary" : "border-muted"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
            {selectedColor && <p className="text-sm text-muted-foreground mt-2">Selected: {selectedColor}</p>}
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1" size="lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button variant={inWishlist ? "default" : "outline"} size="lg" onClick={handleWishlistToggle}>
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm">{product.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <Separator className="my-4" />
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Premium cotton blend fabric</li>
                  <li>Comfortable regular fit</li>
                  <li>Pre-shrunk for lasting fit</li>
                  <li>Machine washable</li>
                  <li>Durable construction</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Material</h4>
                  <p className="text-sm text-muted-foreground">60% Cotton, 40% Polyester</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Care Instructions</h4>
                  <p className="text-sm text-muted-foreground">Machine wash cold, tumble dry low</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Available Sizes</h4>
                  <p className="text-sm text-muted-foreground">{product.sizes.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Available Colors</h4>
                  <p className="text-sm text-muted-foreground">{product.colors.join(", ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h4 className="font-semibold mb-2">No reviews yet</h4>
                <p className="text-sm text-muted-foreground">Be the first to review this product</p>
                <Button className="mt-4">Write a Review</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
