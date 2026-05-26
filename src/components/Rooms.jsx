import { motion } from 'framer-motion'

const roomData = [
  { id: 1, type: "Single Room", category: "Bachelor", floor: "Top Floor", price: "₹7,000/month" },
  { id: 2, type: "Shared Room", category: "Bachelor", floor: "Top Floor", price: "₹7,500/month" },
  { id: 3, type: "Family Room", category: "Family", floor: "Ground Floor", price: "₹12,000/month" },
]

function Rooms() {
  return (
    <section id="rooms" className="py-20 bg-cream">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-3xl md:text-5xl font-bold text-center text-dark mb-4"
      >
        Available Rooms
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="not-available-container flex justify-center mb-12"
      >
        <p className="not-available bg-red-50 text-red-600 px-6 py-2 rounded-full font-semibold border border-red-100 shadow-sm text-sm">
          ❌ Not available for unmarried couples
        </p>
      </motion.div>
      
      <div className="rooms-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {roomData.map((room, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="room-card bg-white p-8 rounded-2xl border border-border flex flex-col items-center text-center relative shadow-sm"
            key={room.id}
          >
            <h3 className="font-serif text-2xl font-bold text-dark mb-2">{room.type}</h3>
            <p className="text-primary font-bold uppercase tracking-wider text-xs mb-1">{room.category}</p>
            <p className="text-text-muted text-sm mb-6">{room.floor}</p>
            <p className="room-price text-3xl font-serif font-bold text-dark mb-6">{room.price}</p>
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact" 
              className="room-btn bg-dark text-white font-semibold px-8 py-3 rounded-full text-sm w-full hover:bg-primary transition-all duration-300"
            >
              Book Now
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Rooms