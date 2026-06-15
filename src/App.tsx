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

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0f14] text-white overflow-x-hidden">
      {/* Fixed particle background */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* All sections stacked in a single scrollable flow */}
      <main className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Orbital divider ── */}
        <div className="flex items-center justify-center py-10">
          <div className="flex-1 neon-line max-w-xs ml-6" />
          <div className="mx-8">
            <SatelliteOrbit />
          </div>
          <div className="flex-1 neon-line max-w-xs mr-6" />
        </div>

        {/* ── About ── */}
        <AboutSection />

        {/* ── Geo ticker ── */}
        <GeoDataStrip />

        {/* ── Research Projects ── */}
        <ResearchSection />

        {/* ── Neon divider ── */}
        <div className="neon-line mx-auto max-w-4xl my-4" />

        {/* ── Phenology chart ── */}
        <TimelineViz />

        {/* ── Neon divider ── */}
        <div className="neon-line mx-auto max-w-4xl my-4" />

        {/* ── Publications ── */}
        <PublicationsSection />

        {/* ── Wetland map viz ── */}
        <WetlandMapViz />

        {/* ── Geo ticker 2 ── */}
        <GeoDataStrip />

        {/* ── Skills ── */}
        <SkillsSection />

        {/* ── Neon divider ── */}
        <div className="neon-line mx-auto max-w-4xl my-4" />

        {/* ── Experience ── */}
        <ExperienceSection />

        {/* ── Neon divider ── */}
        <div className="neon-line mx-auto max-w-4xl my-4" />

        {/* ── Contact + Footer ── */}
        <ContactSection />

      </main>
    </div>
  );
}
