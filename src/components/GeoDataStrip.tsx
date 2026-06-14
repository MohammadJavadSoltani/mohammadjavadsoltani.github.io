import { motion } from 'framer-motion';

const dataPoints = [
  { label: 'SAR BANDS', value: 'C-BAND · 5.6cm', color: '#2a9d8f' },
  { label: 'PLATFORM', value: 'SENTINEL-1A/B', color: '#e9c46a' },
  { label: 'RESOLUTION', value: '10m GSD', color: '#f4a261' },
  { label: 'ALGORITHM', value: 'GWO OPTIM', color: '#2a9d8f' },
  { label: 'ACCURACY', value: 'OA: 94.2%', color: '#e9c46a' },
  { label: 'KAPPA', value: 'κ: 0.921', color: '#f4a261' },
  { label: 'PROJECTION', value: 'UTM WGS84', color: '#2a9d8f' },
  { label: 'ARCHIVE', value: '2000–2024', color: '#e76f51' },
  { label: 'MODIS PROD', value: 'MOD13Q1', color: '#2a9d8f' },
  { label: 'CLASSES', value: '7 LULC', color: '#e9c46a' },
];

export default function GeoDataStrip() {
  return (
    <div className="relative overflow-hidden py-4 bg-[#080c10] border-y border-[#264653]/30">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {[...dataPoints, ...dataPoints].map((dp, i) => (
          <div key={i} className="flex items-center gap-3 px-4">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: dp.color }}
            />
            <span className="font-mono-jet text-[10px] text-gray-600 tracking-widest">{dp.label}</span>
            <span className="font-mono-jet text-[10px] font-bold" style={{ color: dp.color }}>
              {dp.value}
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: `${dp.color}30` }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
