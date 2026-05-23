import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const galleryData = [
  { id: 1, src: '/images/building.jpg', label: 'Building View' },
  { id: 2, src: '/images/parking.jpg', label: 'Parking Area' },
  { id: 3, src: '/images/room1.jpg', label: 'Room Interior' },
  { id: 4, src: '/images/room2.jpg', label: 'Room Interior' },
  { id: 5, src: '/images/room3.jpg', label: 'Room Interior' },
  { id: 6, src: '/images/kitchen1.jpg', label: 'Kitchen Area' },
  { id: 7, src: '/images/kitchen2.jpg', label: 'Kitchen Area' },
  { id: 8, src: '/images/balcony.jpg', label: 'Balcony View' },
]

function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="gallery" className="py-20 md:py-24 bg-cream max-w-full px-6 md:px-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-3xl md:text-5xl font-bold text-center text-dark mb-12"
      >
        Gallery
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {galleryData.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: (index % 4) * 0.08 }}
            whileHover={{ y: -6 }}
            className="cursor-pointer rounded-2xl overflow-hidden relative shadow-sm border border-dark/5 bg-white group"
            key={item.id}
            onClick={() => setSelected(item)}
          >
            <div className="relative overflow-hidden h-56">
              <img 
                src={item.src} 
                alt={item.label} 
                loading="lazy" 
                decoding="async"
                className="w-full h-full object-cover block group-hover:scale-106 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <span className="text-white text-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">🔎</span>
              </div>
            </div>
            <p className="text-center text-xs font-semibold text-text-muted py-3 bg-white border-t border-dark/5 tracking-wider uppercase group-hover:text-primary group-hover:bg-cream transition-colors duration-300">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-dark/95 backdrop-blur-md flex items-center justify-center z-[2000] cursor-pointer"
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-[85vw] max-h-[85vh] text-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-12 right-0 bg-white/10 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:rotate-90 cursor-pointer border-none"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
              <img 
                src={selected.src} 
                alt={selected.label} 
                decoding="async" 
                className="max-w-full max-h-[75vh] rounded-xl object-contain shadow-2xl border border-white/10"
              />
              <p className="text-white/95 mt-4 text-lg font-serif italic tracking-wide">
                {selected.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery