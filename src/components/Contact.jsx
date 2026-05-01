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
              height="300"
              style={{ border: 0, borderRadius: '4px' }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=26.190332,91.713976&z=17&output=embed"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default Contact