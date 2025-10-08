'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useClientOnly } from '@/hooks/useClientOnly'

// Force dynamic rendering (disable static generation)
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function CartPage() {
  const isClient = useClientOnly()
  const { items, updateQuantity, removeFromCart, total } = useCart()
  const router = useRouter()

  if (!isClient) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
      {items.length === 0 ? (
        <div>Giỏ hàng trống</div>
      ) : (
        <div className="space-y-4">
          {items.map(i => (
            <div key={i.product.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
              <div className="w-24 h-24 relative">
                <Image src={i.product.imageUrl || 'https://via.placeholder.com/150'} alt={i.product.name} fill className="object-cover rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{i.product.name}</h3>
                <p className="text-sm text-gray-600">{i.product.price.toLocaleString('vi-VN')} VNĐ</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="number" min={1} value={i.quantity} onChange={e=>updateQuantity(i.product.id, Number(e.target.value))} className="w-20 input-field" />
                <button onClick={() => removeFromCart(i.product.id)} className="text-red-600">Xóa</button>
              </div>
            </div>
          ))}

          <div className="text-right">
            <p className="text-xl font-bold">Tổng: {total.toLocaleString('vi-VN')} VNĐ</p>
            <div className="mt-4">
              <button onClick={() => router.push('/checkout')} className="btn-primary">Thanh toán</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
