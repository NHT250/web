"use client"

import { SidebarRail } from "@/components/ui/sidebar"

import { useState } from "react"
import {
  BookOpen,
  ShoppingCart,
  Users,
  List,
  Gift,
  Layout,
  BarChart,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Book {
  id: number
  title: string
  author: string
  price: number
  stock: number
  category: string
  isVisible: boolean
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 89000,
    stock: 150,
    category: "Tâm Lý - Kỹ Năng Sống",
    isVisible: true,
  },
  {
    id: 2,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 156000,
    stock: 80,
    category: "Tiểu Sử - Hồi Ký",
    isVisible: true,
  },
  {
    id: 3,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 67000,
    stock: 200,
    category: "Văn học",
    isVisible: false,
  },
  {
    id: 4,
    title: "Marketing 4.0",
    author: "Philip Kotler",
    price: 198000,
    stock: 50,
    category: "Kinh Tế",
    isVisible: true,
  },
]

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const t = useTranslations("AdminDashboard")
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const [activeSection, setActiveSection] = useState("books")
  const [books, setBooks] = useState<Book[]>(initialBooks)

  const handleToggleVisibility = (id: number) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === id ? { ...book, isVisible: !book.isVisible } : book)))
  }

  const handleDeleteBook = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "books":
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t("books")}</CardTitle>
                <CardDescription>{t("book_list_description")}</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t("add_new_book")}
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>{t("book_name")}</TableHead>
                    <TableHead>{t("author")}</TableHead>
                    <TableHead>{t("price")}</TableHead>
                    <TableHead>{t("stock")}</TableHead>
                    <TableHead>{t("category")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.id}</TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{formatPrice(book.price)}</TableCell>
                      <TableCell>{book.stock}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell>
                        <Badge variant={book.isVisible ? "default" : "secondary"}>
                          {book.isVisible ? t("visible") : t("hidden")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" title={t("edit")}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            title={book.isVisible ? t("hide") : t("show")}
                            onClick={() => handleToggleVisibility(book.id)}
                          >
                            {book.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            title={t("delete")}
                            onClick={() => handleDeleteBook(book.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case "orders":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t("orders")}</CardTitle>
              <CardDescription>{t("order_list_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Nội dung quản lý đơn hàng sẽ được hiển thị tại đây.</p>
            </CardContent>
          </Card>
        )
      case "users":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t("users")}</CardTitle>
              <CardDescription>{t("user_list_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Nội dung quản lý người dùng sẽ được hiển thị tại đây.</p>
            </CardContent>
          </Card>
        )
      case "categories":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t("categories")}</CardTitle>
              <CardDescription>{t("category_list_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Nội dung quản lý danh mục sẽ được hiển thị tại đây.</p>
            </CardContent>
          </Card>
        )
      case "promotions":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t("promotions")}</CardTitle>
              <CardDescription>{t("promotion_list_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Nội dung quản lý khuyến mãi sẽ được hiển thị tại đây.</p>
            </CardContent>
          </Card>
        )
      case "content":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t("content")}</CardTitle>
              <CardDescription>{t("content_management_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Nội dung quản lý giao diện sẽ được hiển thị tại đây.</p>
            </CardContent>
          </Card>
        )
      case "reports":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t("reports")}</CardTitle>
              <CardDescription>{t("reports_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Nội dung báo cáo thống kê sẽ được hiển thị tại đây.</p>
            </CardContent>
          </Card>
        )
      case "reviews":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t("reviews")}</CardTitle>
              <CardDescription>{t("review_management_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Nội dung quản lý đánh giá/bình luận sẽ được hiển thị tại đây.</p>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold group-data-[state=collapsed]:hidden">BookStore Admin</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[state=collapsed]:hidden">{t("title")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeSection === "books"}
                    onClick={() => setActiveSection("books")}
                    tooltip={t("books")}
                  >
                    <BookOpen />
                    <span>{t("books")}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeSection === "orders"}
                    onClick={() => setActiveSection("orders")}
                    tooltip={t("orders")}
                  >
                    <ShoppingCart />
                    <span>{t("orders")}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeSection === "users"}
                    onClick={() => setActiveSection("users")}
                    tooltip={t("users")}
                  >
                    <Users />
                    <span>{t("users")}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeSection === "categories"}
                    onClick={() => setActiveSection("categories")}
                    tooltip={t("categories")}
                  >
                    <List />
                    <span>{t("categories")}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeSection === "promotions"}
                    onClick={() => setActiveSection("promotions")}
                    tooltip={t("promotions")}
                  >
                    <Gift />
                    <span>{t("promotions")}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeSection === "content"}
                    onClick={() => setActiveSection("content")}
                    tooltip={t("content")}
                  >
                    <Layout />
                    <span>{t("content")}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeSection === "reports"}
                    onClick={() => setActiveSection("reports")}
                    tooltip={t("reports")}
                  >
                    <BarChart />
                    <span>{t("reports")}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeSection === "reviews"}
                    onClick={() => setActiveSection("reviews")}
                    tooltip={t("reviews")}
                  >
                    <MessageSquare />
                    <span>{t("reviews")}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h2 className="text-xl font-semibold">{t(activeSection)}</h2>
          <div className="ml-auto">
            <Button variant="outline" onClick={onBack}>
              Thoát Admin
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
