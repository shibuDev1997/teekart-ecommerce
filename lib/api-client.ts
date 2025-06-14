// Centralized API client for making HTTP requests

import type { ApiResponse, PaginatedResponse, Product } from "@/types"

class APIClient {
  private baseURL: string

  constructor(baseURL = "/api") {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Product endpoints
  async getProducts(params?: Record<string, string | number>): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request<PaginatedResponse<Product>>(`/products${query ? `?${query}` : ""}`)
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request<ApiResponse<Product>>(`/products/${id}`)
  }

  // Promo code endpoints
  async validatePromoCode(code: string, amount: number): Promise<ApiResponse<{ discount: number; code: string }>> {
    return this.request<ApiResponse<{ discount: number; code: string }>>("/promo-codes", {
      method: "POST",
      body: JSON.stringify({ code, amount }),
    })
  }

  // Future endpoints can be added here
  // async createOrder(orderData: CreateOrderInput): Promise<ApiResponse<Order>>
  // async getOrders(userId: string): Promise<PaginatedResponse<Order>>
  // async updateProduct(id: string, data: Partial<Product>): Promise<ApiResponse<Product>>
}

export const apiClient = new APIClient()
