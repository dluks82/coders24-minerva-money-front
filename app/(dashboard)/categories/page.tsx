'use client'

import { useCategories } from "@/hooks/use-categories"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Lock } from "lucide-react"
import { NewCategoryDialog } from "@/components/categories/new-category-dialog"

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories()

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <NewCategoryDialog /> {/* Substituir o Button anterior por este componente */}

      </div>

      {isLoading ? (
        <p>Carregando categorias...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Categorias Padrão */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Categorias Padrão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories
                  ?.filter(category => category.default)
                  .map(category => (
                    <div 
                      key={category.name} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Categorias Personalizadas */}
          <Card>
            <CardHeader>
              <CardTitle>Minhas Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories
                  ?.filter(category => !category.default)
                  .map(category => (
                    <div 
                      key={category.name} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                {categories?.filter(c => !c.default).length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    Nenhuma categoria personalizada criada
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}