"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ShoppingCart, Trash2, Minus, Plus, Package, Tag } from "lucide-react"

interface CartItem {
  id: number
  title: string
  author: string
  price: number
  image: string
  quantity: number
}

interface ShoppingCartPageProps {
  cartItems: CartItem[]
  onBack: () => void
  onUpdateQuantity: (bookId: number, quantity: number) => void
  onRemoveItem: (bookId: number) => void
  formatPrice: (price: number) => string
  onViewProduct: (book: any) => void // Để có thể xem chi tiết sản phẩm từ giỏ hàng
}

export default function ShoppingCartPage({
  cartItems,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  formatPrice,
  onViewProduct,
}: ShoppingCartPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal >= 200000 ? 0 : 25000 // Miễn phí ship cho đơn hàng từ 200k
  const total = subtotal + shippingFee

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-sm">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Giỏ Hàng Của Bạn</h1>
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
          <span className="text-foreground">Giỏ hàng</span>
        </nav>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-3">Giỏ hàng của bạn đang trống</h2>
            <p className="text-muted-foreground mb-6">Hãy thêm những cuốn sách yêu thích vào giỏ hàng nhé!</p>
            <Button onClick={onBack} size="lg">
              Tiếp tục mua sắm
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex items-center p-4 shadow-sm">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded-md mr-4 cursor-pointer"
                    onClick={() => onViewProduct(item)} // Cho phép xem chi tiết sản phẩm
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <div className="md:col-span-2">
                      <h3
                        className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors cursor-pointer"
                        onClick={() => onViewProduct(item)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.author}</p>
                      <p className="text-primary font-bold text-lg mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => onUpdateQuantity(item.id, Number.parseInt(e.target.value))}
                          className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min="1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tổng phụ ({cartItems.length} sản phẩm)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span className="font-medium">{shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full" size="lg">
                    Tiến hành thanh toán
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={onBack}>
                    Tiếp tục mua sắm
                  </Button>
                </CardFooter>
              </Card>

              {/* Coupon Code (Optional) */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    Mã giảm giá
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Input placeholder="Nhập mã giảm giá" className="flex-1" />
                  <Button>Áp dụng</Button>
                </CardContent>
              </Card>

              {/* Shipping Info (Optional) */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Thông tin vận chuyển
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Miễn phí vận chuyển cho đơn hàng từ {formatPrice(200000)}.</p>
                  <p>Thời gian giao hàng dự kiến: 1-3 ngày làm việc.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
