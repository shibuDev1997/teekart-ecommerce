import { type NextRequest, NextResponse } from "next/server"
import { dummyProducts } from "@/lib/dummy-data"
import type { ApiResponse } from "@/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const product = dummyProducts.find((p) => p.id === params.id)

  if (!product) {
    return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
  }

  const response: ApiResponse<typeof product> = {
    success: true,
    data: product,
  }

  return NextResponse.json(response)
}
