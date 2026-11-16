import { useEffect, useRef, useState } from 'react';
import { clamp, easeOutCubic, pinProgress, range } from '../lib/math';
import { onFrame } from '../lib/scroll';

/**
 * Scroll-pinned Earth-to-Signal Methodology Trajectory (adapted from SELENE's Trajectory.tsx).
 * Four research legs ink sequentially as the user scrolls, with an orbital telemetry capsule
 * tracing path.getPointAtLength() and updating the multi-decadal archive counter.
 */

const SECTION_VH = 280;
const WINDOW = [0.06, 0.9] as const;
const ARCHIVE_YEARS = 42;

const SENSOR_NODE = { cx: 220, cy: 270, r: 84 };
const INSIGHT_NODE = { cx: 980, cy: 250, r: 46 };

const LEGS = [
  // Orbit pass: multi-sensor acquisition & calibration
  `M${SENSOR_NODE.cx} ${SENSOR_NODE.cy - 116} a116 116 0 1 1 -0.1 0 a116 116 0 0 1 96 52`,
  // Trans-signal arc: OBIA + MOSGWO optimization bridge
  `M${SENSOR_NODE.cx + 96} ${SENSOR_NODE.cy - 64} C 500 30, 790 48, ${INSIGHT_NODE.cx} ${INSIGHT_NODE.cy - 82}`,
  // Orbital capture concentric around INSIGHT_NODE
  `M${INSIGHT_NODE.cx} ${INSIGHT_NODE.cy - 82} a82 82 0 1 1 -0.1 0 a82 82 0 0 1 36 10`,
  // Surface descent: climatic trend attribution & ecological mapping
  `M${INSIGHT_NODE.cx + 36} ${INSIGHT_NODE.cy - 72} Q ${INSIGHT_NODE.cx + 52} ${INSIGHT_NODE.cy - 44} ${INSIGHT_NODE.cx + 24} ${INSIGHT_NODE.cy - 28}`,
];

const PIPELINE_LEGS = [
  {
    phase: 'Stage 01 · Acquisition',
    title: 'Multi-Sensor Cloud Ingestion',
    body: 'Harmonizing Sentinel-1 SAR backscatter, Sentinel-2 optical multispectral bands, MODIS phenology, and FLDAS hydro-climatic records in Google Earth Engine.',
  },
  {
    phase: 'Stage 02 · Segmentation',
    title: 'MOSGWO Metaheuristic OBIA',
    body: 'Replacing manual trial-and-error scale/compactness tuning with Multi-Objective Grey Wolf Optimization guided by OSF (R² = 0.99), Weighted IoU, and staged F1-seg.',
  },
  {
    phase: 'Stage 03 · GeoAI Fusion',
    title: 'Imbalanced Class Augmentation',
    body: 'Resolving rare wetland and crop minority-class scarcity via Borderline-SMOTE, hybrid segment labeling, and VSURF / SelectKBest feature engineering.',
  },
  {
    phase: 'Stage 04 · Attribution',
    title: 'Long-Term Climatic Trend Modeling',
    body: 'Quantifying 42-year hydro-climatic drivers (1983–2025) and piecewise drought transitions using LOESS smoothing, Theil-Sen slopes, and Sequential Mann-Kendall Z-tests.',
  },
];

