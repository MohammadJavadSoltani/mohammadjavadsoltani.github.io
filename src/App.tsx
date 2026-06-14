import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ResearchSection from './components/ResearchSection';
import TimelineViz from './components/TimelineViz';
import PublicationsSection from './components/PublicationsSection';
import WetlandMapViz from './components/WetlandMapViz';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import SatelliteOrbit from './components/SatelliteOrbit';
import GeoDataStrip from './components/GeoDataStrip';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0f14] text-white overflow-x-hidden">
      {/* Global particle background */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero */}
        <HeroSection />

        {/* Orbital divider */}
        <div className="flex items-center justify-center py-8 relative z-10">
          <div className="flex-1 neon-line max-w-xs" />
          <div className="mx-6">
            <SatelliteOrbit />
          </div>
          <div className="flex-1 neon-line max-w-xs" />
        </div>

        {/* About */}
        <AboutSection />

        {/* Neon divider */}
        <div className="neon-line mx-auto max-w-4xl" />

        {/* Research Projects */}
        <ResearchSection />

        {/* Geo Data Strip */}
        <GeoDataStrip />

        {/* Phenology Time Series Viz */}
        <TimelineViz />

        {/* Neon divider */}
        <div className="neon-line mx-auto max-w-4xl" />

        {/* Publications */}
        <PublicationsSection />

        {/* Wetland Map Visualization */}
        <WetlandMapViz />

        {/* Neon divider */}
        <div className="neon-line mx-auto max-w-4xl" />

        {/* Geo Data Strip 2 */}
        <GeoDataStrip />

        {/* Skills */}
        <SkillsSection />

        {/* Neon divider */}
        <div className="neon-line mx-auto max-w-4xl" />

        {/* Experience */}
        <ExperienceSection />

        {/* Neon divider */}
        <div className="neon-line mx-auto max-w-4xl" />

        {/* Contact */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
