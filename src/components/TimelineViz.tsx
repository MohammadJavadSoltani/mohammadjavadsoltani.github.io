import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts';

// Simulated NDVI / vegetation index time series data
const ndviData = [
  { month: 'Jan', ndvi: 0.32, evi: 0.28, lswi: 0.15 },
  { month: 'Feb', ndvi: 0.35, evi: 0.30, lswi: 0.18 },
  { month: 'Mar', ndvi: 0.48, evi: 0.42, lswi: 0.25 },
  { month: 'Apr', ndvi: 0.67, evi: 0.61, lswi: 0.38 },
  { month: 'May', ndvi: 0.78, evi: 0.72, lswi: 0.45 },
  { month: 'Jun', ndvi: 0.82, evi: 0.75, lswi: 0.48 },
  { month: 'Jul', ndvi: 0.79, evi: 0.73, lswi: 0.43 },
  { month: 'Aug', ndvi: 0.71, evi: 0.65, lswi: 0.38 },
  { month: 'Sep', ndvi: 0.58, evi: 0.52, lswi: 0.30 },
  { month: 'Oct', ndvi: 0.44, evi: 0.39, lswi: 0.22 },
  { month: 'Nov', ndvi: 0.36, evi: 0.32, lswi: 0.16 },
  { month: 'Dec', ndvi: 0.31, evi: 0.27, lswi: 0.13 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1820] border border-[#2a9d8f]/30 rounded-sm p-3 font-mono-jet text-xs">
        <p className="text-[#2a9d8f] mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name.toUpperCase()}: {p.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TimelineViz() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#080c10]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8 bg-[#2a9d8f]/50" />
            <span className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest uppercase">DATA VISUALIZATION</span>
          </div>
          <h3 className="font-orbitron text-xl font-bold text-white">
            Hyrcanian Forest <span className="text-[#2a9d8f]">Phenology</span> Time Series
          </h3>
          <p className="font-mono-jet text-xs text-gray-500 mt-2">
            Simulated MODIS-derived vegetation indices · Seasonal dynamics · Mixed forest ecosystem
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="p-6 bg-[#0d1820] border border-[#264653]/30 rounded-sm"
        >
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { key: 'NDVI', color: '#2a9d8f' },
              { key: 'EVI', color: '#e9c46a' },
              { key: 'LSWI', color: '#f4a261' },
            ].map(l => (
              <div key={l.key} className="flex items-center gap-2">
                <div className="w-6 h-0.5" style={{ backgroundColor: l.color }} />
                <span className="font-mono-jet text-xs text-gray-400">{l.key}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ndviData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2a9d8f" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2a9d8f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eviGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e9c46a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#e9c46a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lswiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f4a261" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f4a261" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#264653" strokeOpacity={0.3} />
              <XAxis
                dataKey="month"
                tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={{ stroke: '#264653' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
                domain={[0, 1]}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0.5} stroke="#2a9d8f" strokeDasharray="4 4" strokeOpacity={0.3} />
              <Area
                type="monotone"
                dataKey="ndvi"
                stroke="#2a9d8f"
                strokeWidth={2}
                fill="url(#ndviGrad)"
              />
              <Area
                type="monotone"
                dataKey="evi"
                stroke="#e9c46a"
                strokeWidth={1.5}
                fill="url(#eviGrad)"
              />
              <Area
                type="monotone"
                dataKey="lswi"
                stroke="#f4a261"
                strokeWidth={1.5}
                fill="url(#lswiGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Phenology metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Peak NDVI', value: '0.82', unit: 'Jun', color: '#2a9d8f' },
            { label: 'Growing Season', value: '≈180', unit: 'days', color: '#e9c46a' },
            { label: 'Green-up DOY', value: '~85', unit: 'day', color: '#f4a261' },
            { label: 'Senescence DOY', value: '~275', unit: 'day', color: '#e76f51' },
          ].map(m => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="p-3 bg-[#0d1820] border border-[#264653]/30 rounded-sm text-center"
            >
              <div className="font-orbitron text-lg font-bold" style={{ color: m.color }}>
                {m.value}
                <span className="text-xs ml-1 font-mono-jet text-gray-500">{m.unit}</span>
              </div>
              <div className="font-mono-jet text-[10px] text-gray-500 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