export function ResearchSection() {
  const rootRef = useRef<HTMLElement>(null);
  const legRefs = useRef<SVGPathElement[]>([]);
  const capsuleRef = useRef<SVGGElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const [leg, setLeg] = useState(0);

  useEffect(() => {
    let lastP = -1;
    let current = 0;

    return onFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const { p, rect, vh } = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.0001) return;
      lastP = p;

      const u = range(p, ...WINDOW) * LEGS.length;
      const s = clamp(Math.floor(u), 0, LEGS.length - 1);
      if (s !== current) {
        current = s;
        setLeg(s);
      }

      legRefs.current.forEach((path, i) => {
        if (!path) return;
        const k = easeOutCubic(clamp(u - i));
        path.style.strokeDashoffset = String(1 - k);
        if (i === s && capsuleRef.current) {
          const pt = path.getPointAtLength(path.getTotalLength() * k);
          capsuleRef.current.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
        }
      });

      if (yearsRef.current) {
        const spanProgress = easeOutCubic(range(u, 0.25, LEGS.length));
        yearsRef.current.textContent = String(Math.round(spanProgress * ARCHIVE_YEARS));
      }
    });
  }, []);

  const currentLeg = PIPELINE_LEGS[leg];

  return (
    <section
      ref={rootRef}
      id="trajectory"
      aria-labelledby="trajectory-title"
      className="relative border-t border-white/10 bg-void/15"
      style={{ height: `${SECTION_VH}svh` }}
    >
      <div className="sticky top-0 flex h-screen-s flex-col overflow-hidden px-4 pt-20 pb-14 sm:px-6 md:px-[4vw] md:pt-24">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-label uppercase text-biosphere">
              Methodology Pipeline · Environmental GeoAI
            </p>
            <h2
              id="trajectory-title"
              className="mt-3 max-w-[22ch] font-display text-display text-white uppercase"
              style={{ textWrap: 'balance' }}
            >
              Sensor to ecological signal, drawn as you scroll.
            </h2>
          </div>
          <p className="font-mono text-label uppercase text-regolith/80" aria-live="off">
            Climate Archive Span{' '}
            <span ref={yearsRef} className="text-biosphere tabular-nums">
              0
            </span>{' '}
            Yrs (1983–2025)
          </p>
        </div>

        <div className="relative mx-auto flex min-h-0 w-full max-w-[1320px] flex-1 items-center">
          <svg
            viewBox="0 0 1200 540"
            className="h-auto max-h-full w-full"
            role="img"
            aria-label="Four-stage remote sensing research pipeline from satellite constellation to ecological trend attribution."
          >
            <defs>
              <radialGradient id="earth-orbit-shade" cx="32%" cy="32%" r="72%">
                <stop offset="0" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="0.52" stopColor="#134e4a" />
                <stop offset="1" stopColor="#07101f" />
              </radialGradient>
              <radialGradient id="target-shade" cx="35%" cy="35%" r="75%">
                <stop offset="0" stopColor="#f2e6c9" />
                <stop offset="0.65" stopColor="#6fb6ff" />
                <stop offset="1" stopColor="#111b2c" />
              </radialGradient>
              <radialGradient id="earth-limb-glow">
                <stop offset="0.68" stopColor="#34d399" stopOpacity="0.34" />
                <stop offset="1" stopColor="#34d399" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Star & coordinate field */}
            <g fill="#fff">
              {Array.from({ length: 68 }, (_, i) => (
                <circle
                  key={i}
                  cx={(i * 173) % 1200}
                  cy={(i * 97) % 540}
                  r={i % 7 === 0 ? 1.4 : 0.75}
                  opacity={0.18 + ((i * 37) % 45) / 100}
                />
              ))}
            </g>

            {/* Left node: Satellite / Earth Observation Constellation */}
            <circle cx={SENSOR_NODE.cx} cy={SENSOR_NODE.cy} r={SENSOR_NODE.r * 1.28} fill="url(#earth-limb-glow)" />
            <circle
              cx={SENSOR_NODE.cx}
              cy={SENSOR_NODE.cy}
              r={SENSOR_NODE.r + 22}
              fill="none"
              stroke="#34d399"
              strokeOpacity="0.28"
              strokeDasharray="6 6"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${SENSOR_NODE.cx} ${SENSOR_NODE.cy}`}
                to={`360 ${SENSOR_NODE.cx} ${SENSOR_NODE.cy}`}
                dur="28s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={SENSOR_NODE.cx} cy={SENSOR_NODE.cy} r={SENSOR_NODE.r} fill="url(#earth-orbit-shade)" stroke="#34d399" strokeOpacity="0.55" strokeWidth="1.2" />
            <ellipse cx={SENSOR_NODE.cx} cy={SENSOR_NODE.cy} rx={SENSOR_NODE.r} ry={28} fill="none" stroke="#cfe4ff" strokeOpacity="0.35" strokeDasharray="3 4" />
            <ellipse cx={SENSOR_NODE.cx} cy={SENSOR_NODE.cy} rx={28} ry={SENSOR_NODE.r} fill="none" stroke="#cfe4ff" strokeOpacity="0.3" />

            {/* Right node: Surface Ecosystem Target */}
            <circle cx={INSIGHT_NODE.cx} cy={INSIGHT_NODE.cy} r={INSIGHT_NODE.r} fill="url(#target-shade)" stroke="#f2e6c9" strokeOpacity="0.5" strokeWidth="1.2" />
            <circle cx={INSIGHT_NODE.cx} cy={INSIGHT_NODE.cy} r={INSIGHT_NODE.r + 18} fill="none" stroke="#6fb6ff" strokeOpacity="0.32" strokeDasharray="3 5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`360 ${INSIGHT_NODE.cx} ${INSIGHT_NODE.cy}`}
                to={`0 ${INSIGHT_NODE.cx} ${INSIGHT_NODE.cy}`}
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Ghost route guides */}
            {LEGS.map((d, i) => (
              <path
                key={`ghost-${i}`}
                d={d}
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.16"
                strokeWidth="1.5"
                strokeDasharray="3 6"
              />
            ))}

            {/* Sequentially inked legs */}
            {LEGS.map((d, i) => (
              <path
                key={i}
                ref={(el) => {
                  if (el) legRefs.current[i] = el;
                }}
                d={d}
                pathLength={1}
                fill="none"
                stroke={i === 1 || i === 3 ? '#34d399' : '#6fb6ff'}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="1 1"
                strokeDashoffset="1"
              />
            ))}

            {/* Active orbital sensor probe */}
            <g ref={capsuleRef} transform={`translate(${SENSOR_NODE.cx} ${SENSOR_NODE.cy - 116})`}>
              <circle r="16" fill="#34d399" opacity="0.24" />
              <circle r="9" fill="#6fb6ff" opacity="0.35" />
              <circle r="4.5" fill="#ffffff" />
            </g>

            <g fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="2" fill="#c9ccd3">
              <text x={SENSOR_NODE.cx} y={SENSOR_NODE.cy + SENSOR_NODE.r + 48} textAnchor="middle">
                ORBITAL SENSORS
              </text>
              <text x={INSIGHT_NODE.cx} y={INSIGHT_NODE.cy + INSIGHT_NODE.r + 58} textAnchor="middle">
                LANDSCAPE SIGNAL
              </text>
            </g>
          </svg>
        </div>

        {/* Active research leg narrative inside glass HUD strip */}
        <div className="eo-glass mx-auto grid w-full max-w-[1320px] gap-4 rounded-[6px] px-5 py-4 ring-1 ring-white/15 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-10">
          <p className="font-mono text-label uppercase text-biosphere">
            {currentLeg.phase} · 0{leg + 1} / 0{PIPELINE_LEGS.length}
          </p>
          <div key={leg} className="animate-[leg-in_0.55s_cubic-bezier(0.2,0.7,0.1,1)]" aria-live="polite">
            <h3 className="font-display text-[1.0625rem] tracking-[0.08em] text-white uppercase md:text-[1.25rem]">
              {currentLeg.title}
            </h3>
            <p className="mt-1.5 max-w-[44rem] text-[0.9375rem] leading-relaxed text-regolith/85">
              {currentLeg.body}
            </p>
          </div>
          <div className="flex items-center gap-2" role="tablist" aria-label="Pipeline stages">
            {PIPELINE_LEGS.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={i === leg}
                aria-label={`Select ${item.title}`}
                onClick={() => setLeg(i)}
                className={`h-2 w-8 rounded-[2px] transition-colors duration-300 ${
                  i <= leg ? 'bg-biosphere' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
