import axios from 'axios'
import { CreateOrderDto } from '@/types/Order'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api'

const api = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json' } })

api.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token && config.headers) config.headers['Authorization'] = `Bearer ${token}`
  } catch {}
  return config
})

export const orderService = {
  async createOrder(dto: CreateOrderDto) {
    const res = await api.post('/orders', dto)
    return res.data
  },

  async getOrders() {
    const res = await api.get('/orders')
    return res.data
  },

  async getOrder(id: number) {
    const res = await api.get(`/orders/${id}`)
    return res.data
  }
}
