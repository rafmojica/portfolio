import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { HeroBackdrop } from "./components/HeroBackdrop";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { TechStackSection } from "./components/TechStackSection";
import { WaveDivider } from "./components/WaveDivider";
import { ContactSection } from "./components/ContactSection";
import { MobileNav } from "./components/MobileNav";
import { HomeMobile } from "./components/HomeMobile";
import { AboutMobile } from "./components/AboutMobile";
import { ProjectsMobile } from "./components/ProjectsMobile";
import { ContactMobile } from "./components/ContactMobile";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <MobileNav />
        <section id="home">
          <HomeMobile />
        </section>
        <WaveDivider bg="#08080b" fill={{ from: "#203c46", to: "#162a32" }} />
        <section id="about">
          <AboutMobile />
        </section>
        <WaveDivider bg="radial-gradient(125% 120% at 50% 0%, #060b0e, #091015 62%)" fill="#121217" />
        <section id="tech">
          <TechStackSection autoOpen />
        </section>
        <WaveDivider bg="#08080b" fill="#121217" />
        <section id="projects">
          <ProjectsMobile />
        </section>
        <WaveDivider bg="#08080b" fill="#050604" />
        <section id="contact">
          <ContactMobile />
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section id="home" style={{ position: "relative" }}>
        <HeroBackdrop />
        <HeroSection />
      </section>
      {/* Hero's floor is a flat #08080b (its bottom fade over #0b0b0e); About opens with a
          radial (bright teal center → darker corners), so the front wave mirrors that edge. */}
      <WaveDivider bg="#08080b" fill={{ from: "#203c46", to: "#162a32" }} />
      <section id="about">
        <AboutSection />
      </section>
      {/* Seam rises from About's floor: its gradient has settled to #091015 by the bottom,
          but the bottom vignette darkens the center — so mirror that (dark top-center → #091015
          at the sides) instead of a flat fill. Front wave pours into Tech's top. */}
      <WaveDivider bg="radial-gradient(125% 120% at 50% 0%, #060b0e, #091015 62%)" fill="#121217" />
      <section id="tech">
        <TechStackSection />
      </section>
      {/* seam rises from Tech's vignetted floor, front wave pours into Projects' top */}
      <WaveDivider bg="#08080b" fill="#121217" />
      <section id="projects">
        <ProjectsSection />
      </section>
      {/* seam rises from Projects' vignetted floor, front wave pours into Contact */}
      <WaveDivider bg="#08080b" fill="#050604" />
      <section
        id="contact"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ContactSection />
      </section>
    </>
  );
}

export default App;
