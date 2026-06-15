import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const skillCategories = [
  {
    category: 'Programming',
    color: '#2a9d8f',
    icon: '⌨️',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'R', level: 75 },
      { name: 'MATLAB', level: 70 },
      { name: 'C++', level: 60 },
      { name: 'JavaScript (GEE)', level: 85 },
    ],
  },
  {
    category: 'Remote Sensing & GIS',
    color: '#e9c46a',
    icon: '🛰️',
    skills: [
      { name: 'Google Earth Engine', level: 95 },
      { name: 'ENVI', level: 80 },
      { name: 'SNAP', level: 80 },
      { name: 'QGIS', level: 85 },
      { name: 'ArcGIS', level: 75 },
      { name: 'GMTSAR', level: 65 },
    ],
  },
  {
    category: 'Photogrammetry & 3D',
    color: '#f4a261',
    icon: '🗺️',
    skills: [
      { name: 'Agisoft Metashape', level: 85 },
      { name: 'Pix4D', level: 75 },
      { name: 'CloudCompare', level: 80 },
      { name: 'LAStools', level: 70 },
      { name: 'iTwin', level: 60 },
    ],
  },
  {
    category: 'ML & Optimization',
    color: '#e76f51',
    icon: '🤖',
    skills: [
      { name: 'Random Forest', level: 90 },
      { name: 'SVM', level: 85 },
      { name: 'Grey Wolf Optimizer', level: 90 },
      { name: 'SMOTE variants', level: 85 },
      { name: 'GAN-based Augmentation', level: 75 },
    ],
  },
];

const radarData = [
  { subject: 'Remote\nSensing', A: 95 },
  { subject: 'Machine\nLearning', A: 88 },
  { subject: 'GEE', A: 95 },
  { subject: 'Python', A: 93 },
  { subject: 'Photogram.', A: 80 },
  { subject: 'Time Series', A: 90 },
  { subject: 'Optimization', A: 88 },
  { subject: 'GIS', A: 85 },
];

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay: number;
  inView: boolean;
}

const SkillBar = ({ name, level, color, delay, inView }: SkillBarProps) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <span className="font-mono-jet text-xs text-gray-300">{name}</span>
      <span className="font-mono-jet text-xs" style={{ color }}>{level}%</span>
    </div>
    <div className="h-1.5 bg-[#0a0f14] rounded-full overflow-hidden border border-[#264653]/30">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
    </div>
  </div>
);

const timeSeriesTechniques = [
  'Mann-Kendall', 'Theil-Sen', 'LOESS', 'Seasonal Decomposition',
  'Phenology Analysis', 'MODIS Archives', 'AVHRR Long-term', 'Change Detection',
];

export default function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="relative py-32 px-6 sm:px-10 lg:px-16">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-12 bg-[#f4a261]/50" />
            <span className="font-mono-jet text-xs text-[#f4a261] tracking-widest uppercase">04 // Skills</span>
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
            Technical <span className="text-[#f4a261]">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 flex flex-col"
          >
            <div className="p-6 bg-[#0d1820] border border-[#264653]/40 rounded-sm h-full">
              <div className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest mb-4">SKILL RADAR</div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#264653" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  />
                  <Radar
                    name="Proficiency"
                    dataKey="A"
                    stroke="#2a9d8f"
                    fill="#2a9d8f"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0d1820',
                      border: '1px solid #2a9d8f40',
                      borderRadius: '2px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '11px',
                      color: '#2a9d8f',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>

              {/* Time series techniques */}
              <div className="mt-4">
                <div className="font-mono-jet text-xs text-[#e9c46a] tracking-widest mb-3">TIME SERIES & TREND</div>
                <div className="flex flex-wrap gap-2">
                  {timeSeriesTechniques.map(t => (
                    <span
                      key={t}
                      className="font-mono-jet text-[10px] px-2 py-1 rounded-sm border"
                      style={{ color: '#e9c46a', borderColor: '#e9c46a30', backgroundColor: '#e9c46a0a' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skill bars */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + ci * 0.1, duration: 0.7 }}
                className="p-6 bg-[#0d1820] border border-[#264653]/40 rounded-sm hud-corner"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xl">{cat.icon}</span>
                  <div>
                    <div
                      className="font-mono-jet text-xs tracking-widest"
                      style={{ color: cat.color }}
                    >
                      {cat.category.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      delay={0.3 + ci * 0.1 + si * 0.08}
                      inView={inView}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Software logos row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-10 p-6 bg-[#0d1820] border border-[#264653]/30 rounded-sm"
        >
          <div className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest mb-4">SOFTWARE ECOSYSTEM</div>
          <div className="flex flex-wrap gap-3">
            {[
              'Google Earth Engine', 'Python / NumPy / GDAL', 'ENVI', 'SNAP',
              'QGIS', 'ArcGIS Pro', 'GMTSAR', 'Agisoft Metashape',
              'Pix4D', 'CloudCompare', 'LAStools', 'iTwin',
              'scikit-learn', 'TensorFlow', 'R / ggplot2', 'MATLAB',
            ].map(sw => (
              <span key={sw} className="tech-tag">{sw}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
