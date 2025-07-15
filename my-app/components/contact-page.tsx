"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Send,
  CheckCircle,
} from "lucide-react"

interface ContactPageProps {
  onBack: () => void
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
            <MessageCircle className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Liên Hệ</h1>
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
          <span className="text-foreground">Liên hệ</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Chúng Tôi Luôn Sẵn Sàng Hỗ Trợ Bạn</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Có thắc mắc về sản phẩm, đơn hàng hay cần tư vấn? Hãy liên hệ với chúng tôi qua các kênh dưới đây.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Hotline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-primary">1900 BOOK (2665)</p>
                    <p className="text-sm text-muted-foreground">Hỗ trợ đặt hàng & tư vấn</p>
                  </div>
                  <div>
                    <p className="font-semibold">028 3822 4567</p>
                    <p className="text-sm text-muted-foreground">Khiếu nại & bảo hành</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-primary">support@bookstore.vn</p>
                    <p className="text-sm text-muted-foreground">Hỗ trợ khách hàng</p>
                  </div>
                  <div>
                    <p className="font-semibold">sales@bookstore.vn</p>
                    <p className="text-sm text-muted-foreground">Hợp tác kinh doanh</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Địa Chỉ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Cửa hàng chính</p>
                    <p className="text-sm text-muted-foreground">
                      123 Đường Nguyễn Huệ, Quận 1<br />
                      TP. Hồ Chí Minh
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Chi nhánh Hà Nội</p>
                    <p className="text-sm text-muted-foreground">
                      456 Phố Tràng Tiền, Hoàn Kiếm
                      <br />
                      Hà Nội
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Giờ Làm Việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Thứ 2 - Thứ 6:</span>
                    <span className="font-semibold">8:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thứ 7 - Chủ nhật:</span>
                    <span className="font-semibold">9:00 - 21:00</span>
                  </div>
                  <div className="text-sm text-primary font-medium mt-2">Hotline hỗ trợ 24/7</div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Kết Nối Với Chúng Tôi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:border-blue-500 bg-transparent"
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-pink-50 hover:border-pink-500 bg-transparent"
                  >
                    <Instagram className="h-4 w-4 text-pink-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:border-blue-500 bg-transparent"
                  >
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                  </Button>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Facebook:</span> BookStore Vietnam
                  </p>
                  <p>
                    <span className="font-medium">Instagram:</span> @bookstore_vn
                  </p>
                  <p>
                    <span className="font-medium">Zalo:</span> BookStore Official
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Gửi Tin Nhắn Cho Chúng Tôi</CardTitle>
                <CardDescription>
                  Điền thông tin vào form dưới đây, chúng tôi sẽ phản hồi trong vòng 24h
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Gửi thành công!</h3>
                    <p className="text-muted-foreground">
                      Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Họ và tên *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Nhập họ và tên"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Nhập địa chỉ email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Chủ đề</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn chủ đề" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Hỏi về đơn hàng</SelectItem>
                          <SelectItem value="product">Tư vấn sản phẩm</SelectItem>
                          <SelectItem value="complaint">Khiếu nại</SelectItem>
                          <SelectItem value="partnership">Hợp tác kinh doanh</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Nội dung *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Nhập nội dung tin nhắn..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Gửi Tin Nhắn
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Câu Hỏi Thường Gặp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Làm sao để theo dõi đơn hàng?</h4>
                    <p className="text-sm text-muted-foreground">
                      Bạn có thể theo dõi đơn hàng qua email xác nhận hoặc gọi hotline 1900 BOOK.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Chính sách đổi trả như thế nào?</h4>
                    <p className="text-sm text-muted-foreground">
                      Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày với sản phẩm còn nguyên vẹn.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Có miễn phí giao hàng không?</h4>
                    <p className="text-sm text-muted-foreground">
                      Miễn phí giao hàng toàn quốc cho đơn hàng từ 200.000đ.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Thời gian giao hàng bao lâu?</h4>
                    <p className="text-sm text-muted-foreground">
                      Thời gian giao hàng từ 1-3 ngày làm việc tùy theo khu vực.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
