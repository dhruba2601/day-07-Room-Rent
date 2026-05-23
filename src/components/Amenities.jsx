import { motion } from 'framer-motion'

const amenityData = [
  { id: 1, icon: "🚗", title: "Parking", description: "Safe and spacious parking available for residents" },
  { id: 2, icon: "💧", title: "Water Supply", description: "24/7 clean water supply throughout the building" },
  { id: 3, icon: "🚿", title: "Attached Bathroom", description: "Private attached bathroom with every room" },
]

function Amenities() {
  return (
    <section id="amenities" className="py-20 bg-cream-2">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-3xl md:text-5xl font-bold text-center text-dark mb-12"
      >
        Amenities
      </motion.h2>
      
      <div className="amenities-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {amenityData.map((amenity, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="amenity-card bg-white p-8 rounded-2xl border border-border text-center shadow-sm flex flex-col items-center"
            key={amenity.id}
          >
            <span className="amenity-icon text-4xl mb-4 inline-block">{amenity.icon}</span>
            <h3 className="font-serif text-xl font-bold text-dark mb-3">{amenity.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{amenity.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Amenities