import { type NextRequest, NextResponse } from "next/server"
import { dummyPromoCodes } from "@/lib/dummy-data"
import type { ApiResponse } from "@/types"

export async function POST(request: NextRequest) {
  const { code, amount } = await request.json()

  const promoCode = dummyPromoCodes.find((p) => p.code === code && p.active)

  if (!promoCode) {
    return NextResponse.json({ success: false, error: "Invalid promo code" }, { status: 400 })
  }

  if (promoCode.minAmount && amount < promoCode.minAmount) {
    return NextResponse.json(
      { success: false, error: `Minimum order amount is ₹${promoCode.minAmount}` },
      { status: 400 },
    )
  }

  let discount = 0
  if (promoCode.type === "percentage") {
    discount = (amount * promoCode.discount) / 100
    if (promoCode.maxDiscount) {
      discount = Math.min(discount, promoCode.maxDiscount)
    }
  } else {
    discount = promoCode.discount
  }

  const response: ApiResponse<{ discount: number; code: string }> = {
    success: true,
    data: { discount, code: promoCode.code },
  }

  return NextResponse.json(response)
}
