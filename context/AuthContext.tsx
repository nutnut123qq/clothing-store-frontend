"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '@/services/authService'

type AuthContextType = {
  token: string | null
  email: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('token') : null)
  const [email, setEmail] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('email') : null)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
    if (email) {
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('email')
    }
  }, [token, email])

  const login = async (emailParam: string, password: string) => {
    const data = await authService.login(emailParam, password)
    setToken(data.token)
    setEmail(data.email)
  }

  const register = async (emailParam: string, password: string) => {
    const data = await authService.register(emailParam, password)
    setToken(data.token)
    setEmail(data.email)
  }

  const logout = () => {
    setToken(null)
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ token, email, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
