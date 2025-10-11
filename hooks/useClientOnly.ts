'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to check if component is mounted on client-side
 * Useful to avoid SSR/prerender issues with localStorage/Context
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
