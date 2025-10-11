'use client'

import { useCart } from '@/context/CartContext'
import { orderService } from '@/services/orderService'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useClientOnly } from '@/hooks/useClientOnly'

// Force dynamic rendering (disable static generation)
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

// helper to check token
function isAuthenticated() {
  try { return typeof window !== 'undefined' && !!localStorage.getItem('token') } catch { return false }
}

export default function CheckoutPage() {
  const isClient = useClientOnly()
  const { items, clearCart, total } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (!isClient) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>
  }

  const handlePlaceOrder = async () => {
    if (!isAuthenticated()) {
      // redirect to login
      router.push('/auth/login')
      return
    }
    try {
      setLoading(true)
      const dto = { items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })) }
      const order = await orderService.createOrder(dto)
      clearCart()
      router.push(`/orders/${order.id}`)
    } catch (err) {
      const message = (err as any)?.response?.data || (err as any)?.message || 'Lỗi không xác định'
      alert('Đặt hàng thất bại: ' + message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>
      <div className="bg-white p-6 rounded shadow">
        <p>Số mặt hàng: {items.length}</p>
        <p className="text-xl font-bold">Tổng: {total.toLocaleString('vi-VN')} VNĐ</p>
        <div className="mt-4">
          <button className="btn-primary" onClick={handlePlaceOrder} disabled={loading || items.length===0}>{loading ? 'Đang xử lý...' : 'Xác nhận và đặt hàng'}</button>
        </div>
      </div>
    </div>
  )
}
