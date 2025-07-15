"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Filter, Grid, List, Search, ShoppingCart, Star, Heart } from "lucide-react"
import { useTranslations } from "next-intl"

interface CategoryPageProps {
  category: any
  onBack: () => void
  onAddToCart: (bookId: number) => void
  formatPrice: (price: number) => string
  onViewProduct: (book: any) => void
  allCategories: any[] // Thêm prop mới
}

const categoryBooks = [
  {
    id: 1,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 89000,
    originalPrice: 120000,
    rating: 4.8,
    reviews: 1250,
    image: "/placeholder.svg?height=300&width=200",
    subcategory: "Kỹ Năng Sống",
    bestseller: true,
    isNew: false,
    publisher: "NXB Trẻ",
    year: 2023,
  },
  {
    id: 2,
    title: "Tâm Lý Học Tích Cực",
    author: "Martin Seligman",
    price: 156000,
    originalPrice: 195000,
    rating: 4.6,
    reviews: 890,
    image: "/placeholder.svg?height=300&width=200",
    subcategory: "Tâm Lý",
    bestseller: false,
    isNew: true,
    publisher: "NXB Thế Giới",
    year: 2024,
  },
  {
    id: 3,
    title: "Nghệ Thuật Giao Tiếp",
    author: "Leil Lowndes",
    price: 142000,
    originalPrice: 180000,
    rating: 4.7,
    reviews: 650,
    image: "/placeholder.svg?height=300&width=200",
    subcategory: "Kỹ Năng Sống",
    bestseller: true,
    isNew: false,
    publisher: "NXB Lao Động",
    year: 2023,
  },
  {
    id: 4,
    title: "Tư Duy Phản Biện",
    author: "Richard Paul",
    price: 98000,
    originalPrice: 125000,
    rating: 4.5,
    reviews: 420,
    image: "/placeholder.svg?height=300&width=200",
    subcategory: "Rèn Luyện Nhân Cách",
    bestseller: false,
    isNew: true,
    publisher: "NXB Tri Thức",
    year: 2024,
  },
  {
    id: 5,
    title: "Sách Cho Tuổi 20",
    author: "Nguyễn Văn A",
    price: 67000,
    originalPrice: 85000,
    rating: 4.3,
    reviews: 320,
    image: "/placeholder.svg?height=300&width=200",
    subcategory: "Sách Cho Tuổi Mới Lớn",
    bestseller: false,
    isNew: false,
    publisher: "NXB Kim Đồng",
    year: 2023,
  },
  {
    id: 6,
    title: "Tâm Lý Học Đám Đông",
    author: "Gustave Le Bon",
    price: 134000,
    originalPrice: 165000,
    rating: 4.9,
    reviews: 780,
    image: "/placeholder.svg?height=300&width=200",
    subcategory: "Tâm Lý",
    bestseller: true,
    isNew: false,
    publisher: "NXB Hội Nhà Văn",
    year: 2023,
  },
]

export default function CategoryPage({
  category,
  onBack,
  onAddToCart,
  formatPrice,
  onViewProduct,
  allCategories,
}: CategoryPageProps) {
  const t = useTranslations("CategoryPage") // Khởi tạo hook dịch thuật
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 500000]) // Giá trị mặc định ban đầu
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Trích xuất tất cả các danh mục con duy nhất từ allCategories
  const allUniqueSubcategories = Array.from(new Set(allCategories.flatMap((cat) => cat.subcategories))).sort()

  const filteredBooks = categoryBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]
    const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(book.subcategory)

    return matchesSearch && matchesPrice && matchesSubcategory
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.year - a.year
      default:
        return b.reviews - a.reviews
    }
  })

  const handleSubcategoryChange = (subcategory: string, checked: boolean) => {
    if (checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategory])
    } else {
      setSelectedSubcategories(selectedSubcategories.filter((s) => s !== subcategory))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-sm">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{category.name}</h1>
        </div>
      </header>

      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={onBack} className="hover:text-primary">
            {t("breadcrumb_home")}
          </button>
          <span>/</span>
          <span className="text-foreground">{t("breadcrumb_category")}</span>
        </nav>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"} space-y-6`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("filters")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("search_books_placeholder")}</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("search_books_placeholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("price_range")}</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000000}
                    step={10000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Subcategories */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("subcategories")}</label>
                  <div className="space-y-2">
                    {allUniqueSubcategories.map((sub: string) => (
                      <div key={sub} className="flex items-center space-x-2">
                        <Checkbox
                          id={sub}
                          checked={selectedSubcategories.includes(sub)}
                          onCheckedChange={(checked) => handleSubcategoryChange(sub, checked as boolean)}
                        />
                        <label htmlFor={sub} className="text-sm">
                          {sub}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  {t("filters")}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {t("show_products", { count: sortedBooks.length })}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={t("sort_by")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">{t("most_popular")}</SelectItem>
                    <SelectItem value="newest">{t("newest")}</SelectItem>
                    <SelectItem value="price-low">{t("price_low_high")}</SelectItem>
                    <SelectItem value="price-high">{t("price_high_low")}</SelectItem>
                    <SelectItem value="rating">{t("highest_rating")}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
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

            {/* Books Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedBooks.map((book) => (
                <Card
                  key={book.id}
                  className={`group hover:shadow-lg transition-all duration-300 ${viewMode === "list" ? "flex" : ""}`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-32 flex-shrink-0" : ""}`}>
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "w-full h-40" : "w-full h-64"
                      }`}
                    />
                    {book.bestseller && (
                      <Badge className="absolute top-2 left-2 bg-primary text-white">{t("bestseller_badge")}</Badge>
                    )}
                    {book.isNew && (
                      <Badge className="absolute top-2 right-2 bg-accent text-black">{t("new_badge")}</Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className={viewMode === "list" ? "flex-1" : ""}>
                    <CardHeader className="pb-2">
                      <Badge variant="secondary" className="w-fit text-xs mb-2">
                        {book.subcategory}
                      </Badge>
                      <CardTitle
                        className="text-lg line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={() => onViewProduct(book)}
                      >
                        {book.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{book.author}</CardDescription>
                      <div className="text-xs text-muted-foreground">
                        {book.publisher} • {book.year}
                      </div>
                    </CardHeader>

                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{book.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({book.reviews} đánh giá)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">{formatPrice(book.price)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(book.originalPrice)}
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-2">
                      <Button className="w-full" onClick={() => onAddToCart(book.id)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t("add_to_cart")}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>

            {sortedBooks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">{t("no_books_found")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
