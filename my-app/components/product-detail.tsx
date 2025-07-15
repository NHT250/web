"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input" // Import Input
import { Textarea } from "@/components/ui/textarea" // Import Textarea
import { Label } from "@/components/ui/label" // Import Label
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  BookOpen,
  User,
} from "lucide-react"
import { useTranslations } from "next-intl" // Import useTranslations

interface ProductDetailProps {
  book: any
  onBack: () => void
  onAddToCart: (bookId: number) => void
  formatPrice: (price: number) => string
}

interface Review {
  id: number
  user: string
  rating: number
  date: string
  comment: string
}

const relatedBooks = [
  {
    id: 5,
    title: "Tư Duy Nhanh Và Chậm",
    author: "Daniel Kahneman",
    price: 168000,
    originalPrice: 210000,
    image: "/placeholder.svg?height=200&width=150",
    rating: 4.7,
  },
  {
    id: 6,
    title: "7 Thói Quen Hiệu Quả",
    author: "Stephen Covey",
    price: 134000,
    originalPrice: 165000,
    image: "/placeholder.svg?height=200&width=150",
    rating: 4.8,
  },
  {
    id: 7,
    title: "Mindset - Tâm Lý Học Thành Công",
    author: "Carol Dweck",
    price: 145000,
    originalPrice: 180000,
    image: "/placeholder.svg?height=200&width=150",
    rating: 4.6,
  },
]

const initialReviews: Review[] = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    date: "15/12/2024",
    comment: "Cuốn sách rất hay, nội dung thiết thực và dễ hiểu. Đóng gói cẩn thận, giao hàng nhanh.",
  },
  {
    id: 2,
    user: "Trần Thị B",
    rating: 4,
    date: "10/12/2024",
    comment: "Chất lượng sách tốt, nội dung bổ ích. Sẽ mua thêm những cuốn khác.",
  },
  {
    id: 3,
    user: "Lê Minh C",
    rating: 5,
    date: "08/12/2024",
    comment: "Đọc xong cảm thấy có nhiều insight mới. Recommend cho mọi người!",
  },
]

