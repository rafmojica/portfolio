import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { HeroBackdrop } from './components/HeroBackdrop'
import { AboutSection } from './components/AboutSection'
import { ProjectsSection } from './components/ProjectsSection'
import { TechStackSection } from './components/TechStackSection'

function App() {
  return (
    <>
      <Navbar />
      <section id="home" style={{ position: 'relative' }}>
        <HeroBackdrop />
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="tech">
        <TechStackSection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="contact" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff' }}>Contact</h1>
      </section>
    </>
  )
}

export default App
