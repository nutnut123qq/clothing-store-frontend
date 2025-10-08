'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await register(email, password)
      router.push('/')
    } catch (err) {
      alert('Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Đăng ký</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full input-field" />
          <input type="password" placeholder="Mật khẩu" value={password} onChange={e=>setPassword(e.target.value)} className="w-full input-field" />
          <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Đang...' : 'Đăng ký'}</button>
        </form>
      </div>
    </div>
  )
}
