import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[1000] flex flex-col md:flex-row justify-between items-center transition-all duration-400 gap-4 md:gap-0 px-6 md:px-16 ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-border py-4 text-dark' 
          : 'bg-transparent py-6 md:py-8 text-white'
      }`}
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight leading-tight">
          Keshab Room Rent
        </h1>
        <p className="text-[10px] md:text-xs tracking-[2px] uppercase text-primary font-medium mt-0.5">
          North Guwahati, Assam
        </p>
      </div>
      
      <ul className="flex items-center gap-6 md:gap-10 list-none">
        {['Rooms', 'Amenities', 'Contact'].map((item) => (
          <motion.li 
            key={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href={`#${item.toLowerCase()}`} 
              className="text-sm md:text-[0.95rem] font-semibold transition-colors duration-300 hover:text-primary"
            >
              {item}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}

export default Navbar