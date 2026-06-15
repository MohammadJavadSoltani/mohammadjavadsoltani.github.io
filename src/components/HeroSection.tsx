import * as React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, MapPin, Mail, Globe } from 'lucide-react';
import RadarChart from './RadarViz';

export default function HeroSection() {
  const heroImage = `${import.meta.env.BASE_URL}images/hero-bg.jpg`;

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 grid-bg opacity-40" />

      {/* Animated corner HUD */}
      <div className="absolute top-24 left-8 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-mono-jet text-[#2a9d8f]/60 text-xs space-y-1"
        >
          <div className="flex items-center gap-2">
            <span className="w-4 h-px bg-[#2a9d8f]/60" />
            <span>LAT: 35.7219°N</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-px bg-[#2a9d8f]/60" />
            <span>LON: 51.3347°E</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-px bg-[#2a9d8f]/60" />
            <span>ALT: 1200m</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-px bg-[#2a9d8f]/60" />
            <span>SYS: ONLINE</span>
          </div>
        </motion.div>
      </div>

      {/* Right side radar */}
      <div className="absolute top-24 right-8 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <RadarChart />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-[#2a9d8f]/40 bg-[#2a9d8f]/10 rounded-sm"
        >
          <div className="w-2 h-2 bg-[#2a9d8f] rounded-full animate-pulse" />
          <span className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest">
            REMOTE SENSING RESEARCHER · KNTU MSc RANK 1
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
        >
          <span className="text-white">MOHAMMAD</span>
          <br />
          <span className="text-[#2a9d8f] glow-teal">JAVAD SOLTANI</span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl mb-8 font-mono-jet text-[#e9c46a]"
        >
          <TypeAnimation
            sequence={[
              'Remote Sensing Specialist',
              2000,
              'OBIA & ML Researcher',
              2000,
              'Google Earth Engine Expert',
              2000,
              'Wetland & Forest Analyst',
              2000,
              'Metaheuristic Optimizer',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
          <span className="cursor-blink text-[#2a9d8f]">_</span>
        </motion.div>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-gray-400 font-mono-jet"
        >
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-[#2a9d8f]" />
            Tehran, Iran
          </span>
          <span className="flex items-center gap-1">
            <Mail size={14} className="text-[#2a9d8f]" />
            mjavadsoltani@email.kntu.ac.ir
          </span>
          <a
            href="https://orcid.org/0009-0007-7912-4661"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#2a9d8f] transition-colors"
          >
            <Globe size={14} className="text-[#e9c46a]" />
            ORCID: 0009-0007-7912-4661
          </a>
          <a
            href="https://www.youtube.com/@geomatics_free8153"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#2a9d8f] transition-colors"
          >
            <span className="text-[#e76f51] text-xs">▶</span>
            YouTube
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="#research"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(42,157,143,0.5)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-[#2a9d8f] text-[#0a0f14] font-orbitron font-bold text-sm tracking-widest rounded-sm hover:bg-[#2a9d8f]/90 transition-all"
          >
            EXPLORE RESEARCH
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(233,196,106,0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 border border-[#e9c46a]/50 text-[#e9c46a] font-orbitron font-bold text-sm tracking-widest rounded-sm hover:bg-[#e9c46a]/10 transition-all"
          >
            CONTACT ME
          </motion.a>
        </motion.div>

        {/* Neon divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="neon-line mt-16 w-64 mx-auto"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono-jet text-xs text-gray-500 tracking-widest">SCROLL</span>
        <ChevronDown size={20} className="text-[#2a9d8f]" />
      </motion.div>

      {/* Bottom scanline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2a9d8f]/50 to-transparent" />
    </section>
  );
}
