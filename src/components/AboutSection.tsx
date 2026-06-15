import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Award, BookOpen, FlaskConical, GraduationCap } from 'lucide-react';

const stats = [
  { label: 'MSc GPA', value: 3.71, suffix: '/4.0', decimals: 2, icon: GraduationCap, color: '#2a9d8f' },
  { label: 'Publications', value: 3, suffix: '+', decimals: 0, icon: BookOpen, color: '#e9c46a' },
  { label: 'Research Projects', value: 5, suffix: '+', decimals: 0, icon: FlaskConical, color: '#f4a261' },
  { label: 'Academic Rank', value: 1, suffix: 'st', decimals: 0, icon: Award, color: '#e76f51' },
];

const profileImage = `${import.meta.env.BASE_URL}images/profile.png`;

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="relative py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-12 bg-[#2a9d8f]/50" />
            <span className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest uppercase">01 // About</span>
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
            Decoding Earth's <span className="text-[#2a9d8f]">Signals</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile image + HUD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute -inset-4 rounded-full border border-[#2a9d8f]/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute -inset-8 rounded-full border border-[#e9c46a]/10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

              {/* Hex profile */}
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 hex-clip bg-gradient-to-br from-[#264653] to-[#2a9d8f]/40" />
                <img
                  src={profileImage}
                  alt="Mohammad Javad Soltani"
                  className="hex-clip w-full h-full object-cover opacity-80"
                />
                {/* Overlay scan */}
                <div className="absolute inset-0 hex-clip shimmer pointer-events-none" />
              </div>

              {/* HUD labels */}
              <div className="absolute -right-4 top-8 font-mono-jet text-[10px] text-[#2a9d8f]/70 text-right space-y-1">
                <div>MSc RANK: <span className="text-[#e9c46a]">01</span></div>
                <div>KNTU — TEHRAN</div>
                <div>2023–2026</div>
              </div>
              <div className="absolute -left-4 bottom-8 font-mono-jet text-[10px] text-[#2a9d8f]/70 space-y-1">
                <div>BSc RANK: <span className="text-[#e9c46a]">02</span></div>
                <div>GPA: 3.6/4.0</div>
                <div>2019–2023</div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed text-base">
              I am a Remote Sensing researcher at{' '}
              <span className="text-[#2a9d8f] font-semibold">K.N. Toosi University of Technology (KNTU)</span>,
              pursuing my MSc under the supervision of{' '}
              <span className="text-[#e9c46a]">Prof. H. Latifi</span> and{' '}
              <span className="text-[#e9c46a]">Prof. H. Naghavi</span>.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My research focuses on <strong className="text-white">Environmental Engineering</strong>,
              <strong className="text-white">Remote Sensing</strong>, and machine learning to monitor agro-wetland and forest
              ecosystems. I specialize in multi-decadal time-series analysis using platforms like{' '}
              <span className="text-[#2a9d8f]">Google Earth Engine</span>.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My MSc thesis investigates{' '}
              <em className="text-gray-200">agricultural crop pattern changes and their effects on wetland degradation</em>{' '}
              via time series and OBIA methodologies. Published in ISI journals including{' '}
              <span className="text-[#f4a261]">Remote Sensing Applications, Wetlands</span> and{' '}
              <span className="text-[#f4a261]">ISPRS Annals</span>.
            </p>

            {/* Education timeline */}
            <div className="space-y-6 mt-6">
              {[
                {
                  degree: 'MSc Remote Sensing & Photogrammetry',
                  school: 'KNTU',
                  year: '2023–2026',
                  gpa: 'GPA: 3.71/4.0 | Rank 1st',
                  color: '#2a9d8f',
                },
                {
                  degree: 'BSc Geomatics Engineering',
                  school: 'KNTU',
                  year: '2019–2023',
                  gpa: 'GPA: 3.6/4.0 | Rank 2nd',
                  color: '#e9c46a',
                },
              ].map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="flex items-start gap-4 p-4 bg-[#0d1820] border border-[#264653]/50 rounded-sm hud-corner card-hover"
                >
                  <div className="w-1 self-stretch rounded" style={{ backgroundColor: edu.color }} />
                  <div>
                    <div className="font-semibold text-white text-sm">{edu.degree}</div>
                    <div className="font-mono-jet text-xs text-gray-500 mt-1">
                      {edu.school} · {edu.year}
                    </div>
                    <div className="font-mono-jet text-xs mt-1" style={{ color: edu.color }}>
                      {edu.gpa}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="relative p-6 bg-[#0d1820] border border-[#264653]/40 rounded-sm text-center hud-corner card-hover"
              >
                <Icon size={24} className="mx-auto mb-3" style={{ color: stat.color }} />
                <div className="font-orbitron text-3xl font-bold" style={{ color: stat.color }}>
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      decimals={stat.decimals}
                      duration={2}
                      delay={0.8 + i * 0.1}
                    />
                  ) : '0'}
                  {stat.suffix}
                </div>
                <div className="font-mono-jet text-xs text-gray-500 mt-2 tracking-wider">
                  {stat.label}
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
