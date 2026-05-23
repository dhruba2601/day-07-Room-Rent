import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Rooms from './components/Rooms'
import Amenities from './components/Amenities'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <div>
      <CustomCursor />
      <Navbar />
      
      <Hero />
      <Gallery />
      <Rooms />
      <Amenities />
      <Reviews />
      <Contact />
      
      <Chatbot />
      <Footer />
    </div>
  )
}

export default App