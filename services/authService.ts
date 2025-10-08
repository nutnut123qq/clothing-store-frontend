import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const authService = {
  async register(email: string, password: string) {
    const res = await api.post('/auth/register', { email, password })
    return res.data
  },

  async login(email: string, password: string) {
    const res = await api.post('/auth/login', { email, password })
    return res.data
  }
}
