'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navigation() {
  const pathname = usePathname()

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
