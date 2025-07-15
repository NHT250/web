"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Search,
  Star,
  Heart,
  Menu,
  User,
  BookOpen,
  TrendingUp,
  Award,
  Users,
  Zap,
  Sparkles,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Import các components:
import CategorySection from "@/components/category-section"
import FeaturedSections from "@/components/featured-sections"
import CategoryPage from "@/components/category-page"
import BestsellerPage from "@/components/bestseller-page"
import PromotionPage from "@/components/promotion-page"
import ContactPage from "@/components/contact-page"
import ShoppingCartPage from "@/components/shopping-cart-page"
import AuthForms from "@/components/auth-forms" // Import component đăng nhập/đăng ký mới
import UserAccountPage from "@/components/user-account-page" // Import component trang tài khoản mới
import ProductDetail from "@/components/product-detail" // Import component chi tiết sản phẩm mới

const categories = [
  {
    id: 1,
    name: "Văn học",
    icon: BookOpen,
    count: 1245,
    subcategories: ["Tiểu Thuyết", "Truyện Ngắn - Tản Văn", "Light Novel", "Ngôn Tình"],
  },
  {
    id: 2,
    name: "Kinh Tế",
    icon: TrendingUp,
    count: 689,
    subcategories: [
      "Nhân Vật - Bài Học Kinh Doanh",
      "Quản Trị - Lãnh Đạo",
      "Marketing - Bán Hàng",
      "Phân Tích Kinh Tế",
    ],
  },
  {
    id: 3,
    name: "Sách Thiếu Nhi",
    icon: Users,
    count: 456,
    subcategories: ["Manga - Comic", "Kiến Thức Bách Khoa", "Sách Tranh Kỹ Năng Sống Cho Trẻ", "Vừa Học - Vừa Chơi"],
  },
  {
    id: 4,
    name: "Tâm Lý - Kỹ Năng Sống",
    icon: Award,
    count: 298,
    subcategories: ["Kỹ Năng Sống", "Rèn Luyện Nhân Cách", "Tâm Lý", "Sách Cho Tuổi Mới Lớn"],
  },
  {
    id: 5,
    name: "Tiểu Sử - Hồi Ký",
    icon: Sparkles,
    count: 234,
    subcategories: ["Câu Chuyện Cuộc Đời", "Chính Trị", "Kinh Tế", "Nghệ Thuật - Giải Trí"],
  },
  {
    id: 6,
    name: "Giáo Khoa - Tham Khảo",
    icon: Zap,
    count: 187,
    subcategories: ["Sách Giáo Khoa", "Sách Tham Khảo", "Luyện Thi THPT Quốc Gia", "Mẫu Giáo"],
  },
  {
    id: 7,
    name: "Nuôi Dạy Con",
    icon: Heart,
    count: 156,
    subcategories: [
      "Cẩm Nang Làm Cha Mẹ",
      "Phương Pháp Giáo Dục Trẻ",
      "Phát Triển Trí Tuệ Cho Trẻ",
      "Phát Triển Kỹ Năng Cho Trẻ",
    ],
  },
  {
    id: 8,
    name: "Sách Học Ngoại Ngữ",
    icon: BookOpen,
    count: 134,
    subcategories: ["Tiếng Anh", "Tiếng Nhật", "Tiếng Hoa", "Tiếng Hàn"],
  },
]

const featuredSections = [
  {
    id: 1,
    name: "Sách Mới",
    books: [],
  },
  {
    id: 2,
    name: "Manga Mới",
    books: [],
  },
  {
    id: 3,
    name: "Light Novel Mới",
    books: [],
  },
  {
    id: 4,
    name: "Đam Mỹ Mới",
    books: [],
  },
  {
    id: 5,
    name: "Sách Bán Chạy",
    books: [],
  },
]

