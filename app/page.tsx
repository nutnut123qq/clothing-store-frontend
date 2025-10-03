'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/Product'
import { productService } from '@/services/productService'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import Pagination from '@/components/Pagination'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 6

  useEffect(() => {
    fetchProducts()
  }, [currentPage, searchTerm])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts(currentPage, pageSize, searchTerm)
      setProducts(response.data)
      setTotalCount(response.totalCount)
      setTotalPages(Math.ceil(response.totalCount / pageSize))
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleProductDeleted = () => {
    fetchProducts()
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cửa hàng quần áo
        </h1>
        <p className="text-lg text-gray-600">
          Khám phá bộ sưu tập quần áo thời trang mới nhất
        </p>
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchTerm ? 'Không tìm thấy sản phẩm nào' : 'Chưa có sản phẩm nào'}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Hiển thị {products.length} trong tổng số {totalCount} sản phẩm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDeleted={handleProductDeleted}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}
