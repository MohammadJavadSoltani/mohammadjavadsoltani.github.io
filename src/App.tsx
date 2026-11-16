import { useEffect, useState } from 'react';
import { ContactFooter } from './components/ContactFooter';
import { DynamicEarthStage } from './components/DynamicEarthStage';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ResearchSection } from './components/ResearchSection';
import { TimelineAndSkillsSection } from './components/TimelineAndSkillsSection';
import { ViewportHudRail } from './components/ViewportHudRail';
import { useReducedMotion } from './hooks/useReducedMotion';
import { startScroll } from './lib/scroll';

export default function App() {
  const reduced = useReducedMotion();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  useEffect(() => startScroll(reduced), [reduced]);

  return (
    <>
      <DynamicEarthStage onSceneChange={setActiveSceneIndex} />
      <Navbar />
      <div className="relative z-10">
        <main>
          <HeroSection />
          <ResearchSection />
          <PublicationsSection />
          <ProjectsSection />
          <TimelineAndSkillsSection />
        </main>
        <ContactFooter />
      </div>
      <ViewportHudRail activeSceneIndex={activeSceneIndex} />
    </>
  );
}
