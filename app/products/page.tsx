"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Grid, List, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product/product-card"
import { ProductFilters } from "@/components/product/product-filters"
import { useProducts } from "@/hooks/use-products"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    featured: searchParams.get("featured") || "",
    trending: searchParams.get("trending") || "",
  })

  const { data, isLoading, error } = useProducts({
    page: currentPage,
    limit: 12,
    sortBy,
    ...filters,
  })

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground">Failed to load products. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of premium t-shirts</p>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <ProductFilters onFiltersChange={handleFiltersChange} activeFilters={filters} />

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {data ? `${data.pagination.total} products` : "Loading..."}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="hidden sm:flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {data?.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {data && data.pagination.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}

                      {data.pagination.totalPages > 5 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage(Math.min(data.pagination.totalPages, currentPage + 1))}
                          className={
                            currentPage === data.pagination.totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
