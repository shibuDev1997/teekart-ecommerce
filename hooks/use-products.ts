import { useQuery } from "@tanstack/react-query"
import type { Product, PaginatedResponse } from "@/types"

interface UseProductsParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: string
  minPrice?: number
  maxPrice?: number
}

export function useProducts(params: UseProductsParams = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const searchParams = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          searchParams.append(key, value.toString())
        }
      })

      const response = await fetch(`/api/products?${searchParams}`)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      return response.json()
    },
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product> => {
      const response = await fetch(`/api/products/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch product")
      }

      const data = await response.json()
      return data.data
    },
    enabled: !!id,
  })
}
