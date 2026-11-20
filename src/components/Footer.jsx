import Logo from './Logo'

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="flex justify-center mb-2">
          <Logo 
            showText={true} 
            textClass="text-white !text-xl md:!text-2xl" 
            subTextClass="!text-primary-light"
            iconSize="w-11 h-11 md:w-12 h-12" 
          />
        </div>
        <a 
          href="https://www.google.com/maps/place/Keshab(Room+Rent)/@26.1908949,91.7174035,17z/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-address"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          Doul, Govinda Rd, Baruah Souk, North Guwahati, Assam 781030
        </a>
        <p className="footer-phone">📞 Mr. Keshab Baishya: 9365844130</p>
        <p className="footer-note">Not available for unmarried couples</p>
        <p className="footer-copy">© 2026 Keshab Room Rent. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer