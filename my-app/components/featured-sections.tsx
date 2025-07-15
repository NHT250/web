"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

interface FeaturedSectionsProps {
  sections: any[]
}

export default function FeaturedSections({ sections }: FeaturedSectionsProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-red-100">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Mục Nổi Bật</h2>
          <p className="text-xl text-gray-600">Những cuốn sách được quan tâm nhất</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {sections.map((section) => (
            <Card
              key={section.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/20 rounded-lg overflow-hidden"
            >
              <div className="h-2 bg-primary"></div>

              <CardHeader className="text-center pb-2">
                <CardTitle className="font-bold text-lg group-hover:text-primary transition-colors">
                  {section.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <div className="mb-4">
                  <Badge className="bg-red-100 text-primary font-medium px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  className="w-full font-medium border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 bg-transparent"
                >
                  Xem ngay
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-lg text-gray-600">Đầu sách</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-lg text-gray-600">Khách hàng</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-lg text-gray-600">Hỗ trợ</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-lg text-gray-600">Chính hãng</div>
          </div>
        </div>
      </div>
    </section>
  )
}
