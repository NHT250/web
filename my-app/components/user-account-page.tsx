"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent } from "@/components/ui/tabs" // Add TabsList and TabsTrigger
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  User,
  History,
  Settings,
  LogOut,
  Calendar,
  Package,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useTranslations } from "next-intl" // Import useTranslations

interface UserData {
  name: string
  email: string
  phone?: string
  address?: string
}

interface UserAccountPageProps {
  user: UserData
  onBack: () => void
  onLogout: () => void
  formatPrice: (price: number) => string
}

const orderHistory = [
  {
    id: "ORD001",
    date: "2024-07-10",
    total: 250000,
    status: "Đã giao",
    items: [
      { title: "Đắc Nhân Tâm", quantity: 1, price: 89000 },
      { title: "Sapiens: Lược Sử Loài Người", quantity: 1, price: 156000 },
    ],
  },
  {
    id: "ORD002",
    date: "2024-07-05",
    total: 120000,
    status: "Đang xử lý",
    items: [{ title: "Nhà Giả Kim", quantity: 1, price: 67000 }],
  },
  {
    id: "ORD003",
    date: "2024-06-28",
    total: 300000,
    status: "Đã hủy",
    items: [
      { title: "Atomic Habits", quantity: 1, price: 142000 },
      { title: "Tư Duy Nhanh Và Chậm", quantity: 1, price: 168000 },
    ],
  },
]

export default function UserAccountPage({ user, onBack, onLogout, formatPrice }: UserAccountPageProps) {
  const t = useTranslations("UserAccountPage") // Initialize useTranslations
  const [activeTab, setActiveTab] = useState("profile")
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState<UserData>(user)

  // State for password change form
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSaveProfile = () => {
    // Simulate saving to backend
    console.log("Saving user profile:", editedUser)
    // In a real app, you'd update the user state in app/page.tsx or a global store
    setEditMode(false)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage(null)

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage({ type: "error", text: t("password_mismatch_error") })
      return
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: t("password_min_length_error") })
      return
    }

    // Simulate API call for password change
    if (currentPassword === "password123") {
      // Replace with actual current password validation
      setPasswordMessage({ type: "success", text: t("password_change_success") })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    } else {
      setPasswordMessage({ type: "error", text: t("password_change_error") })
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
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">{t("my_account")}</h1>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={onBack} className="hover:text-primary">
            {t("breadcrumb_home")}
          </button>
          <span>/</span>
          <span className="text-foreground">{t("breadcrumb_account")}</span>
        </nav>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">{t("hello", { name: user.name })}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="h-4 w-4 mr-2" />
                {t("profile_info")}
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <History className="h-4 w-4 mr-2" />
                {t("order_history")}
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                {t("settings")}
              </Button>
              <Separator className="my-4" />
              <Button variant="destructive" className="w-full justify-start" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t("logout")}
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab}>
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("profile_info")}</CardTitle>
                    <CardDescription>{t("manage_personal_info")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input id="email" value={editedUser.email} disabled />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t("phone_number")}</Label>
                      <Input
                        id="phone"
                        value={editedUser.phone || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                        placeholder={t("add_phone_placeholder")}
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">{t("address")}</Label>
                      <Input
                        id="address"
                        value={editedUser.address || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                        placeholder={t("add_address_placeholder")}
                        disabled={!editMode}
                      />
                    </div>
                    {editMode ? (
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile}>{t("save_changes")}</Button>
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          {t("cancel")}
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setEditMode(true)}>{t("edit_info")}</Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Order History Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("order_history")}</CardTitle>
                    <CardDescription>{t("view_orders")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {orderHistory.length === 0 ? (
                      <div className="text-center py-10 text-muted-foreground">
                        <Package className="h-16 w-16 mx-auto mb-4" />
                        <p>{t("no_orders")}</p>
                      </div>
                    ) : (
                      orderHistory.map((order) => (
                        <Card key={order.id} className="border-2 border-primary/10 shadow-sm">
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                              <CardTitle className="text-lg">{t("order_id", { id: order.id })}</CardTitle>
                              <CardDescription className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3" />
                                {order.date}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              {order.status === "Đã giao" && (
                                <Badge className="bg-green-500 text-white">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {t("status_delivered")}
                                </Badge>
                              )}
                              {order.status === "Đang xử lý" && (
                                <Badge className="bg-yellow-500 text-white">
                                  <History className="h-3 w-3 mr-1" />
                                  {t("status_processing")}
                                </Badge>
                              )}
                              {order.status === "Đã hủy" && (
                                <Badge className="bg-red-500 text-white">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  {t("status_cancelled")}
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {order.items.map((item, index) => (
                                <li key={index}>
                                  {item.title} x {item.quantity} ({formatPrice(item.price)})
                                </li>
                              ))}
                            </ul>
                            <Separator />
                            <div className="flex justify-between items-center font-semibold text-base">
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {t("total")}:
                              </span>
                              <span className="text-primary">{formatPrice(order.total)}</span>
                            </div>
                            <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                              {t("view_order_details")}
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("settings")}</CardTitle>
                    <CardDescription>{t("manage_account_options")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Change Password Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">{t("change_password_title")}</h3>
                      <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                          <Label htmlFor="current-password">{t("current_password")}</Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="new-password">{t("new_password")}</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirm-new-password">{t("confirm_new_password")}</Label>
                          <Input
                            id="confirm-new-password"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        {passwordMessage && (
                          <p
                            className={`text-sm ${passwordMessage.type === "success" ? "text-green-600" : "text-red-600"}`}
                          >
                            {passwordMessage.text}
                          </p>
                        )}
                        <Button type="submit" className="w-full">
                          {t("update_password")}
                        </Button>
                      </form>
                    </div>

                    <Separator />

                    <p className="text-muted-foreground">{t("future_settings_note")}</p>
                    <Button variant="outline" className="bg-transparent">
                      {t("manage_notifications")}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
