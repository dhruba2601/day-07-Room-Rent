import { useState } from 'react'

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
    <section id="gallery">
      <h2 className="reveal">Gallery</h2>
      <div className="gallery-grid">
        {galleryData.map((item, index) => (
          <div
            className={`gallery-item reveal reveal-delay-${(index % 3) + 1}`}
            key={item.id}
            onClick={() => setSelected(item)}
          >
            <img src={item.src} alt={item.label} loading="lazy" decoding="async" />
            <p className="gallery-label">{item.label}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
            <img src={selected.src} alt={selected.label} decoding="async" />
            <p>{selected.label}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery