"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ShoppingCart, Star, TrendingUp, Crown, FlameIcon as Fire } from "lucide-react"

interface BestsellerPageProps {
  onBack: () => void
  onAddToCart: (bookId: number) => void
  formatPrice: (price: number) => string
  onViewProduct: (book: any) => void
}

const bestsellerBooks = [
  {
    id: 1,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 89000,
    originalPrice: 120000,
    rating: 4.8,
    reviews: 1250,
    image: "/placeholder.svg?height=300&width=200",
    category: "Tâm Lý - Kỹ Năng Sống",
    rank: 1,
    soldCount: 15420,
    isHot: true,
  },
  {
    id: 2,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 156000,
    originalPrice: 195000,
    rating: 4.9,
    reviews: 890,
    image: "/placeholder.svg?height=300&width=200",
    category: "Tiểu Sử - Hồi Ký",
    rank: 2,
    soldCount: 12350,
    isHot: true,
  },
  {
    id: 3,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 67000,
    originalPrice: 85000,
    rating: 4.6,
    reviews: 1800,
    image: "/placeholder.svg?height=300&width=200",
    category: "Văn học",
    rank: 3,
    soldCount: 11200,
    isHot: true,
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    price: 142000,
    originalPrice: 180000,
    rating: 4.7,
    reviews: 2100,
    image: "/placeholder.svg?height=300&width=200",
    category: "Tâm Lý - Kỹ Năng Sống",
    rank: 4,
    soldCount: 9800,
    isHot: false,
  },
  {
    id: 5,
    title: "Tư Duy Nhanh Và Chậm",
    author: "Daniel Kahneman",
    price: 168000,
    originalPrice: 210000,
    rating: 4.7,
    reviews: 750,
    image: "/placeholder.svg?height=300&width=200",
    category: "Tâm Lý - Kỹ Năng Sống",
    rank: 5,
    soldCount: 8900,
    isHot: false,
  },
  {
    id: 6,
    title: "7 Thói Quen Hiệu Quả",
    author: "Stephen Covey",
    price: 134000,
    originalPrice: 165000,
    rating: 4.8,
    reviews: 1100,
    image: "/placeholder.svg?height=300&width=200",
    category: "Tâm Lý - Kỹ Năng Sống",
    rank: 6,
    soldCount: 8200,
    isHot: false,
  },
]

export default function BestsellerPage({ onBack, onAddToCart, formatPrice, onViewProduct }: BestsellerPageProps) {
  const [timeFilter, setTimeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Crown className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Crown className="h-5 w-5 text-amber-600" />
    return <span className="text-lg font-bold text-primary">#{rank}</span>
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
    if (rank <= 10) return "bg-primary text-white"
    return "bg-secondary text-secondary-foreground"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-sm">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Bestseller</h1>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={onBack} className="hover:text-primary">
            Trang chủ
          </button>
          <span>/</span>
          <span className="text-foreground">Bestseller</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Fire className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-gray-900">Sách Bán Chạy Nhất</h2>
              <Fire className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xl text-gray-600 mb-4">Những cuốn sách được độc giả yêu thích và mua nhiều nhất</p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Cập nhật hàng ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                <span>Top sách bán chạy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả thời gian</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="year">Năm này</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              <SelectItem value="van-hoc">Văn học</SelectItem>
              <SelectItem value="tam-ly">Tâm Lý - Kỹ Năng Sống</SelectItem>
              <SelectItem value="tieu-su">Tiểu Sử - Hồi Ký</SelectItem>
              <SelectItem value="kinh-te">Kinh Tế</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Top 3 Highlight */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {bestsellerBooks.slice(0, 3).map((book) => (
            <Card
              key={book.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/20"
            >
              <div className="relative">
                <img
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute top-2 left-2 px-3 py-1 rounded-full flex items-center gap-1 ${getRankBadgeColor(book.rank)}`}
                >
                  {getRankIcon(book.rank)}
                  <span className="font-bold">TOP {book.rank}</span>
                </div>
                {book.isHot && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white animate-pulse">
                    <Fire className="h-3 w-3 mr-1" />
                    HOT
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit text-xs mb-2">
                  {book.category}
                </Badge>
                <CardTitle
                  className="text-lg line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => onViewProduct(book)}
                >
                  {book.title}
                </CardTitle>
                <CardDescription className="text-sm">{book.author}</CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{book.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({book.reviews} đánh giá)</span>
                </div>

                <div className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium text-primary">{book.soldCount.toLocaleString()}</span> đã bán
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">{formatPrice(book.price)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(book.originalPrice)}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button className="w-full" onClick={() => onAddToCart(book.id)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Thêm vào giỏ
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Full Bestseller List */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Bảng Xếp Hạng Đầy Đủ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestsellerBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="flex">
                  <div className="relative w-24 flex-shrink-0">
                    <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-32 object-cover" />
                    <div
                      className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(book.rank)}`}
                    >
                      <span className="text-xs font-bold">{book.rank}</span>
                    </div>
                  </div>

                  <div className="flex-1 p-4">
                    <Badge variant="secondary" className="text-xs mb-1">
                      {book.category}
                    </Badge>
                    <h4
                      className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors cursor-pointer mb-1"
                      onClick={() => onViewProduct(book)}
                    >
                      {book.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">{book.author}</p>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{book.rating}</span>
                      <span className="text-xs text-muted-foreground">({book.reviews})</span>
                    </div>

                    <div className="text-xs text-muted-foreground mb-2">
                      <span className="font-medium text-primary">{book.soldCount.toLocaleString()}</span> đã bán
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-sm font-bold text-primary">{formatPrice(book.price)}</span>
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(book.originalPrice)}
                      </span>
                    </div>

                    <Button size="sm" className="w-full text-xs" onClick={() => onAddToCart(book.id)}>
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
