"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface ProductFiltersProps {
  onFiltersChange: (filters: any) => void
  activeFilters: any
}

export function ProductFilters({ onFiltersChange, activeFilters }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 2000])

  const categories = [
    { id: "boys", label: "Boys" },
    { id: "girls", label: "Girls" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL"]
  const colors = ["Black", "White", "Red", "Blue", "Green", "Pink", "Purple", "Gray"]

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({ ...activeFilters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
    setPriceRange([0, 2000])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={activeFilters.category === category.id}
                onCheckedChange={(checked) => handleFilterChange("category", checked ? category.id : "")}
              />
              <Label htmlFor={category.id} className="text-sm">
                {category.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={50} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={activeFilters.sizes?.includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const currentSizes = activeFilters.sizes || []
                  const newSizes = currentSizes.includes(size)
                    ? currentSizes.filter((s: string) => s !== size)
                    : [...currentSizes, size]
                  handleFilterChange("sizes", newSizes)
                }}
              >
                {size}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeFilters.colors?.includes(color) ? "border-primary" : "border-muted"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => {
                  const currentColors = activeFilters.colors || []
                  const newColors = currentColors.includes(color)
                    ? currentColors.filter((c: string) => c !== color)
                    : [...currentColors, color]
                  handleFilterChange("colors", newColors)
                }}
                title={color}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        <X className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          {Object.keys(activeFilters).length > 0 && (
            <Badge variant="secondary">{Object.keys(activeFilters).length}</Badge>
          )}
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {Object.keys(activeFilters).length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {Object.keys(activeFilters).length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter products by category, price, size, and color.</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
