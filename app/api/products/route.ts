import { type NextRequest, NextResponse } from "next/server"
import { dummyProducts } from "@/lib/dummy-data"
import type { Product, PaginatedResponse } from "@/types"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const sortBy = searchParams.get("sortBy") || "name"
  const featured = searchParams.get("featured")
  const trending = searchParams.get("trending")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  let filteredProducts = [...dummyProducts]

  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  if (featured === "true") {
    filteredProducts = filteredProducts.filter((p) => p.featured)
  }

  if (trending === "true") {
    filteredProducts = filteredProducts.filter((p) => p.trending)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
    )
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= Number.parseInt(minPrice))
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= Number.parseInt(maxPrice))
  }

  // Apply sorting
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "newest":
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    default:
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
  }

  // Pagination
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const response: PaginatedResponse<Product> = {
    data: paginatedProducts,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  }

  return NextResponse.json(response)
}
