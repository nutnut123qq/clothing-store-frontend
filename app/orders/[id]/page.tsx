'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { orderService } from '@/services/orderService'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function OrderDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const [order, setOrder] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) fetchOrder(id)
  }, [id])

  const fetchOrder = async (orderId: number) => {
    try {
      setLoading(true)
      const res = await orderService.getOrder(orderId)
      setOrder(res)
    } catch (err) {
      console.error(err)
      alert('Không thể tải đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Đang tải...</div>
  if (!order) return <div className="container mx-auto px-4 py-8">Không tìm thấy đơn hàng</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng #{order.id}</h1>
      <p>Trạng thái: {order.status}</p>
      <p>Tổng: {order.totalAmount.toLocaleString('vi-VN')} VNĐ</p>
      <div className="mt-4 space-y-2">
        {order.items.map((it: any) => (
          <div key={it.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{it.productName}</div>
              <div className="text-sm text-gray-600">Số lượng: {it.quantity}</div>
            </div>
            <div className="text-right">
              <div>{(it.unitPrice * it.quantity).toLocaleString('vi-VN')} VNĐ</div>
              <div className="text-sm text-gray-500">{it.unitPrice.toLocaleString('vi-VN')} / cái</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
