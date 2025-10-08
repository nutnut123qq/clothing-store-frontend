'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Product } from '@/types/Product'
import { productService } from '@/services/productService'
import LoadingSpinner from '@/components/LoadingSpinner'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

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

  const handleDelete = async () => {
    if (!product) return

    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      return
    }

    try {
      setDeleting(true)
      await productService.deleteProduct(product.id)
      router.push('/')
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error)
      alert('Có lỗi xảy ra khi xóa sản phẩm')
    } finally {
      setDeleting(false)
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square relative">
            <Image
              src={product.imageUrl || 'https://via.placeholder.com/500x500?text=No+Image'}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-primary-600 mb-4">
                {product.price.toLocaleString('vi-VN')} VNĐ
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push(`/products/${product.id}/edit`)}
                  className="btn-primary flex-1"
                >
                  Chỉnh sửa sản phẩm
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="btn-danger flex-1 disabled:opacity-50"
                >
                  {deleting ? 'Đang xóa...' : 'Xóa sản phẩm'}
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/')}
                  className="btn-secondary flex-1"
                >
                  Quay lại danh sách
                </button>

                <AddToCartButton product={product} />
              </div>
            </div>

            <div className="border-t pt-4 text-sm text-gray-500">
              <p>Ngày tạo: {new Date(product.createdAt).toLocaleDateString('vi-VN')}</p>
              <p>Cập nhật lần cuối: {new Date(product.updatedAt).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart()
  const { token } = useAuth()
  const router = useRouter()
  const [adding, setAdding] = useState(false)

  const handleAdd = () => {
    if (!token) {
      // redirect to login
      router.push('/auth/login')
      return
    }
    setAdding(true)
    try {
      addToCart(product, 1)
      alert('Đã thêm vào giỏ hàng')
    } finally {
      setAdding(false)
    }
  }

  return (
    <button onClick={handleAdd} className="btn-primary flex-1" disabled={adding}>{adding ? 'Đang...' : 'Thêm vào giỏ'}</button>
  )
}
