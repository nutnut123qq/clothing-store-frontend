'use client'

import { useEffect, useState } from 'react'
import { orderService } from '@/services/orderService'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await orderService.getOrders()
      setOrders(res)
    } catch (err) {
      console.error(err)
      alert('Không thể tải đơn hàng')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Lịch sử đơn hàng</h1>
      {orders.length === 0 ? (
        <div>Chưa có đơn hàng</div>
      ) : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Đơn hàng #{o.id}</h3>
                  <p className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{o.totalAmount.toLocaleString('vi-VN')} VNĐ</p>
                  <p className="text-sm text-gray-600">{o.status}</p>
                  <Link href={`/orders/${o.id}`} className="text-primary-600">Xem chi tiết</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
