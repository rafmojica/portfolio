import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { HeroBackdrop } from './components/HeroBackdrop'
import { AboutSection } from './components/AboutSection'
import { ProjectsSection } from './components/ProjectsSection'
import { TechStackSection } from './components/TechStackSection'
import { ContactSection } from './components/ContactSection'

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
      <section id="contact">
        <ContactSection />
      </section>
    </>
  )
}

export default App
