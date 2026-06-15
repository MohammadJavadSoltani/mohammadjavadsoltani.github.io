import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const lulcData = [
  { class: 'Open Water', area: 12.4, change: -18.5, color: '#2a9d8f' },
  { class: 'Wetland Veg', area: 23.1, change: -12.3, color: '#264653' },
  { class: 'Cropland', area: 45.8, change: +22.7, color: '#e9c46a' },
  { class: 'Bare Soil', area: 8.2, change: +8.1, color: '#f4a261' },
  { class: 'Dense Veg', area: 10.5, change: -7.2, color: '#2a9d8f' },
];

const changeData = [
  { year: '2000', water: 18.5, wetland: 28.4, crop: 32.1 },
  { year: '2005', water: 16.2, wetland: 26.1, crop: 35.8 },
  { year: '2010', water: 14.8, wetland: 24.5, crop: 38.9 },
  { year: '2015', water: 13.1, wetland: 23.8, crop: 42.3 },
  { year: '2020', water: 12.4, wetland: 23.1, crop: 45.8 },
  { year: '2024', water: 11.2, wetland: 21.5, crop: 48.2 },
];

const CustomTooltip2 = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1820] border border-[#264653]/40 rounded-sm p-3 font-mono-jet text-xs">
        <p className="text-gray-400 mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || '#2a9d8f' }}>
            {p.name}: {p.value.toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function WetlandMapViz() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8 bg-[#e9c46a]/50" />
            <span className="font-mono-jet text-xs text-[#e9c46a] tracking-widest uppercase">THESIS VISUALIZATION</span>
          </div>
          <h3 className="font-orbitron text-xl font-bold text-white">
            Wetland <span className="text-[#e9c46a]">Degradation</span> Analysis — Multi-Decadal LULC Change
          </h3>
          <p className="font-mono-jet text-xs text-gray-500 mt-2">
            OBIA-based classification · Sentinel-1/2 multi-source fusion · 2000–2024 temporal coverage
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LULC change bar chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="p-6 bg-[#0d1820] border border-[#264653]/30 rounded-sm"
          >
            <div className="font-mono-jet text-xs text-[#e9c46a] tracking-widest mb-4">
              LULC CLASS DISTRIBUTION (2024) — % AREA
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={lulcData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#264653" strokeOpacity={0.3} horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <YAxis
                  type="category"
                  dataKey="class"
                  tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip content={<CustomTooltip2 />} />
                <Bar dataKey="area" radius={[0, 2, 2, 0]}>
                  {lulcData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Temporal change */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="p-6 bg-[#0d1820] border border-[#264653]/30 rounded-sm"
          >
            <div className="font-mono-jet text-xs text-[#2a9d8f] tracking-widest mb-4">
              TEMPORAL CHANGE 2000–2024 — % COVERAGE
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={changeData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#264653" strokeOpacity={0.3} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  axisLine={{ stroke: '#264653' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip2 />} />
                <Bar dataKey="water" fill="#2a9d8f" fillOpacity={0.8} name="Water" radius={[2, 2, 0, 0]} />
                <Bar dataKey="wetland" fill="#264653" fillOpacity={0.9} name="Wetland" radius={[2, 2, 0, 0]} />
                <Bar dataKey="crop" fill="#e9c46a" fillOpacity={0.8} name="Cropland" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3">
              {[['Water', '#2a9d8f'], ['Wetland', '#264653'], ['Cropland', '#e9c46a']].map(([l, c]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c as string }} />
                  <span className="font-mono-jet text-[10px] text-gray-500">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Change summary chips */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
          {lulcData.map((item) => (
            <motion.div
              key={item.class}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="p-3 bg-[#0d1820] border border-[#264653]/20 rounded-sm text-center"
            >
              <div className="font-mono-jet text-xs text-gray-400">{item.class}</div>
              <div
                className="font-orbitron text-sm font-bold mt-1"
                style={{ color: item.change < 0 ? '#e76f51' : '#2a9d8f' }}
              >
                {item.change > 0 ? '+' : ''}{item.change}%
              </div>
              <div className="font-mono-jet text-[10px] text-gray-600 mt-0.5">2000→2024</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
