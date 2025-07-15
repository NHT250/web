"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ShoppingCart, Star, Clock, Gift, Percent, Zap, Package } from "lucide-react"

interface PromotionPageProps {
  onBack: () => void
  onAddToCart: (bookId: number) => void
  formatPrice: (price: number) => string
  onViewProduct: (book: any) => void
}

const flashSaleBooks = [
  {
    id: 1,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 59000,
    originalPrice: 120000,
    rating: 4.8,
    reviews: 1250,
    image: "/placeholder.svg?height=300&width=200",
    discount: 51,
    timeLeft: 3600, // seconds
    stock: 15,
    sold: 85,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 99000,
    originalPrice: 180000,
    rating: 4.7,
    reviews: 2100,
    image: "/placeholder.svg?height=300&width=200",
    discount: 45,
    timeLeft: 7200,
    stock: 8,
    sold: 92,
  },
]

const discountBooks = [
  {
    id: 3,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 156000,
    originalPrice: 195000,
    rating: 4.9,
    reviews: 890,
    image: "/placeholder.svg?height=300&width=200",
    discount: 20,
  },
  {
    id: 4,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 67000,
    originalPrice: 85000,
    rating: 4.6,
    reviews: 1800,
    image: "/placeholder.svg?height=300&width=200",
    discount: 21,
  },
]

const comboDeals = [
  {
    id: 1,
    title: "Combo Kỹ Năng Sống (3 cuốn)",
    books: ["Đắc Nhân Tâm", "7 Thói Quen Hiệu Quả", "Tư Duy Nhanh Và Chậm"],
    price: 299000,
    originalPrice: 450000,
    image: "/placeholder.svg?height=300&width=200",
    discount: 34,
    gift: "Bookmark cao cấp",
  },
  {
    id: 2,
    title: "Combo Văn Học Kinh Điển (5 cuốn)",
    books: ["Nhà Giả Kim", "Hoàng Tử Bé", "Cô Gái Đến Từ Hôm Qua", "Mắt Biếc", "Số Đỏ"],
    price: 399000,
    originalPrice: 550000,
    image: "/placeholder.svg?height=300&width=200",
    discount: 27,
    gift: "Túi canvas BookStore",
  },
]

