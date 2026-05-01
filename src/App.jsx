import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Rooms from './components/Rooms'
import Amenities from './components/Amenities'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <Navbar />
      <Hero />
      <Gallery />
      <Rooms />
      <Amenities />
      <Contact />
      <Footer />
    </div>
  )
}

export default App