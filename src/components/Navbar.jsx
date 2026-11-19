import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import RulesModal from './RulesModal'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isRulesOpen, setIsRulesOpen] = useState(false)

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

  const navLinks = [
    { label: 'Rooms', href: '#rooms' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Rules', onClick: () => setIsRulesOpen(true) },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
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
        <Logo iconSize="w-9 h-9 md:w-10 h-10" />
        
        <ul className="flex items-center gap-5 md:gap-10 list-none">
          {navLinks.map((item) => (
            <motion.li 
              key={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="text-sm md:text-[0.95rem] font-semibold transition-colors duration-300 hover:text-primary cursor-pointer bg-transparent border-none p-0 inline-flex items-center gap-1.5 focus:outline-none"
                >
                  {item.label}
                </button>
              ) : (
                <a 
                  href={item.href} 
                  className="text-sm md:text-[0.95rem] font-semibold transition-colors duration-300 hover:text-primary"
                >
                  {item.label}
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Rules & Regulations Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </>
  )
}

export default Navbar