"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cart-store"
import { formatPrice } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 1000 ? 0 : 100
  const total = subtotal + shipping - discount

  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code")
      return
    }

    setIsApplyingPromo(true)
    try {
      const response = await fetch("/api/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode, amount: subtotal }),
      })

      const data = await response.json()

      if (data.success) {
        setDiscount(data.data.discount)
        toast.success(`Promo code applied! You saved ${formatPrice(data.data.discount)}`)
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error("Failed to apply promo code")
    } finally {
      setIsApplyingPromo(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors">{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      Size: {item.size} • Color: {item.color}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Link href="/products">
              <Button variant="ghost">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                  <Button variant="outline" onClick={applyPromoCode} disabled={isApplyingPromo}>
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Try: WELCOME10, FREESHIP, SAVE20</p>
              </div>

              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>

              {subtotal < 1000 && (
                <p className="text-sm text-muted-foreground text-center">
                  Add {formatPrice(1000 - subtotal)} more for free shipping
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