export default function PromotionPage({ onBack, onAddToCart, formatPrice, onViewProduct }: PromotionPageProps) {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = { ...prev }
        flashSaleBooks.forEach((book) => {
          if (newTimeLeft[book.id] > 0) {
            newTimeLeft[book.id] = (newTimeLeft[book.id] || book.timeLeft) - 1
          }
        })
        return newTimeLeft
      })
    }, 1000)

    // Initialize timeLeft
    const initialTimeLeft: { [key: number]: number } = {}
    flashSaleBooks.forEach((book) => {
      initialTimeLeft[book.id] = book.timeLeft
    })
    setTimeLeft(initialTimeLeft)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
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
            <Percent className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Khuyến Mãi</h1>
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
          <span className="text-foreground">Khuyến mãi</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-yellow-300" />
              <h2 className="text-3xl font-bold">SIÊU SALE CUỐI THÁNG</h2>
              <Zap className="h-8 w-8 text-yellow-300" />
            </div>
            <p className="text-xl mb-4">Giảm giá lên đến 70% - Miễn phí ship toàn quốc</p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Thời gian có hạn</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                <span>Quà tặng hấp dẫn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promotion Tabs */}
        <Tabs defaultValue="flash-sale" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="flash-sale" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Flash Sale
            </TabsTrigger>
            <TabsTrigger value="discount" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Giảm Giá
            </TabsTrigger>
            <TabsTrigger value="combo" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Combo Deal
            </TabsTrigger>
            <TabsTrigger value="gift" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Tặng Kèm
            </TabsTrigger>
          </TabsList>

          {/* Flash Sale */}
          <TabsContent value="flash-sale" className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                Flash Sale - Giá Sốc Trong Thời Gian Có Hạn
              </h3>
              <p className="text-muted-foreground">Nhanh tay kẻo hết hàng!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {flashSaleBooks.map((book) => (
                <Card
                  key={book.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-red-200"
                >
                  <div className="relative">
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                      <Zap className="h-3 w-3 mr-1" />
                      FLASH SALE
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-black font-bold">
                      -{book.discount}%
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle
                      className="text-lg line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onViewProduct(book)}
                    >
                      {book.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{book.author}</CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2">
                    {/* Countdown Timer */}
                    <div className="bg-red-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-600">Kết thúc sau:</span>
                        <div className="flex items-center gap-1 text-red-600 font-mono font-bold">
                          <Clock className="h-4 w-4" />
                          {formatTime(timeLeft[book.id] || 0)}
                        </div>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(book.sold / (book.sold + book.stock)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-red-600 mt-1">
                        <span>Đã bán: {book.sold}</span>
                        <span>Còn lại: {book.stock}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{book.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({book.reviews} đánh giá)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-600">{formatPrice(book.price)}</span>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(book.originalPrice)}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => onAddToCart(book.id)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Mua Ngay - Flash Sale
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Regular Discount */}
          <TabsContent value="discount" className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Percent className="h-6 w-6 text-green-500" />
                Sách Giảm Giá
              </h3>
              <p className="text-muted-foreground">Những cuốn sách được giảm giá đặc biệt</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {discountBooks.map((book) => (
                <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">-{book.discount}%</Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle
                      className="text-lg line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onViewProduct(book)}
                    >
                      {book.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{book.author}</CardDescription>
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
                      Thêm vào giỏ
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Combo Deals */}
          <TabsContent value="combo" className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Package className="h-6 w-6 text-blue-500" />
                Combo Tiết Kiệm
              </h3>
              <p className="text-muted-foreground">Mua nhiều tiết kiệm hơn</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {comboDeals.map((combo) => (
                <Card
                  key={combo.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-blue-200"
                >
                  <div className="relative">
                    <img
                      src={combo.image || "/placeholder.svg"}
                      alt={combo.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
                      <Package className="h-3 w-3 mr-1" />
                      COMBO
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white font-bold">
                      -{combo.discount}%
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{combo.title}</CardTitle>
                    <CardDescription className="text-sm">
                      <div className="space-y-1">
                        {combo.books.map((book, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{book}</span>
                          </div>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-blue-600">
                        <Gift className="h-4 w-4" />
                        <span className="text-sm font-medium">Tặng kèm: {combo.gift}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{formatPrice(combo.price)}</span>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(combo.originalPrice)}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Tiết kiệm: {formatPrice(combo.originalPrice - combo.price)}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => onAddToCart(combo.id)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Mua Combo Ngay
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gift Section */}
          <TabsContent value="gift" className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Gift className="h-6 w-6 text-purple-500" />
                Quà Tặng Kèm
              </h3>
              <p className="text-muted-foreground">Mua sách nhận quà hấp dẫn</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6 border-2 border-purple-200">
                <Gift className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Đơn từ 200k</h4>
                <p className="text-sm text-muted-foreground mb-4">Tặng bookmark cao cấp</p>
                <Badge className="bg-purple-100 text-purple-600">Miễn phí</Badge>
              </Card>

              <Card className="text-center p-6 border-2 border-purple-200">
                <Gift className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Đơn từ 500k</h4>
                <p className="text-sm text-muted-foreground mb-4">Tặng túi canvas BookStore</p>
                <Badge className="bg-purple-100 text-purple-600">Miễn phí</Badge>
              </Card>

              <Card className="text-center p-6 border-2 border-purple-200">
                <Gift className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Đơn từ 1tr</h4>
                <p className="text-sm text-muted-foreground mb-4">Tặng bộ sưu tập postcard</p>
                <Badge className="bg-purple-100 text-purple-600">Miễn phí</Badge>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
