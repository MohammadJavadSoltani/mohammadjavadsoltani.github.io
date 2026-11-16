import { useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  ArrowDown,
  Compass,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  GraduationCap,
  Youtube,
} from 'lucide-react';
import { HERO_METRICS, PROFILE } from '../data/portfolioData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { clamp, easeOutCubic, lerp, pinProgress, range } from '../lib/math';
import { onFrame, scrollToHash } from '../lib/scroll';
import { ResilientImage } from './ResilientImage';

/**
 * Scroll-pinned orbital & environmental Earth-observation stage.
 * Zero latency at y=0: identity, portrait/crest toggle, summary, and KPIs
 * float cleanly over the animated 7_56e325ba.jpg orbital spectral scan backdrop.
 */

type Mote = { x: number; y: number; r: number; s: number; a: number };

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const elevRef = useRef<HTMLSpanElement>(null);
  const [showCrest, setShowCrest] = useState(false);

  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  useEffect(() => {
    const c = dustRef.current;
    if (!c) return;
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = dustRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let seed = 17;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const motes: Mote[] = Array.from({ length: 85 }, () => ({
      x: rand(),
      y: rand(),
      r: 0.6 + rand() * 1.5,
      s: 0.25 + rand() * 0.85,
      a: 0.16 + rand() * 0.45,
    }));

    let lastP = -1;
    let lastTime = 0;

    return onFrame((time) => {
      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 1 / 60;
      lastTime = time;

      const root = rootRef.current;
      if (!root) return;
      const { p, rect } = pinProgress(root);
      if (rect.bottom < 0) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0) {
        const dpr = canvas.width / Math.max(1, w);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const fadeOut = 1 - range(p, 0.72, 1);

        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];
          if (!reducedRef.current) {
            m.x += 0.004 * m.s * dt;
            m.y -= 0.003 * m.s * dt;
            if (m.x > 1) m.x -= 1;
            if (m.y < 0) m.y += 1;
          }
          ctx.fillStyle = i % 3 === 0 ? '#34d399' : '#cfe1ff';
          ctx.globalAlpha = m.a * fadeOut;
          ctx.beginPath();
          ctx.arc(m.x * w, ((m.y - p * 0.35 + 1) % 1) * h, m.r * (1 + p * 0.9), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        if (contentRef.current) {
          contentRef.current.style.transform = '';
          contentRef.current.style.opacity = '1';
        }
        return;
      }

      if (Math.abs(p - lastP) < 0.0001) return;
      lastP = p;

      const rise = easeOutCubic(range(p, 0, 0.75));
      const exit = range(p, 0.74, 1);

      if (horizonRef.current) {
        const yVh = lerp(22, -6, rise) - exit * 18;
        const scale = lerp(0.96, 1.07, rise);
        horizonRef.current.style.transform = `translate3d(0, ${yVh}%, 0) scale(${scale})`;
        horizonRef.current.style.opacity = String(clamp(1 - exit * 0.85));
      }

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(0, ${-p * 36}px, 0) rotate(${p * 24}deg) scale(${lerp(1, 1.16, p)})`;
        reticleRef.current.style.opacity = String(0.28 * (1 - exit));
      }

      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${-p * 42}px, 0)`;
        contentRef.current.style.opacity = String(1 - range(p, 0.78, 1));
      }

      if (clockRef.current) {
        const secs = p * 5400;
        const hh = String(Math.floor(secs / 3600)).padStart(2, '0');
        const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
        const ss = String(Math.floor(secs % 60)).padStart(2, '0');
        clockRef.current.textContent = `T+ ${hh}:${mm}:${ss}`;
      }

      if (elevRef.current) {
        elevRef.current.textContent = `${(rise * 14.8).toFixed(1)}°`;
      }
    });
  }, []);

  const handleHashNav = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    scrollToHash(hash);
  };

  return (
    <section
      id="top"
      ref={rootRef}
      aria-label="Academic Profile Overview"
      className="relative bg-transparent md:h-[200svh]"
    >
      <div className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-transparent px-4 pt-20 pb-8 sm:px-6 md:sticky md:top-0 md:h-screen-s md:px-[4vw] md:pt-24 md:pb-8">
        {/* Orbital & biosphere starlight canvas */}
        <canvas ref={dustRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />

        {/* Dual-spectrum orbital reticle SVG (Grana-inspired framing geometry) */}
        <svg
          ref={reticleRef}
          viewBox="0 0 800 800"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-[122vmin] -translate-x-1/2 -translate-y-1/2 text-earth/35 will-change-transform"
          style={{ opacity: 0.28 }}
        >
          <circle cx="400" cy="400" r="236" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="335" fill="none" stroke="#34d399" strokeWidth="0.7" strokeOpacity="0.45" />
          <ellipse cx="400" cy="400" rx="382" ry="148" fill="none" stroke="#f2e6c9" strokeWidth="0.7" strokeOpacity="0.4" transform="rotate(-16 400 400)" />
          {/* Cardinal diamond reticles */}
          <polygon points="400,56 405,65 400,74 395,65" fill="#34d399" fillOpacity="0.65" />
          <polygon points="400,726 405,735 400,744 395,735" fill="#6fb6ff" fillOpacity="0.65" />
        </svg>

        {/* Rising Earth atmospheric horizon */}
        <div
          ref={horizonRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-15vw] -bottom-[52vh] h-[74vh] will-change-transform"
          style={{
            transform: 'translate3d(0, 22%, 0) scale(0.96)',
            background:
              'radial-gradient(62% 100% at 50% 100%, rgba(52,211,153,0.22) 0%, rgba(111,182,255,0.16) 42%, transparent 72%)',
          }}
        >
          <div className="mx-auto h-full w-full rounded-[50%] border-t border-biosphere/50 bg-gradient-to-b from-earth/10 via-void-2/50 to-void/80 shadow-[0_-24px_90px_rgba(52,211,153,0.2)]" />
        </div>

        {/* Outer HUD telemetry corners with diamond reticle vertices */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 hidden text-regolith/30 sm:inset-5 md:block lg:inset-6"
        >
          <div className="brackets absolute inset-0" />
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-biosphere/75" />
          <span className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rotate-45 bg-earth/75" />
        </div>

        {/* Main Academic Hero Stage */}
        <div
          ref={contentRef}
          className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-between gap-5 will-change-transform"
        >
          {/* Telemetry status ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-regolith/80">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-biosphere shadow-[0_0_8px_#34d399]" aria-hidden="true" />
              {PROFILE.kicker}
            </span>
            <div className="flex items-center gap-6">
              <span className="hidden sm:inline">
                Limb Elev <span ref={elevRef} className="text-biosphere tabular-nums">0.0°</span>
              </span>
              <span className="hidden md:inline">
                Orbit Scan <span ref={clockRef} className="text-white tabular-nums">T+ 00:00:00</span>
              </span>
              <span className="text-earth">35.75°N · 51.41°E</span>
            </div>
          </div>

          {/* 2-Column Balanced Identity & Portrait/Crest Split */}
          <div className="grid items-center gap-6 py-2 lg:grid-cols-[1.28fr_0.72fr] lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-label uppercase text-earth">
                  {PROFILE.name} · ORCID {PROFILE.orcid}
                </p>
                <span className="font-serif text-[1.125rem] italic text-biosphere">
                  Environmental Engineering &amp; Earth Observation
                </span>
              </div>

              <h1
                className="mt-3 max-w-3xl font-display text-[clamp(1.45rem,3.4vw,3.35rem)] leading-[1.15] tracking-[0.03em] text-white uppercase md:tracking-[0.04em]"
                style={{ textWrap: 'balance' }}
              >
                Mapping{' '}
                <span className="bg-gradient-to-r from-biosphere via-earth to-sunlit bg-clip-text text-transparent">
                  Earth systems
                </span>{' '}
                through optimization, time-series &amp; GeoAI.
              </h1>

              <p className="mt-4 max-w-2xl text-body text-regolith/90">
                {PROFILE.summary}
              </p>

              {/* Primary CTA + Secondary Academic Anchors */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#publications"
                  onClick={(e) => handleHashNav(e, '#publications')}
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-white px-5 py-3 font-mono text-label uppercase text-void transition-all duration-300 hover:-translate-y-0.5 hover:bg-biosphere hover:shadow-[0_10px_30px_-8px_rgba(52,211,153,0.6)]"
                >
                  <FileText className="size-3.5" aria-hidden="true" />
                  Published Research (3)
                </a>

                <a
                  href={PROFILE.cvUrl}
                  download="Mohammad_Javad_Soltani_CV.pdf"
                  className="eo-glass inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] px-5 py-3 font-mono text-label uppercase text-white ring-1 ring-white/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-void"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  Curriculum Vitae
                </a>
              </div>

              {/* Clean unboxed external academic links */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-label uppercase text-regolith/75">
                <a
                  href={PROFILE.scholarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-biosphere"
                >
                  <GraduationCap className="size-3.5 text-earth" aria-hidden="true" />
                  Google Scholar
                  <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-biosphere"
                >
                  <Globe2 className="size-3.5 text-earth" aria-hidden="true" />
                  GitHub Page
                  <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-biosphere"
                >
                  LinkedIn
                  <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE.orcidUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-biosphere"
                >
                  ORCID
                  <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-biosphere"
                >
                  <Youtube className="size-3.5 text-biosphere" aria-hidden="true" />
                  WhyHereEO
                  <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Interactive Portrait & Personal Remote-Sensing Crest Frame */}
            <div className="mx-auto w-full max-w-[210px] sm:max-w-[250px] lg:ml-auto lg:max-w-[305px]">
              <figure className="eo-glass relative rounded-[6px] p-2.5 ring-1 ring-white/20 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.85)]">
                <div className="brackets pointer-events-none absolute -inset-1 text-biosphere/55" aria-hidden="true" />

                <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-white">
                  {showCrest ? (
                    <ResilientImage
                      src={PROFILE.crest.src}
                      alt={PROFILE.crest.alt}
                      fallbackLabel="M. Javad S Crest"
                      className="size-full object-contain p-1.5 transition-transform duration-500"
                    />
                  ) : (
                    <ResilientImage
                      src={PROFILE.portrait.src}
                      alt={PROFILE.portrait.alt}
                      fallbackLabel={PROFILE.name}
                      className="size-full object-cover object-top transition-transform duration-500"
                    />
                  )}
                  {!showCrest && (
                    <>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent"
                      />
                      <span className="absolute bottom-2.5 left-2.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase text-white/95">
                        KNTU · Remote Sensing
                      </span>
                    </>
                  )}
                </div>

                {/* Clean switcher between Researcher Portrait & Personal GeoAI Crest */}
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-dust">
                    {showCrest ? 'Field Crest' : 'Researcher ID'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCrest((v) => !v)}
                    aria-pressed={showCrest}
                    className="inline-flex items-center gap-1.5 rounded-[3px] bg-white/[0.08] px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] uppercase text-earth ring-1 ring-white/15 transition-colors hover:bg-biosphere hover:text-void"
                  >
                    <Compass className="size-3" aria-hidden="true" />
                    {showCrest ? 'Show Portrait' : 'View Field Crest'}
                  </button>
                </div>
              </figure>
            </div>
          </div>

          {/* Full-width 4-Column Academic KPI Telemetry Strip */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {HERO_METRICS.map((metric) => (
              <div
                key={metric.value}
                className="eo-glass rounded-[6px] px-4 py-3 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:ring-biosphere/55"
              >
                <p className="font-display text-[1.0625rem] tracking-[0.06em] text-white uppercase sm:text-[1.25rem]">
                  {metric.value}
                </p>
                <p className="mt-1 text-[0.75rem] leading-snug text-regolith/80">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll prompt footer inside hero */}
          <div className="hidden items-center justify-between font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-regolith/75 sm:flex">
            <span>Earth Observation · Environmental Engineering · OBIA</span>
            <a
              href="#trajectory"
              onClick={(e) => handleHashNav(e, '#trajectory')}
              className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-biosphere"
            >
              Scroll to trace pipeline
              <ArrowDown className="size-3.5 animate-bounce text-biosphere motion-reduce:animate-none" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
