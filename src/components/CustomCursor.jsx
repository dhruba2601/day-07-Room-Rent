import { useEffect, useRef, useState } from 'react'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  
  const mouseCoords = useRef({ x: 0, y: 0 })
  const ringCoords = useRef({ x: 0, y: 0 })
  
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    // Detect mobile / touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      return
    }

    const onMouseMove = (e) => {
      mouseCoords.current.x = e.clientX
      mouseCoords.current.y = e.clientY
      setIsHidden(false)
    }

    const onMouseLeave = () => {
      setIsHidden(true)
    }

    const onMouseEnter = () => {
      setIsHidden(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Global hover detection for links, buttons, and interactive cards
    const onMouseOver = (e) => {
      const target = e.target
      if (!target) return
      
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.room-card') || 
        target.closest('.gallery-item') || 
        target.closest('.amenity-card') || 
        target.closest('.review-card') ||
        window.getComputedStyle(target).cursor === 'pointer'

      if (isInteractive) {
        setIsHovered(true)
      }
    }

    const onMouseOut = () => {
      setIsHovered(false)
    }

    const onMouseDown = () => setIsClicked(true)
    const onMouseUp = () => setIsClicked(false)

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Animation Loop using requestAnimationFrame for 60/120 FPS rendering
    let animationFrameId
    const updatePosition = () => {
      const { x: mX, y: mY } = mouseCoords.current
      const { x: rX, y: rY } = ringCoords.current

      // Instantly position the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mX}px, ${mY}px, 0)`
      }

      // Smoothly interpolate the outer ring (trailing effect)
      const ease = 0.15
      const nextX = rX + (mX - rX) * ease
      const nextY = rY + (mY - rY) * ease
      ringCoords.current = { x: nextX, y: nextY }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`
      }

      animationFrameId = requestAnimationFrame(updatePosition)
    }

    animationFrameId = requestAnimationFrame(updatePosition)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Hide cursor on mobile or if hidden
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  if (isTouchDevice) return null

  return (
    <>
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''} ${isHidden ? 'hidden' : ''}`}
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''} ${isHidden ? 'hidden' : ''}`}
      />
    </>
  )
}

export default CustomCursor