export default function ProductDetail({ book, onBack, onAddToCart, formatPrice }: ProductDetailProps) {
  const t = useTranslations("ProductDetail") // Initialize useTranslations
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState("description")
  const [isFavorite, setIsFavorite] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(initialReviews) // State for reviews
  const [reviewForm, setReviewForm] = useState({
    userName: "",
    userRating: 0,
    userComment: "",
  })
  const [reviewMessage, setReviewMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(book.id)
    }
  }

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)

  const handleReviewFormChange = (field: string, value: string | number) => {
    setReviewForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setReviewMessage(null)

    const { userName, userRating, userComment } = reviewForm

    if (!userName || userRating === 0 || !userComment) {
      setReviewMessage({ type: "error", text: t("review_error") })
      return
    }

    if (userComment.length < 10) {
      setReviewMessage({ type: "error", text: t("review_min_length_error") })
      return
    }

    const newReview: Review = {
      id: reviews.length + 1,
      user: userName,
      rating: userRating,
      date: new Date().toLocaleDateString("vi-VN"), // Format date as DD/MM/YYYY
      comment: userComment,
    }

    setReviews((prev) => [...prev, newReview])
    setReviewMessage({ type: "success", text: t("review_success") })
    setReviewForm({ userName: "", userRating: 0, userComment: "" }) // Clear form
    setTimeout(() => setReviewMessage(null), 3000) // Clear message after 3 seconds
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold">BookStore</span>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={onBack} className="hover:text-red-600">
            {t("breadcrumb_home")}
          </button>
          <span>/</span>
          <span>{t("breadcrumb_category")}</span>
          <span>/</span>
          <span className="text-foreground">{book.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-muted rounded border-2 border-transparent hover:border-primary cursor-pointer"
                >
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={`${book.title} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {book.category}
              </Badge>
              {book.bestseller && <Badge className="ml-2 bg-red-500">Bestseller</Badge>}
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {t("author")}: {book.author}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="font-medium ml-2">{book.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  {t("reviews_count", { count: book.reviews || reviews.length })}
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">{formatPrice(book.price)}</span>
                <span className="text-xl text-muted-foreground line-through">{formatPrice(book.originalPrice)}</span>
                <Badge variant="destructive">{t("discount_badge", { discount: discount })}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("save")}: {formatPrice(book.originalPrice - book.price)}
              </p>
            </div>

            <Separator />

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">{t("quantity")}:</span>
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t("add_to_cart")}
                </Button>
                <Button size="lg" variant="outline">
                  {t("buy_now")}
                </Button>
                <Button size="lg" variant="outline" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-600 text-red-600" : ""}`} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Truck className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-sm">{t("free_shipping_title")}</p>
                  <p className="text-xs text-muted-foreground">{t("free_shipping_description")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Shield className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-sm">{t("quality_assurance_title")}</p>
                  <p className="text-xs text-muted-foreground">{t("quality_assurance_description")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <RotateCcw className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-sm">{t("easy_returns_title")}</p>
                  <p className="text-xs text-muted-foreground">{t("easy_returns_description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">{t("product_description")}</TabsTrigger>
            <TabsTrigger value="specifications">{t("specifications")}</TabsTrigger>
            <TabsTrigger value="reviews">{t("reviews", { count: reviews.length })}</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{t("book_introduction")}</h3>
                <div className="prose max-w-none">
                  <p className="mb-4">
                    "{book.title}" là một trong những cuốn sách kinh điển và có tầm ảnh hưởng lớn nhất trong lĩnh vực
                    phát triển bản thân. Cuốn sách này đã thay đổi cuộc sống của hàng triệu người trên toàn thế giới.
                  </p>
                  <p className="mb-4">
                    Tác giả {book.author} đã tổng hợp những kinh nghiệm quý báu và phương pháp thực tế để giúp độc giả:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Phát triển kỹ năng giao tiếp hiệu quả</li>
                    <li>Xây dựng mối quan hệ tích cực với mọi người</li>
                    <li>Tăng cường sự tự tin và lòng can đảm</li>
                    <li>Đạt được thành công trong công việc và cuộc sống</li>
                  </ul>
                  <p>
                    Đây là cuốn sách không thể thiếu trong thư viện của bất kỳ ai muốn phát triển bản thân và đạt được
                    thành công.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{t("detailed_info")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("author")}:</span>
                      <span className="font-medium">{book.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("breadcrumb_category")}:</span>
                      <span className="font-medium">{book.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("publisher")}:</span>
                      <span className="font-medium">NXB Trẻ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("publication_year")}:</span>
                      <span className="font-medium">2024</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("pages")}:</span>
                      <span className="font-medium">320 trang</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("dimensions")}:</span>
                      <span className="font-medium">14 x 20.5 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("weight")}:</span>
                      <span className="font-medium">400g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("cover_type")}:</span>
                      <span className="font-medium">Bìa mềm</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">{t("customer_reviews")}</h3>
                </div>

                {/* Review Form */}
                <div className="mb-8 border-b pb-6">
                  <h4 className="text-lg font-semibold mb-4">{t("your_review")}</h4>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <Label htmlFor="reviewer-name">{t("your_name")}</Label>
                      <Input
                        id="reviewer-name"
                        value={reviewForm.userName}
                        onChange={(e) => handleReviewFormChange("userName", e.target.value)}
                        placeholder={t("your_name")}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="review-rating">{t("your_rating")}</Label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 cursor-pointer ${
                              star <= reviewForm.userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                            onClick={() => handleReviewFormChange("userRating", star)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review-comment">{t("your_comment")}</Label>
                      <Textarea
                        id="review-comment"
                        value={reviewForm.userComment}
                        onChange={(e) => handleReviewFormChange("userComment", e.target.value)}
                        placeholder={t("your_comment")}
                        rows={4}
                        required
                      />
                    </div>
                    {reviewMessage && (
                      <p className={`text-sm ${reviewMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>
                        {reviewMessage.text}
                      </p>
                    )}
                    <Button type="submit">{t("submit_review")}</Button>
                  </form>
                </div>

                {/* Existing Reviews */}
                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground">{t("no_book_found")}</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t("related_books")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBooks.map((relatedBook) => (
              <Card key={relatedBook.id} className="group hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={relatedBook.image || "/placeholder.svg"}
                    alt={relatedBook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-2">{relatedBook.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{relatedBook.author}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{relatedBook.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-primary">{formatPrice(relatedBook.price)}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(relatedBook.originalPrice)}
                    </span>
                  </div>
                  <Button size="sm" className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t("add_to_cart")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