const allBooks = [
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
    subcategory: "Kỹ Năng Sống",
    bestseller: true,
    isNew: false,
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
    subcategory: "Câu Chuyện Cuộc Đời",
    bestseller: true,
    isNew: true,
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
    subcategory: "Tiểu Thuyết",
    bestseller: false,
    isNew: false,
  },
  {
    id: 4,
    title: "Tiếng Nhật Cho Người Mới Bắt Đầu",
    author: "Yamada Sensei",
    price: 142000,
    originalPrice: 180000,
    rating: 4.7,
    reviews: 890,
    image: "/placeholder.svg?height=300&width=200",
    category: "Sách Học Ngoại Ngữ",
    subcategory: "Tiếng Nhật",
    bestseller: true,
    isNew: true,
  },
  {
    id: 5,
    title: "Cẩm Nang Nuôi Con 0-3 Tuổi",
    author: "Dr. Nguyễn Văn A",
    price: 156000,
    originalPrice: 195000,
    rating: 4.8,
    reviews: 650,
    image: "/placeholder.svg?height=300&width=200",
    category: "Nuôi Dạy Con",
    subcategory: "Cẩm Nang Làm Cha Mẹ",
    bestseller: false,
    isNew: true,
  },
  {
    id: 6,
    title: "Marketing 4.0",
    author: "Philip Kotler",
    price: 198000,
    originalPrice: 250000,
    rating: 4.5,
    reviews: 420,
    image: "/placeholder.svg?height=300&width=200",
    category: "Kinh Tế",
    subcategory: "Marketing - Bán Hàng",
    bestseller: true,
    isNew: false,
  },
  {
    id: 7,
    title: "Luyện Thi THPT Quốc Gia - Toán",
    author: "Thầy Nguyễn Bá Tuấn",
    price: 89000,
    originalPrice: 110000,
    rating: 4.4,
    reviews: 1200,
    image: "/placeholder.svg?height=300&width=200",
    category: "Giáo Khoa - Tham Khảo",
    subcategory: "Luyện Thi THPT Quốc Gia",
    bestseller: true,
    isNew: false,
  },
  {
    id: 8,
    title: "Steve Jobs - Tiểu Sử",
    author: "Walter Isaacson",
    price: 234000,
    originalPrice: 290000,
    rating: 4.9,
    reviews: 980,
    image: "/placeholder.svg?height=300&width=200",
    category: "Tiểu Sử - Hồi Ký",
    subcategory: "Câu Chuyện Cuộc Đời",
    bestseller: true,
    isNew: false,
  },
]

// Định nghĩa kiểu dữ liệu cho một sản phẩm trong giỏ hàng
interface CartItem {
  id: number
  title: string
  author: string
  price: number
  image: string
  quantity: number
}

// Định nghĩa kiểu dữ liệu cho người dùng
interface UserData {
  name: string
  email: string
  phone?: string
  address?: string
}

