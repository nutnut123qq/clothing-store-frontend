export type CreateOrderItem = {
  productId: number
  quantity: number
}

export type CreateOrderDto = {
  items: CreateOrderItem[]
}

export type OrderItem = {
  id: number
  orderId: number
  productId: number
  productName: string
  unitPrice: number
  quantity: number
}

export type Order = {
  id: number
  userId: number
  status: string
  totalAmount: number
  createdAt: string
  items: OrderItem[]
}
