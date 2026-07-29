import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { HeroBackdrop } from "./components/HeroBackdrop";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { TechStackSection } from "./components/TechStackSection";
import { WaveDivider } from "./components/WaveDivider";
import { ContactSection } from "./components/ContactSection";

function App() {
  return (
    <>
      <Navbar />
      <section id="home" style={{ position: "relative" }}>
        <HeroBackdrop />
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      {/* front wave pours into Tech's top */}
      <WaveDivider fill="#121217" />
      <section id="tech">
        <TechStackSection />
      </section>
      {/* front wave pours into Projects' top */}
      <WaveDivider fill="#121217" />
      <section id="projects">
        <ProjectsSection />
      </section>
      {/* front wave pours into the Contact section */}
      <WaveDivider fill="#0d0e14" />
      <section
        id="contact"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "#fff" }}>Contact</h1>
        <ContactSection />
      </section>
    </>
  );
}

export default App;
