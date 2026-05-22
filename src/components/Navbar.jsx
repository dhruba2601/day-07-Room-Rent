import { useState, useEffect } from 'react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="nav-logo">
        <h1>Keshab Room Rent</h1>
        <p>North Guwahati, Assam</p>
      </div>
      <ul className="nav-links">
        <li><a href="#rooms">Rooms</a></li>
        <li><a href="#amenities">Amenities</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar