import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Satellite, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0f14]/90 backdrop-blur-md border-b border-[#2a9d8f]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-[#2a9d8f]/20 rounded-sm rotate-45 group-hover:bg-[#2a9d8f]/40 transition-all" />
            <Satellite className="relative z-10 w-full h-full text-[#2a9d8f] p-1" />
          </div>
          <span className="font-orbitron font-bold text-sm tracking-widest text-white">
            MJS<span className="text-[#2a9d8f]">.RS</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className={`relative px-4 py-2 text-sm font-mono-jet tracking-wider transition-colors ${
                active === item.label ? 'text-[#e9c46a]' : 'text-gray-400 hover:text-[#2a9d8f]'
              }`}
              whileHover={{ y: -2 }}
            >
              {active === item.label && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-[#2a9d8f]/10 border border-[#2a9d8f]/30 rounded-sm"
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#2a9d8f] animate-pulse" />
          <span className="font-mono-jet text-xs text-[#2a9d8f]">ONLINE</span>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#2a9d8f]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0f14]/95 border-t border-[#2a9d8f]/20"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => { setActive(item.label); setMenuOpen(false); }}
                className="block px-6 py-3 text-sm font-mono-jet text-gray-400 hover:text-[#2a9d8f] border-b border-[#264653]/30"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
