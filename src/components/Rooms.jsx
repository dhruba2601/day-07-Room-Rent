const roomData = [
  { id: 1, type: "Single Room", category: "Bachelor", floor: "Top Floor", price: "₹7,000/month" },
  { id: 2, type: "Shared Room", category: "Bachelor", floor: "Top Floor", price: "₹7,500/month" },
  { id: 3, type: "Family Room", category: "Family", floor: "Ground Floor", price: "₹12,000/month" },
]

function Rooms() {
  return (
    <section id="rooms">
      <h2 className="reveal">Available Rooms</h2>
      <p className="not-available reveal reveal-delay-1">❌ Not available for couples</p>
      <div className="rooms-grid">
        {roomData.map((room, index) => (
          <div className={`room-card reveal reveal-delay-${index + 1}`} key={room.id}>
            <h3>{room.type}</h3>
            <p>{room.category}</p>
            <p>{room.floor}</p>
            <p className="room-price">{room.price}</p>
            <a href="#contact" className="room-btn">Book Now</a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Rooms