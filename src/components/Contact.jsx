import { useState } from 'react'

function Contact() {
  const [showMap, setShowMap] = useState(false)

  return (
    <section id="contact">
      <h2 className="reveal">Contact Us</h2>
      <div className="contact-box reveal reveal-delay-1">
        <p className="contact-name">Keshab Room Rent</p>
        <p className="contact-address">
          Doul, Govinda Rd, Baruah Souk,<br />
          North Guwahati, Guwahati,<br />
          Assam 781030
        </p>
        <p className="contact-note">📞 Phone enquiries only — no email</p>
        <a href="tel:9365844130" className="contact-btn">
          📞 Call Now — 9365844130
        </a>
        <br />
        <a href="https://wa.me/919365844130" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
          💬 WhatsApp — 9365844130
        </a>
        <br />
        <button className="map-toggle-btn" onClick={() => setShowMap(!showMap)}>
          {showMap ? 'Hide Map' : '📍 View on Map'}
        </button>
        {showMap && (
          <div className="map-container">
            <iframe
              title="Keshab Room Rent Location"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '4px' }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.177768452455!2d91.71740350385994!3d26.1908948735814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5baebd7b0f13%3A0x5819dbe3dcc240b2!2sKeshab(Room%20Rent)!5e0!3m2!1sen!2sin!4v1777611835708!5m2!1sen!2sin"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default Contact