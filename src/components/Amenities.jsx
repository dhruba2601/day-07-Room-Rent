const amenityData = [
  { id: 1, icon: "🚗", title: "Parking", description: "Safe and spacious parking available for residents" },
  { id: 2, icon: "💧", title: "Water Supply", description: "24/7 clean water supply throughout the building" },
  { id: 3, icon: "🚿", title: "Attached Bathroom", description: "Private attached bathroom with every room" },
]

function Amenities() {
  return (
    <section id="amenities">
      <h2 className="reveal">Amenities</h2>
      <div className="amenities-grid">
        {amenityData.map((amenity, index) => (
          <div className={`amenity-card reveal reveal-delay-${index + 1}`} key={amenity.id}>
            <span className="amenity-icon">{amenity.icon}</span>
            <h3>{amenity.title}</h3>
            <p>{amenity.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Amenities