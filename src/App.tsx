import { HeroSection } from './components/HeroSection'

function App() {
  return (
    <>
      <HeroSection />

      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff' }}>Home</h1>
      </section>
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff' }}>About</h1>
      </section>
      <section id="tech" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff' }}>Tech Stack</h1>
      </section>
      <section id="projects" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff' }}>Projects</h1>
      </section>
      <section id="contact" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff' }}>Contact</h1>
      </section>
    </>
  )
}

export default App
