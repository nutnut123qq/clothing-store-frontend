'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navigation() {
  const pathname = usePathname()
<<<<<<< HEAD
  const { token } = useAuth()
=======
>>>>>>> 50541cdd110ab3173be89e0c169529dcadb25fe8

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Clothing Store
          </Link>
          
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Trang chủ
            </Link>
            
<<<<<<< HEAD
            {token && (
              <Link
                href="/products/new"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/products/new') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Thêm sản phẩm
              </Link>
            )}

            <Link
              href="/cart"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/cart') 
=======
            <Link
              href="/products/new"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products/new') 
>>>>>>> 50541cdd110ab3173be89e0c169529dcadb25fe8
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
<<<<<<< HEAD
              Giỏ hàng
            </Link>

            <Link
              href="/orders/history"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/orders/history') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Đơn hàng
=======
              Thêm sản phẩm
>>>>>>> 50541cdd110ab3173be89e0c169529dcadb25fe8
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* auth controls */}
            <AuthControls />
          </div>
        </div>
      </div>
    </nav>
  )
}

function AuthControls() {
  const { token, email, logout } = useAuth()

  if (!token) {
    return (
      <>
        <Link href="/auth/login" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Đăng nhập</Link>
        <Link href="/auth/register" className="px-3 py-2 text-sm text-primary-600 font-medium">Đăng ký</Link>
      </>
    )
  }

  return (
    <>
      <span className="text-sm text-gray-700">{email}</span>
      <button onClick={() => logout()} className="px-3 py-2 text-sm text-red-600">Đăng xuất</button>
    </>
  )
}