export default function BookstoreHomepage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentView, setCurrentView] = useState<
    "home" | "category" | "bestseller" | "promotion" | "contact" | "product" | "cart" | "login" | "register" | "account"
  >("home")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<UserData | null>(null) // Trạng thái người dùng

  const addToCart = (bookId: number) => {
    const existingItem = cartItems.find((item) => item.id === bookId)
    const bookToAdd = allBooks.find((book) => book.id === bookId)

    if (!bookToAdd) return // Sách không tồn tại

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...bookToAdd, quantity: 1 }])
    }
  }

  const updateCartQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === bookId ? { ...item, quantity: quantity } : item)))
  }

  const removeFromCart = (bookId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== bookId))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const viewProductDetail = (book: any) => {
    setSelectedBook(book)
    setCurrentView("product")
  }

  const viewCategory = (category: any) => {
    setSelectedCategory(category)
    setCurrentView("category")
  }

  const backToHome = () => {
    setCurrentView("home")
    setSelectedBook(null)
    setSelectedCategory(null)
  }

  const navigateTo = (page: string) => {
    setCurrentView(page as any)
  }

  const totalCartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Hàm xử lý đăng nhập
  const handleLogin = (email: string, name: string) => {
    setCurrentUser({ email, name })
    setCurrentView("account") // Chuyển đến trang tài khoản sau khi đăng nhập
  }

  // Hàm xử lý đăng ký
  const handleRegister = (email: string, name: string) => {
    setCurrentUser({ email, name })
    setCurrentView("account") // Chuyển đến trang tài khoản sau khi đăng ký
  }

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    setCurrentUser(null)
    setCartItems([]) // Xóa giỏ hàng khi đăng xuất
    setCurrentView("home") // Chuyển về trang chủ
  }

  const reviews = [
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

  return (
    <div className="min-h-screen bg-background">
      {currentView === "home" ? (
        <>
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-gray-900">BookStore</span>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                  <button
                    onClick={() => navigateTo("home")}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Trang chủ
                  </button>
                  <button
                    onClick={() => navigateTo("category")}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Danh mục
                  </button>
                  <button
                    onClick={() => navigateTo("bestseller")}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Bestseller
                  </button>
                  <button
                    onClick={() => navigateTo("promotion")}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Khuyến mãi
                  </button>
                  <button
                    onClick={() => navigateTo("contact")}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Liên hệ
                  </button>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm sách..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>

                <Button variant="ghost" size="icon" onClick={() => navigateTo(currentUser ? "account" : "login")}>
                  <User className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="relative" onClick={() => navigateTo("cart")}>
                  <ShoppingCart className="h-5 w-5" />
                  {totalCartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {totalCartItemsCount}
                    </Badge>
                  )}
                </Button>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <nav className="flex flex-col gap-4 mt-8">
                      <button onClick={() => navigateTo("home")} className="text-lg font-medium text-left">
                        Trang chủ
                      </button>
                      <button onClick={() => navigateTo("category")} className="text-lg font-medium text-left">
                        Danh mục
                      </button>
                      <button onClick={() => navigateTo("bestseller")} className="text-lg font-medium text-left">
                        Bestseller
                      </button>
                      <button onClick={() => navigateTo("promotion")} className="text-lg font-medium text-left">
                        Khuyến mãi
                      </button>
                      <button onClick={() => navigateTo("contact")} className="text-lg font-medium text-left">
                        Liên hệ
                      </button>
                      <button onClick={() => navigateTo("cart")} className="text-lg font-medium text-left">
                        Giỏ hàng ({totalCartItemsCount})
                      </button>
                      <button
                        onClick={() => navigateTo(currentUser ? "account" : "login")}
                        className="text-lg font-medium text-left"
                      >
                        {currentUser ? "Tài khoản" : "Đăng nhập"}
                      </button>
                      {!currentUser && (
                        <button onClick={() => navigateTo("register")} className="text-lg font-medium text-left">
                          Đăng ký
                        </button>
                      )}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="bg-gradient-to-r from-red-50 to-red-100 py-16">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="animate-fade-in">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
                    Khám phá thế giới
                    <span className="text-primary block">tri thức</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Hàng nghìn cuốn sách hay từ các tác giả nổi tiếng trong và ngoài nước. Miễn phí giao hàng toàn quốc
                    cho đơn hàng từ 200.000đ.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="text-lg px-8">
                      Mua sách ngay
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 bg-transparent"
                      onClick={() => navigateTo("bestseller")}
                    >
                      Xem bestseller
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=500&width=400"
                    alt="Books collection"
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <CategorySection categories={categories} />

          {/* Featured Books */}
          <section className="py-16 bg-muted/30">
            <div className="container">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Sách nổi bật</h2>
                <Button variant="outline">Xem tất cả</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allBooks.map((book) => (
                  <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {book.bestseller && (
                        <Badge className="absolute top-2 left-2 bg-primary text-white">Bestseller</Badge>
                      )}
                      {book.isNew && <Badge className="absolute top-2 right-2 bg-accent text-black">Mới</Badge>}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {book.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {book.subcategory}
                        </Badge>
                      </div>
                      <CardTitle
                        className="text-lg line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={() => viewProductDetail(book)}
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
                      <Button className="w-full" onClick={() => addToCart(book.id)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Thêm vào giỏ
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Sections */}
          <FeaturedSections sections={featuredSections} />

          {/* Features */}
          <section className="py-16 bg-white">
            <div className="container">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Miễn phí giao hàng</h3>
                  <p className="text-muted-foreground">Giao hàng miễn phí toàn quốc cho đơn hàng từ 200.000đ</p>
                </div>

                <div className="text-center">
                  <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Chất lượng đảm bảo</h3>
                  <p className="text-muted-foreground">100% sách chính hãng, đổi trả trong 7 ngày</p>
                </div>

                <div className="text-center">
                  <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Hỗ trợ 24/7</h3>
                  <p className="text-muted-foreground">Đội ngũ tư vấn chuyên nghiệp, hỗ trợ khách hàng 24/7</p>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin</h2>
              <p className="text-xl mb-8 opacity-90">Nhận thông tin về sách mới và ưu đãi đặc biệt</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Nhập email của bạn" className="bg-white text-black" />
                <Button variant="secondary" size="lg">
                  Đăng ký
                </Button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-muted py-12">
            <div className="container">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold">BookStore</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Cửa hàng sách trực tuyến hàng đầu Việt Nam với hàng nghìn đầu sách chất lượng.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Danh mục</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <button onClick={() => navigateTo("category")} className="hover:text-primary transition-colors">
                        Văn học
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo("category")} className="hover:text-primary transition-colors">
                        Kinh tế
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo("category")} className="hover:text-primary transition-colors">
                        Thiếu nhi
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo("category")} className="hover:text-primary transition-colors">
                        Kỹ năng sống
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Hỗ trợ</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <button onClick={() => navigateTo("contact")} className="hover:text-primary transition-colors">
                        Liên hệ
                      </button>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary transition-colors">
                        Chính sách đổi trả
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary transition-colors">
                        Hướng dẫn mua hàng
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary transition-colors">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Liên hệ</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>📞 1900 1234</li>
                    <li>📧 info@bookstore.vn</li>
                    <li>📍 123 Đường ABC, Quận 1, TP.HCM</li>
                  </ul>
                </div>
              </div>

              <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                <p>&copy; 2024 BookStore. Tất cả quyền được bảo lưu.</p>
              </div>
            </div>
          </footer>
        </>
      ) : currentView === "category" ? (
        <CategoryPage
          category={selectedCategory || categories[0]}
          onBack={backToHome}
          onAddToCart={addToCart}
          formatPrice={formatPrice}
          onViewProduct={viewProductDetail}
          allCategories={categories}
        />
      ) : currentView === "bestseller" ? (
        <BestsellerPage
          onBack={backToHome}
          onAddToCart={addToCart}
          formatPrice={formatPrice}
          onViewProduct={viewProductDetail}
        />
      ) : currentView === "promotion" ? (
        <PromotionPage
          onBack={backToHome}
          onAddToCart={addToCart}
          formatPrice={formatPrice}
          onViewProduct={viewProductDetail}
        />
      ) : currentView === "contact" ? (
        <ContactPage onBack={backToHome} />
      ) : currentView === "cart" ? (
        <ShoppingCartPage
          cartItems={cartItems}
          onBack={backToHome}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          formatPrice={formatPrice}
          onViewProduct={viewProductDetail}
        />
      ) : currentView === "login" || currentView === "register" ? (
        <AuthForms
          onBack={backToHome}
          onLogin={handleLogin}
          onRegister={handleRegister}
          initialTab={currentView === "register" ? "register" : "login"}
        />
      ) : currentView === "account" && currentUser ? (
        <UserAccountPage user={currentUser} onBack={backToHome} onLogout={handleLogout} formatPrice={formatPrice} />
      ) : (
        <ProductDetail
          book={selectedBook}
          onBack={backToHome}
          onAddToCart={addToCart}
          formatPrice={formatPrice}
          reviews={reviews}
          relatedBooks={relatedBooks}
        />
      )}
    </div>
  )
}
