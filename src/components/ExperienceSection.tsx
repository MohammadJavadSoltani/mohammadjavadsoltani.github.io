import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Trophy, Users, Mic } from 'lucide-react';

const experiences = [
  {
    id: 'E1',
    role: 'Lecturer: Remote Sensing Applications (GEE)',
    org: 'Maktabkhooneh Online Platform',
    period: 'Dec 2024',
    type: 'Teaching',
    icon: Mic,
    color: '#2a9d8f',
    description:
      'Designed and delivered a comprehensive digital course covering Remote Sensing fundamentals through advanced Google Earth Engine applications. Built curriculum from scratch for online learners.',
    tags: ['GEE', 'Teaching', 'Online Education', 'Remote Sensing'],
  },
  {
    id: 'E2',
    role: 'Research Assistant: Processing Systems & Optimization',
    org: 'Basir RS Institution',
    period: 'Jun – Oct 2023',
    type: 'Research',
    icon: Briefcase,
    color: '#e9c46a',
    description:
      'Optimized MODIS data acquisition pipelines and improved geospatial data handling workflows. Enhanced system efficiency for large-scale remote sensing data processing operations.',
    tags: ['MODIS', 'Data Optimization', 'Geospatial', 'Python'],
  },
];

const teaching = [
  {
    course: 'Remote Sensing Basics',
    prof: 'Prof. M.R. Sahebi',
    color: '#2a9d8f',
  },
  {
    course: 'Image Processing',
    prof: 'Prof. T. Managhebi',
    color: '#e9c46a',
  },
  {
    course: 'Programming C++',
    prof: 'Prof. A. Hosseininaveh',
    color: '#f4a261',
  },
  {
    course: 'Ecological Applications of RS',
    prof: 'Prof. H. Latifi',
    color: '#e76f51',
  },
];

const awards = [
  {
    title: 'Ranked 1st — MSc RS & Photogrammetry',
    year: '2024',
    icon: Trophy,
    color: '#e9c46a',
  },
  {
    title: 'Ranked 2nd — BSc Geomatics & Geodesy',
    year: '2022',
    icon: Trophy,
    color: '#2a9d8f',
  },
  {
    title: "Dean's List: Best Student of the Year",
    year: '2022',
    icon: Trophy,
    color: '#f4a261',
  },
  {
    title: 'INEF MSc Scholarship',
    year: '2023',
    icon: GraduationCap,
    color: '#e76f51',
  },
  {
    title: 'Secretary SSA: KNTU',
    year: 'Sep 2023 – Dec 2024',
    icon: Users,
    color: '#2a9d8f',
  },
  {
    title: 'Event Organizer: 8th & 9th GeoLeague',
    year: '2023–2024',
    icon: Users,
    color: '#e9c46a',
  },
];

export default function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="relative py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-12 bg-[#e76f51]/50" />
            <span className="font-mono-jet text-xs text-[#e76f51] tracking-widest uppercase">05 // Experience</span>
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
            Professional <span className="text-[#e76f51]">Journey</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Work experience */}
          <div className="lg:col-span-3 space-y-6">
            <div className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest mb-6">WORK EXPERIENCE</div>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="relative p-6 bg-[#0d1820] border border-[#264653]/40 rounded-sm card-hover overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)` }}
                />
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${exp.color}15`, border: `1px solid ${exp.color}40` }}
                  >
                    <exp.icon size={18} style={{ color: exp.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="text-white font-semibold">{exp.role}</h3>
                      <span
                        className="font-mono-jet text-[10px] px-2 py-0.5 rounded-sm"
                        style={{ color: exp.color, backgroundColor: `${exp.color}10`, border: `1px solid ${exp.color}30` }}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <p className="font-mono-jet text-xs text-gray-500 mb-3">
                      {exp.org} · {exp.period}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Teaching Assistant */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="p-6 bg-[#0d1820] border border-[#264653]/40 rounded-sm card-hover"
            >
              <div className="flex items-center gap-3 mb-5">
                <GraduationCap size={18} className="text-[#2a9d8f]" />
                <span className="font-mono-jet text-xs text-[#2a9d8f] tracking-wider">TEACHING ASSISTANT ROLES</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {teaching.map((t) => (
                  <div
                    key={t.course}
                    className="p-3 rounded-sm border flex flex-col gap-1"
                    style={{ borderColor: `${t.color}25`, backgroundColor: `${t.color}08` }}
                  >
                    <span className="text-sm text-white font-medium">{t.course}</span>
                    <span className="font-mono-jet text-[10px] text-gray-500">{t.prof}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Awards & Achievements */}
          <div className="lg:col-span-2">
            <div className="font-mono-jet text-xs text-[#e9c46a] tracking-widest mb-6">AWARDS & ACHIEVEMENTS</div>
            <div className="space-y-3">
              {awards.map((award, i) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-[#0d1820] border border-[#264653]/30 rounded-sm card-hover"
                >
                  <award.icon size={16} style={{ color: award.color }} className="flex-shrink-0" />
                  <div>
                    <div className="text-sm text-white">{award.title}</div>
                    <div className="font-mono-jet text-[10px] text-gray-500 mt-0.5">{award.year}</div>
                  </div>
                  <div
                    className="ml-auto w-1 self-stretch rounded"
                    style={{ backgroundColor: award.color }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-6 p-5 bg-[#0d1820] border border-[#264653]/30 rounded-sm"
            >
              <div className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest mb-4">LANGUAGES</div>
              <div className="space-y-3">
                {[
                  { lang: 'Persian', level: 'Native', pct: 100, color: '#2a9d8f' },
                  { lang: 'English', level: 'Highly Proficient — IELTS Band 7.5 (expected Dec 2026)', pct: 85, color: '#e9c46a' },
                ].map(l => (
                  <div key={l.lang} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-white">{l.lang}</span>
                      <span className="font-mono-jet text-xs text-gray-500">{l.level.split('—')[0].trim()}</span>
                    </div>
                    <div className="h-1 bg-[#0a0f14] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${l.pct}%`,
                          backgroundColor: l.color,
                          boxShadow: `0 0 8px ${l.color}60`,
                        }}
                      />
                    </div>
                    {l.level.includes('—') && (
                      <div className="font-mono-jet text-[10px] text-gray-600">
                        {l.level.split('—')[1].trim()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
