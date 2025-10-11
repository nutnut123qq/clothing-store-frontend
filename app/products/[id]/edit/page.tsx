'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Product, UpdateProductDto } from '@/types/Product'
import { productService } from '@/services/productService'
import ProductForm from '@/components/ProductForm'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchProduct(Number(params.id))
    }
  }, [params.id])

  const fetchProduct = async (id: number) => {
    try {
      setLoading(true)
      const response = await productService.getProduct(id)
      setProduct(response.data)
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (productData: UpdateProductDto) => {
    if (!product) return

    try {
      setSaving(true)
      await productService.updateProduct(product.id, productData)
      router.push(`/products/${product.id}`)
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error)
      alert('Có lỗi xảy ra khi cập nhật sản phẩm')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    )
  }

  const initialData = {
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl || ''
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chỉnh sửa sản phẩm
          </h1>
          <p className="text-gray-600">
            Cập nhật thông tin sản phẩm
          </p>
        </div>

        <ProductForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={saving}
          submitText="Cập nhật sản phẩm"
        />
      </div>
    </div>
  )
}
