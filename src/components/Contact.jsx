import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Contact() {
  const [showMap, setShowMap] = useState(false)

  return (
    <motion.section 
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
        className="contact-box"
      >
        <p className="contact-name">Keshab Room Rent</p>
        <a 
          href="https://www.google.com/maps/place/Keshab(Room+Rent)/@26.1908949,91.7174035,17z/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="contact-address"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          Doul, Govinda Rd, Baruah Souk,<br />
          North Guwahati, Guwahati,<br />
          Assam 781030
        </a>
        <p className="contact-note">📞 Phone enquiries only — no email</p>
        
        <motion.a 
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          href="tel:9365844130" 
          className="contact-btn"
        >
          📞 Call Now — 9365844130
        </motion.a>
        <br />
        <motion.a 
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          href="https://wa.me/919365844130" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-btn"
        >
          💬 WhatsApp — 9365844130
        </motion.a>
        <br />
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="map-toggle-btn" 
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? 'Hide Map' : '📍 View on Map'}
        </motion.button>
        
        <AnimatePresence>
          {showMap && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="map-container"
              style={{ overflow: 'hidden' }}
            >
              <iframe
                title="Keshab Room Rent Location"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '4px' }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.177768452455!2d91.71740350385994!3d26.1908948735814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5baebd7b0f13%3A0x5819dbe3dcc240b2!2sKeshab(Room%20Rent)!5e0!3m2!1sen!2sin!4v1777611835708!5m2!1sen!2sin"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}

export default Contact