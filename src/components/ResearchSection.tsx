import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, TreePine, Droplets, Mountain, Globe, Building2 } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'Hyrcanian Forest Phenology Analysis',
    period: '2023–2024',
    type: 'MSc Research',
    icon: TreePine,
    color: '#2a9d8f',
    supervisor: 'Prof. H. Latifi',
    description:
      'MODIS time-series phenological characterization of Hyrcanian mixed forests. Investigated relations between phenological parameters and elevation (height) as well as geographical coordinates (lat/lon). Findings presented as a scientific poster.',
    methods: ['MODIS Time-Series', 'Phenology', 'LOESS', 'Seasonal Decomposition'],
    outcome: 'Scientific Poster Presentation',
  },
  {
    id: '02',
    title: 'Agricultural Crop Pattern & Wetland Degradation',
    period: '2023–2026',
    type: 'MSc Thesis',
    icon: Droplets,
    color: '#e9c46a',
    supervisor: 'Prof. H. Latifi & Prof. H. Naghavi',
    description:
      'Analysis of agricultural crop pattern changes on wetland degradation via time series and OBIA. Integrates satellite imagery, metaheuristic optimization, and machine learning for comprehensive monitoring of agro-wetland dynamics.',
    methods: ['OBIA', 'Time-Series', 'ML Classification', 'GEE', 'Metaheuristic Optimization'],
    outcome: 'Q1 Journal Publication',
  },
  {
    id: '03',
    title: 'Long-term Surface Water Mapping',
    period: '2019–2023',
    type: 'BSc Thesis',
    icon: Layers,
    color: '#f4a261',
    supervisor: 'Prof. M.J. Valadan Zoej',
    description:
      'Sentinel-1 SAR backscatter time-series analysis in Google Earth Engine for long-term surface water detection and change mapping. Developed automated workflows for multi-year water body dynamics characterization.',
    methods: ['Sentinel-1 SAR', 'GEE', 'Time-Series Analysis', 'Change Detection'],
    outcome: 'BSc Thesis — Rank 2nd',
  },
  {
    id: '04',
    title: '3D Campus Reconstruction (CRP)',
    period: '2021–2022',
    type: 'BSc Project',
    icon: Building2,
    color: '#e76f51',
    supervisor: 'Prof. M. Varshosaz',
    description:
      'Photogrammetric 3D model of KNTU campus from Close-Range Photogrammetry (CRP). Delivered as a complete geospatial product using Agisoft Metashape, including dense point clouds and textured 3D mesh.',
    methods: ['Agisoft Metashape', 'CRP', 'Point Cloud', '3D Modeling'],
    outcome: 'Geospatial 3D Product',
  },
  {
    id: '05',
    title: 'Ekbatan Dam Surface Change — GEE App',
    period: '2022',
    type: 'BSc Project',
    icon: Mountain,
    color: '#264653',
    supervisor: 'Prof. M.R. Sahebi',
    description:
      'Google Earth Engine web application visualizing before/after surface change at Ekbatan Dam, Hamedan, using multitemporal Landsat imagery. Interactive web interface for public-facing geospatial analysis.',
    methods: ['GEE Web App', 'Landsat', 'Multitemporal Analysis', 'JavaScript'],
    outcome: 'Interactive GEE Web Application',
  },
];

export default function ResearchSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="research" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-12 bg-[#2a9d8f]/50" />
            <span className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest uppercase">02 // Research</span>
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
            Research <span className="text-[#2a9d8f]">Projects</span>
          </h2>
          <p className="text-gray-500 mt-3 font-mono-jet text-sm">
            Field investigations · Geospatial analysis · Environmental monitoring
          </p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-[#2a9d8f]/60 via-[#e9c46a]/30 to-transparent" />

          <div className="space-y-8">
            {projects.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.7 }}
                className="relative flex gap-6 md:gap-10 pl-16 md:pl-24"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-3 md:left-7 top-6 w-6 h-6 rounded-sm flex items-center justify-center text-[10px] font-orbitron font-bold z-10"
                  style={{
                    backgroundColor: `${proj.color}20`,
                    border: `1px solid ${proj.color}`,
                    color: proj.color,
                    boxShadow: `0 0 12px ${proj.color}40`,
                  }}
                >
                  {proj.id}
                </div>

                {/* Card */}
                <div
                  className="flex-1 p-6 bg-[#0d1820] rounded-sm card-hover border border-[#264653]/30 hover:border-opacity-80 transition-all"
                  style={{ borderColor: `${proj.color}20` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0"
                      style={{ backgroundColor: `${proj.color}15` }}
                    >
                      <proj.icon size={20} style={{ color: proj.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className="font-mono-jet text-[10px] px-2 py-0.5 rounded-sm"
                          style={{ color: proj.color, backgroundColor: `${proj.color}10`, border: `1px solid ${proj.color}30` }}
                        >
                          {proj.type}
                        </span>
                        <span className="font-mono-jet text-xs text-gray-600">{proj.period}</span>
                      </div>
                      <h3 className="text-white font-semibold text-lg">{proj.title}</h3>
                      <p className="font-mono-jet text-xs text-gray-500 mt-1">
                        Supervisor: <span className="text-gray-400">{proj.supervisor}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.methods.map(m => (
                      <span key={m} className="tech-tag">{m}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe size={12} style={{ color: proj.color }} />
                    <span className="font-mono-jet text-xs" style={{ color: proj.color }}>
                      {proj.outcome}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
