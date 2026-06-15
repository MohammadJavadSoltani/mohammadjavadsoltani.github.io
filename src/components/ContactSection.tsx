import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Globe, MapPin, User, BookOpen, ExternalLink } from 'lucide-react';

const references = [
  {
    name: 'Prof. H. Latifi',
    email: 'hooman.latifi@kntu.ac.ir',
    role: 'MSc Supervisor',
    color: '#2a9d8f',
  },
  {
    name: 'Prof. H. Naghavi',
    email: 'Naghavi.ha@lu.ac',
    role: 'MSc Co-Supervisor',
    color: '#e9c46a',
  },
  {
    name: 'Prof. M.J. Valadan Zoej',
    email: 'valadanzouj@kntu.ac.ir',
    role: 'BSc Supervisor',
    color: '#f4a261',
  },
];

const contactLinks = [
  {
    label: 'Email',
    value: 'mjavadsoltani@email.kntu.ac.ir',
    href: 'mailto:mjavadsoltani@email.kntu.ac.ir',
    icon: Mail,
    color: '#2a9d8f',
  },
  {
    label: 'ORCID',
    value: '0009-0007-7912-4661',
    href: 'https://orcid.org/0009-0007-7912-4661',
    icon: Globe,
    color: '#e9c46a',
  },
  {
    label: 'Location',
    value: 'Tehran, Iran',
    href: '#',
    icon: MapPin,
    color: '#f4a261',
  },
];

const DataStreamLine = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="font-mono-jet text-[10px] text-[#2a9d8f]/40 truncate"
  >
    {text}
  </motion.div>
);

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background matrix */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Glowing orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(42,157,143,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#2a9d8f]/50" />
            <span className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest uppercase">06 // Contact</span>
            <div className="h-px w-12 bg-[#2a9d8f]/50" />
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
            Initiate <span className="text-[#2a9d8f]">Connection</span>
          </h2>
          <p className="text-gray-500 mt-3 font-mono-jet text-sm max-w-xl mx-auto">
            Open for collaborations, research partnerships, and academic discussions in remote sensing and geospatial intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <div className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest mb-6">DIRECT CHANNELS</div>

            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-5 p-5 bg-[#0d1820] border border-[#264653]/40 rounded-sm card-hover group"
              >
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${link.color}15`, border: `1px solid ${link.color}40` }}
                >
                  <link.icon size={20} style={{ color: link.color }} />
                </div>
                <div className="flex-1">
                  <div className="font-mono-jet text-xs text-gray-500 tracking-wider mb-1">{link.label}</div>
                  <div className="text-white text-sm group-hover:text-[#2a9d8f] transition-colors">{link.value}</div>
                </div>
                {link.href.startsWith('http') && (
                  <ExternalLink size={14} className="text-gray-600 group-hover:text-[#2a9d8f] transition-colors" />
                )}
              </motion.a>
            ))}

            {/* Data stream visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="p-4 bg-[#0a0f14] border border-[#264653]/20 rounded-sm mt-4 space-y-1 overflow-hidden"
            >
              <DataStreamLine text=">> INITIALIZING HANDSHAKE..." delay={0.9} />
              <DataStreamLine text=">> SATELLITE UPLINK: STABLE" delay={1.0} />
              <DataStreamLine text=">> DATA RATE: 1.2 Gbps" delay={1.1} />
              <DataStreamLine text=">> ENCRYPTION: AES-256" delay={1.2} />
              <DataStreamLine text=">> READY TO RECEIVE MESSAGE..." delay={1.3} />
            </motion.div>
          </motion.div>

          {/* References */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="font-mono-jet text-xs text-[#e9c46a] tracking-widest mb-6">ACADEMIC REFERENCES</div>
            <div className="space-y-4">
              {references.map((ref_item, i) => (
                <motion.div
                  key={ref_item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="p-5 bg-[#0d1820] border rounded-sm card-hover"
                  style={{ borderColor: `${ref_item.color}30` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${ref_item.color}15`, border: `1px solid ${ref_item.color}40` }}
                    >
                      <User size={16} style={{ color: ref_item.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{ref_item.name}</div>
                      <div
                        className="font-mono-jet text-[10px] tracking-wider mt-0.5"
                        style={{ color: ref_item.color }}
                      >
                        {ref_item.role}
                      </div>
                      <a
                        href={`mailto:${ref_item.email}`}
                        className="flex items-center gap-1.5 mt-2 font-mono-jet text-xs text-gray-500 hover:text-[#2a9d8f] transition-colors"
                      >
                        <Mail size={10} />
                        {ref_item.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* KNTU badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-6 p-5 bg-[#0d1820] border border-[#264653]/30 rounded-sm flex items-center gap-4"
            >
              <BookOpen size={20} className="text-[#2a9d8f] flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm">K.N. Toosi University of Technology</div>
                <div className="font-mono-jet text-xs text-gray-500 mt-1">
                  Remote Sensing & Photogrammetry · Tehran, Iran
                </div>
                <div className="font-mono-jet text-xs text-[#2a9d8f] mt-1">
                  MSc Rank 1 · 2023–2026
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#264653]/30 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="font-orbitron text-xs text-gray-600 tracking-widest">
          MOHAMMAD JAVAD SOLTANI · <span className="text-[#2a9d8f]">MJS.RS</span>
        </div>
        <div className="font-mono-jet text-xs text-gray-700">
          Remote Sensing Researcher · KNTU · Tehran, Iran
        </div>
        <div className="font-mono-jet text-xs text-gray-700">
          DOB: Sep 2000 · © 2025
        </div>
      </motion.div>
    </section>
  );
}
