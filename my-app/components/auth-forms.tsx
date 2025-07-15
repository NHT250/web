"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, LogIn, UserPlus } from "lucide-react"

interface AuthFormsProps {
  onBack: () => void
  onLogin: (email: string, name: string) => void
  onRegister: (email: string, name: string) => void
  initialTab?: "login" | "register"
}

export default function AuthForms({ onBack, onLogin, onRegister, initialTab = "login" }: AuthFormsProps) {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [activeTab, setActiveTab] = useState(initialTab)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    // Simulate API call
    if (loginEmail === "test@example.com" && loginPassword === "password") {
      setMessage({ type: "success", text: "Đăng nhập thành công!" })
      setTimeout(() => onLogin(loginEmail, "Người dùng Test"), 1000) // Giả lập tên người dùng
    } else {
      setMessage({ type: "error", text: "Email hoặc mật khẩu không đúng." })
    }
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if (registerPassword !== registerConfirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp." })
      return
    }
    // Simulate API call
    if (registerEmail && registerPassword && registerName) {
      setMessage({ type: "success", text: "Đăng ký thành công! Đang chuyển hướng..." })
      setTimeout(() => onRegister(registerEmail, registerName), 1000)
    } else {
      setMessage({ type: "error", text: "Vui lòng điền đầy đủ thông tin." })
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <header className="w-full border-b bg-background/95 backdrop-blur shadow-sm mb-8">
          <div className="container flex h-16 items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Tài Khoản</h1>
          </div>
        </header>

        <Card className="mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Chào mừng trở lại!</CardTitle>
            <CardDescription>Đăng nhập hoặc đăng ký để tiếp tục</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "login" | "register")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Đăng nhập
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Đăng ký
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Mật khẩu</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="********"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  {message && activeTab === "login" && (
                    <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {message.text}
                    </p>
                  )}
                  <Button type="submit" className="w-full">
                    Đăng nhập
                  </Button>
                  <Button variant="link" className="w-full text-sm" onClick={() => setActiveTab("register")}>
                    Chưa có tài khoản? Đăng ký ngay
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="mt-6">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Họ và tên</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Mật khẩu</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="********"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="********"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {message && activeTab === "register" && (
                    <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {message.text}
                    </p>
                  )}
                  <Button type="submit" className="w-full">
                    Đăng ký
                  </Button>
                  <Button variant="link" className="w-full text-sm" onClick={() => setActiveTab("login")}>
                    Đã có tài khoản? Đăng nhập
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
