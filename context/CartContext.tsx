'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '@/types/Product'

type CartItem = {
  product: Product
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product, qty?: number) => void
  updateQuantity: (productId: number, qty: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window === 'undefined') return []
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const addToCart = (product: Product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(i => i.product.id === product.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx].quantity += qty
        return next
      }
      return [...prev, { product, quantity: qty }]
    })
  }

  const updateQuantity = (productId: number, qty: number) => {
    setItems((prev) => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i))
  }

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter(i => i.product.id !== productId))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((s, it) => s + Number(it.product.price) * it.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  // During SSR/prerender, return a safe default instead of throwing so
  // pages that reference the cart can be prerendered without a provider.
  if (!ctx) {
    if (typeof window === 'undefined') {
      return {
        items: [],
        addToCart: (_product: Product, _qty: number = 1) => {},
        updateQuantity: (_productId: number, _qty: number) => {},
        removeFromCart: (_productId: number) => {},
        clearCart: () => {},
        total: 0,
      } as CartContextType
    }
    // In client runtime, still throw to help developers catch misuse.
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}
