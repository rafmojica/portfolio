import { useEffect, useState } from 'react'

const QUERY = '(max-width: 768px)'

// Single source of truth for the desktop/mobile split. Desktop keeps the fixed HUD bar +
// draggable card fan; mobile swaps in the hamburger nav and the stacked section layouts.
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
