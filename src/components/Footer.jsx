function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p className="footer-name">Keshab Room Rent</p>
        <a 
          href="https://www.google.com/maps/place/Keshab(Room+Rent)/@26.1908949,91.7174035,17z/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-address"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          Doul, Govinda Rd, Baruah Souk, North Guwahati, Assam 781030
        </a>
        <p className="footer-phone">📞 9365844130</p>
        <p className="footer-note">Not available for couples</p>
        <p className="footer-copy">© 2026 Keshab Room Rent. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer