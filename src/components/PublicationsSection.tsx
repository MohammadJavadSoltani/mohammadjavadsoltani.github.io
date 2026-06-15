import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, FileText, BookOpen, Microscope } from 'lucide-react';

const publications = [
  {
    id: 'P1',
    title: 'Beyond Trial-and-Error: Geometrically balanced, Multi-Objective Optimization for Segmenting Remote Sensing Data Over Complex Environments',
    journal: 'Remote Sensing Applications, Society & Environment',
    year: 2026,
    doi: '10.1016/j.rsase.2026.102050',
    doiUrl: 'https://doi.org/10.1016/j.rsase.2026.102050',
    status: 'Published',
    type: 'Q1 Journal',
    tags: ['OBIA', 'Metaheuristic Optimization', 'Segmentation', 'Remote Sensing'],
    color: '#2a9d8f',
    highlight: true,
  },
  {
    id: 'P2',
    title: 'Hybrid Data Augmentation and Object-Based Analysis for LULC Mapping with Imbalanced Training Data in Complex Wetlands',
    journal: 'Wetlands',
    year: 2025,
    doi: null,
    doiUrl: null,
    status: 'Under Review (2nd Revision)',
    type: 'Q1 Journal',
    tags: ['LULC', 'SMOTE', 'OBIA', 'Wetlands', 'Data Augmentation'],
    color: '#e9c46a',
    highlight: false,
  },
  {
    id: 'P3',
    title: 'Modeling tree decline trends using hybrid feature engineering and climatic trend analysis',
    journal: 'ISPRS Annals of Photogrammetry',
    year: 2025,
    doi: '10.5194/isprs-annals-X-4-W8-2025-729-2026',
    doiUrl: 'https://doi.org/10.5194/isprs-annals-X-4-W8-2025-729-2026',
    status: 'Published — Conference',
    type: 'ISPRS Conference',
    tags: ['Forest Decline', 'Feature Engineering', 'Climate', 'Trend Analysis'],
    color: '#f4a261',
    highlight: false,
  },
];

const StatusBadge = ({ status, color }: { status: string; color: string }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] font-mono-jet tracking-wider border"
    style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
  >
    <span
      className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
      style={{ backgroundColor: color }}
    />
    {status}
  </span>
);

export default function PublicationsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="publications" className="relative py-32 px-6 sm:px-10 lg:px-16">
      {/* bg accent */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-12 bg-[#e9c46a]/50" />
            <span className="font-mono-jet text-xs text-[#e9c46a] tracking-widest uppercase">03 // Publications</span>
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
            Scientific <span className="text-[#e9c46a]">Output</span>
          </h2>
          <p className="text-gray-500 mt-3 font-mono-jet text-sm">
            Published in Q1 journals · Peer-reviewed research contributions
          </p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              className={`relative p-6 md:p-8 bg-[#0d1820] border rounded-sm card-hover overflow-hidden ${
                pub.highlight
                  ? 'border-[#2a9d8f]/50'
                  : 'border-[#264653]/40'
              }`}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: pub.color }}
              />

              {/* Shimmer on highlight */}
              {pub.highlight && (
                <div className="absolute inset-0 shimmer pointer-events-none opacity-50" />
              )}

              <div className="relative flex flex-col md:flex-row gap-6">
                {/* ID badge */}
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-sm font-orbitron font-bold text-sm"
                    style={{
                      backgroundColor: `${pub.color}15`,
                      border: `1px solid ${pub.color}40`,
                      color: pub.color,
                    }}
                  >
                    {pub.id}
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-white font-semibold text-base md:text-lg leading-snug max-w-3xl">
                      {pub.title}
                    </h3>
                    <StatusBadge status={pub.status} color={pub.color} />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <BookOpen size={14} style={{ color: pub.color }} />
                      <span className="font-medium" style={{ color: pub.color }}>
                        {pub.journal}
                      </span>
                    </div>
                    <span className="text-gray-600">·</span>
                    <span className="font-mono-jet text-gray-500 text-xs">{pub.year}</span>
                    <span className="text-gray-600">·</span>
                    <span
                      className="font-mono-jet text-xs px-2 py-0.5 rounded-sm"
                      style={{ color: pub.color, backgroundColor: `${pub.color}10`, border: `1px solid ${pub.color}30` }}
                    >
                      {pub.type}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map(tag => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>

                  {/* DOI */}
                  {pub.doi && (
                    <a
                      href={pub.doiUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono-jet text-xs text-gray-500 hover:text-[#2a9d8f] transition-colors mt-1"
                    >
                      <FileText size={12} />
                      DOI: {pub.doi}
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Peer reviewer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 border border-[#2a9d8f]/20 bg-[#2a9d8f]/5 rounded-sm flex items-center gap-4"
        >
          <Microscope size={20} className="text-[#2a9d8f] flex-shrink-0" />
          <p className="font-mono-jet text-xs text-gray-400">
            <span className="text-[#2a9d8f]">Peer Reviewer</span> — Scientific Reports (Jun 2025) ·{' '}
            <span className="text-[#2a9d8f]">Contributor</span> — Applied Ecology Blog (May 2025)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
