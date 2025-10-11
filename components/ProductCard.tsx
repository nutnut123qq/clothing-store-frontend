'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/Product'
import { productService } from '@/services/productService'
import { useCart } from '@/context/CartContext'
<<<<<<< HEAD
import { useAuth } from '@/context/AuthContext'
=======
>>>>>>> 50541cdd110ab3173be89e0c169529dcadb25fe8

interface ProductCardProps {
  product: Product
  onDeleted: () => void
}

export default function ProductCard({ product, onDeleted }: ProductCardProps) {
  const [deleting, setDeleting] = useState(false)
  const { addToCart } = useCart()
<<<<<<< HEAD
  const { token } = useAuth()
=======
>>>>>>> 50541cdd110ab3173be89e0c169529dcadb25fe8

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      return
    }

    try {
      setDeleting(true)
      await productService.deleteProduct(product.id)
      onDeleted()
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error)
      alert('Có lỗi xảy ra khi xóa sản phẩm')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-200">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              {product.price.toLocaleString('vi-VN')} VNĐ
            </span>
            
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addToCart(product, 1)
                  alert('Đã thêm vào giỏ hàng')
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium mr-2"
              >
                Thêm vào giỏ
              </button>
<<<<<<< HEAD
              {token && (
                <>
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Sửa
                  </Link>
                  
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                  >
                    {deleting ? 'Đang xóa...' : 'Xóa'}
                  </button>
                </>
              )}
=======
              <Link
                href={`/products/${product.id}/edit`}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Sửa
              </Link>
              
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
              >
                {deleting ? 'Đang xóa...' : 'Xóa'}
              </button>
>>>>>>> 50541cdd110ab3173be89e0c169529dcadb25fe8
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
