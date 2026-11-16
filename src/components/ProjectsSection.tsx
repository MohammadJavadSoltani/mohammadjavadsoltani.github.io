import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Code2, X } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';
import { clamp, pinProgress, range } from '../lib/math';
import { onFrame } from '../lib/scroll';
import { filterProjects, type ProjectFilter } from '../utils/portfolioFilters';
import { ResilientImage } from './ResilientImage';

/**
 * Scroll-pinned horizontal focus reel (adapted from SELENE's MissionLog.tsx)
 * showcasing all 5 Research & Engineering Projects in exact numbered order,
 * paired with interactive category filtering and a detailed specimen inspection modal.
 */

const PROJECT_CATEGORIES: ProjectFilter[] = ['All', 'Research', 'Open Source', 'Web App', '3D Mapping'];
const LIGHT_SPECIMEN_IDS = new Set(['hyrcanian-phenology', 'mosgwo-obia']);

export function ProjectsSection() {
  const [category, setCategory] = useState<ProjectFilter>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<HTMLLIElement[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const filtered = useMemo(() => filterProjects(PROJECTS, category), [category]);
  const isReelMode = category === 'All';

  useEffect(() => {
    if (!isReelMode) return;
    let lastP = -1;

    return onFrame(() => {
      const root = rootRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!root || !track || !viewport) return;

      // Only pin and translate laterally on md+ screens where side-by-side reel sits cleanly
      if (window.innerWidth < 768) {
        track.style.transform = '';
        return;
      }

      const { p, rect, vh } = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.0001) return;
      lastP = p;

      const viewWidth = viewport.clientWidth;
      const k = range(p, 0.04, 0.96);
      const travel = Math.max(0, track.scrollWidth - viewWidth + 24);
      track.style.transform = `translate3d(${-k * travel}px, 0, 0)`;

      const viewLeft = viewport.getBoundingClientRect().left;
      const focusCenter = viewLeft + viewWidth * 0.48;
      let nearest = 0;
      let best = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const off = (r.left + r.width / 2 - focusCenter) / Math.max(1, viewWidth);
        const a = clamp(Math.abs(off) * 1.15);
        const rotY = clamp(off * -10, -8, 8);
        card.style.opacity = String(1 - a * 0.42);
        card.style.transform = `perspective(1100px) rotateY(${rotY}deg) scale(${1 - a * 0.06})`;
        if (Math.abs(off) < best) {
          best = Math.abs(off);
          nearest = i;
        }
      });

      if (barRef.current) barRef.current.style.transform = `scaleX(${k})`;
      if (countRef.current) countRef.current.textContent = `0${nearest + 1}`;
    });
  }, [isReelMode]);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

  const renderCard = (project: ProjectItem, index: number, inReel: boolean) => {
    const usesWhiteSpecimen = LIGHT_SPECIMEN_IDS.has(project.id);
    const usesContainDark = project.id === 'sar-surface-water';
    const displayNum = PROJECTS.findIndex((p) => p.id === project.id) + 1;

    return (
      <li
        key={project.id}
        ref={(el) => {
          if (el && inReel) cardRefs.current[index] = el;
        }}
        className={
          inReel
            ? 'w-full shrink-0 origin-center md:w-[clamp(19rem,30vw,26rem)]'
            : 'flex flex-col'
        }
      >
        <article className="eo-glass group flex h-full flex-col rounded-[8px] p-4 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1 hover:ring-biosphere/60">
          <button
            type="button"
            onClick={() => setActiveProject(project)}
            aria-label={`Inspect project ${displayNum}: ${project.title}`}
            className="flex w-full flex-1 flex-col text-left focus-visible:outline-none"
          >
            <div
              className={`relative aspect-[4/3] w-full overflow-hidden rounded-[4px] ${
                usesWhiteSpecimen
                  ? 'bg-white p-2 ring-1 ring-white/20'
                  : usesContainDark
                  ? 'bg-void p-2 ring-1 ring-white/10'
                  : 'bg-void ring-1 ring-white/10'
              }`}
            >
              <ResilientImage
                src={project.image}
                alt={project.imageCaption}
                fallbackLabel={project.title}
                className={
                  usesWhiteSpecimen || usesContainDark
                    ? 'size-full object-contain transition-transform duration-500 group-hover:scale-[1.02]'
                    : 'size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                }
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dust">
              <span className="text-biosphere">0{displayNum} · {project.category}</span>
              <span>{project.period}</span>
            </div>

            <h3 className="mt-2 font-display text-[0.95rem] leading-snug tracking-[0.06em] text-white uppercase transition-colors group-hover:text-earth">
              {project.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-[0.875rem] leading-relaxed text-regolith/80">
              {project.summary}
            </p>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-regolith/75">
              <span className="truncate">{project.stack.slice(0, 3).join(' · ')}</span>
              <span className="inline-flex shrink-0 items-center gap-1 text-biosphere">
                Inspect
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </div>
          </button>
        </article>
      </li>
    );
  };

  return (
    <>
      <section
        ref={rootRef}
        id="projects"
        aria-labelledby="projects-title"
        className={`relative border-t border-white/10 bg-void/20 ${
          isReelMode ? 'md:h-[260svh]' : ''
        }`}
      >
        <div
          className={
            isReelMode
              ? 'mx-auto flex max-w-[1440px] flex-col justify-center px-4 py-20 sm:px-6 md:sticky md:top-0 md:h-screen-s md:flex-row md:items-center md:gap-8 md:overflow-hidden md:px-[4vw] md:py-0 md:pt-16'
              : 'mx-auto max-w-[1380px] px-4 py-24 sm:px-6 md:px-[4vw]'
          }
        >
          {/* Left Header & Controls */}
          <div className={isReelMode ? 'eo-glass relative z-20 shrink-0 rounded-[8px] p-5 ring-1 ring-white/15 md:w-[340px] lg:w-[390px]' : 'mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'}>
            <div>
              <p className="font-mono text-label uppercase text-biosphere">Research &amp; Engineering Projects</p>
              <h2
                id="projects-title"
                className="mt-3 font-display text-[clamp(1.5rem,2.5vw,2.4rem)] leading-[1.14] tracking-[0.03em] text-white uppercase"
                style={{ textWrap: 'balance' }}
              >
                Five applied GeoAI systems.
              </h2>
              <p className="mt-4 max-w-[26rem] text-[0.9375rem] leading-relaxed text-regolith/80">
                From MODIS phenology gradients and Grey Wolf segmentation optimization to SAR water archives and 3D close-range photogrammetry.
              </p>

              {/* Category Filter Controls */}
              <div
                role="group"
                aria-label="Filter projects by domain"
                className="mt-5 flex flex-wrap gap-1.5"
              >
                {PROJECT_CATEGORIES.map((cat) => {
                  const active = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      aria-pressed={active}
                      className={`whitespace-nowrap rounded-[4px] px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.1em] uppercase transition-colors ${
                        active
                          ? 'bg-biosphere text-void'
                          : 'bg-white/[0.06] text-regolith/80 ring-1 ring-white/15 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {isReelMode && (
                <div
                  className="mt-6 hidden items-center gap-4 font-mono text-label uppercase text-regolith/75 md:flex"
                  aria-hidden="true"
                >
                  <span>
                    <span ref={countRef} className="text-white tabular-nums">
                      01
                    </span>{' '}
                    / 0{PROJECTS.length}
                  </span>
                  <span className="relative h-px w-28 bg-white/20">
                    <span
                      ref={barRef}
                      className="absolute inset-0 origin-left bg-biosphere"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Horizontal Scroll Reel (desktop) / Vertical Stack (mobile) or Filtered Grid */}
          {isReelMode ? (
            <div ref={viewportRef} className="mt-8 min-w-0 flex-1 overflow-hidden md:mt-0">
              <ol
                ref={trackRef}
                className="grid gap-5 will-change-transform sm:grid-cols-2 md:flex md:gap-6"
              >
                {filtered.map((project, i) => renderCard(project, i, true))}
              </ol>
            </div>
          ) : (
            <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => renderCard(project, i, false))}
            </ol>
          )}
        </div>
      </section>

      {/* Project Specimen Detail Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4 sm:p-6"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[8px] bg-void-2 p-6 ring-1 ring-white/20 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-label uppercase text-earth">
                  {activeProject.category} · {activeProject.period}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-2 font-display text-[1.25rem] tracking-[0.06em] text-white uppercase sm:text-[1.5rem]"
                >
                  {activeProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-white/[0.06] text-white ring-1 ring-white/15 transition-colors hover:bg-earth hover:text-void"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <figure className="mt-6">
              <div
                className={`overflow-hidden rounded-[6px] p-3 ${
                  LIGHT_SPECIMEN_IDS.has(activeProject.id)
                    ? 'bg-white ring-1 ring-white/20'
                    : 'bg-void ring-1 ring-white/10'
                }`}
              >
                <ResilientImage
                  src={activeProject.image}
                  alt={activeProject.imageCaption}
                  fallbackLabel={activeProject.title}
                  className="mx-auto max-h-[52vh] w-full object-contain"
                />
              </div>
              <figcaption className="mt-3 text-[0.875rem] leading-relaxed text-dust">
                {activeProject.imageCaption}
              </figcaption>
            </figure>

            <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="font-mono text-label uppercase text-earth">Technical Overview</p>
                <p className="mt-2.5 text-body text-regolith/85">{activeProject.details}</p>
              </div>
              <div className="space-y-4 rounded-[6px] bg-void/80 p-4 ring-1 ring-white/10">
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase text-dust">Deliverable</p>
                  <p className="mt-1 text-[0.875rem] text-white">{activeProject.deliverable}</p>
                </div>
                {activeProject.supervisor && (
                  <div>
                    <p className="font-mono text-[0.6875rem] uppercase text-dust">Supervisor</p>
                    <p className="mt-1 text-[0.875rem] text-white">{activeProject.supervisor}</p>
                  </div>
                )}
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase text-dust">Methods &amp; Stack</p>
                  <p className="mt-1 font-mono text-[0.75rem] leading-relaxed text-earth">
                    {activeProject.stack.join(' · ')}
                  </p>
                </div>
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[4px] bg-white px-4 py-2 font-mono text-label uppercase text-void transition-colors hover:bg-earth"
                  >
                    <Code2 className="size-3.5" aria-hidden="true" />
                    GitHub Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
