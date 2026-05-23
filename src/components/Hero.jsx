import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = '/images/building.jpg'
    img.onload = () => {
      setImageLoaded(true)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2
      }
    }
  }

  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  }

  return (
    <section id="hero" className="h-screen flex justify-center items-center relative text-center overflow-hidden">
      <div className={`hero-high-res-bg ${imageLoaded ? 'loaded' : ''}`} />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-content relative z-10 px-6 max-w-4xl flex flex-col items-center"
      >
        <motion.h1 
          variants={childVariants}
          className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md"
        >
          Find Your Perfect Room in North Guwahati
        </motion.h1>
        
        <motion.p 
          variants={childVariants}
          className="text-base md:text-xl text-cream/90 font-medium mb-10 max-w-2xl leading-relaxed drop-shadow-sm"
        >
          Comfortable, affordable rooms for bachelors and families at Doul, Govinda Rd, Baruah Souk
        </motion.p>
        
        <motion.a 
          variants={childVariants}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#rooms" 
          className="hero-btn inline-block bg-primary text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 shadow-lg shadow-primary/30 hover:bg-primary-light"
        >
          View Rooms
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero