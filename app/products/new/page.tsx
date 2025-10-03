'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreateProductDto } from '@/types/Product'
import { productService } from '@/services/productService'
import ProductForm from '@/components/ProductForm'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (productData: CreateProductDto) => {
    try {
      setLoading(true)
      await productService.createProduct(productData)
      router.push('/')
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error)
      alert('Có lỗi xảy ra khi tạo sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thêm sản phẩm mới
          </h1>
          <p className="text-gray-600">
            Điền thông tin để tạo sản phẩm mới
          </p>
        </div>

        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Tạo sản phẩm"
        />
      </div>
    </div>
  )
}
