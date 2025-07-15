"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"

interface CategorySectionProps {
  categories: any[]
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Danh Mục Sách</h2>
          <p className="text-xl text-gray-600">Khám phá thế giới tri thức đa dạng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            const isExpanded = expandedCategory === category.id

            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/20 rounded-lg overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div className="text-center mb-4" onClick={() => toggleCategory(category.id)}>
                    <div className="mb-4 relative">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{category.name}</h3>
                    <Badge className="bg-primary text-white font-medium mb-3">{category.count} cuốn</Badge>

                    <Button variant="ghost" size="sm" className="w-full mt-2 text-primary hover:bg-red-50">
                      {isExpanded ? (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Thu gọn
                        </>
                      ) : (
                        <>
                          <ChevronRight className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </>
                      )}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="space-y-2 animate-slide-in">
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-sm text-primary mb-3">Danh mục con:</h4>
                        {category.subcategories.map((sub: string, index: number) => (
                          <div
                            key={index}
                            className="text-sm py-2 px-3 bg-gray-50 rounded-md mb-2 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            • {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
