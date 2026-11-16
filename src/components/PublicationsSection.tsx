import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  Quote,
  Search,
  X,
} from 'lucide-react';
import { PUBLICATIONS, type PaperFigure, type PublicationItem } from '../data/portfolioData';
import { useReveals } from '../hooks/useReveals';
import {
  countPublicationsByType,
  filterPublications,
  type PublicationFilter,
} from '../utils/portfolioFilters';
import { ResilientImage } from './ResilientImage';

/**
 * SELENE obsidian telemetry cards (adapted from Missions.tsx) presenting ONLY the
 * 3 peer-reviewed published papers, with orbit ring accents, PDF/DOI actions,
 * BibTeX citation drawers, and white-backed scientific figure grids + lightbox.
 */

const PUBLICATION_TYPES: PublicationFilter[] = ['All', 'Journal', 'Conference'];

interface LightboxState {
  paperTitle: string;
  figures: PaperFigure[];
  index: number;
}

export function PublicationsSection() {
  const sectionRef = useReveals<HTMLElement>();
  const [typeFilter, setTypeFilter] = useState<PublicationFilter>('All');
  const [query, setQuery] = useState('');
  const [openBibId, setOpenBibId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const counts = useMemo(() => countPublicationsByType(PUBLICATIONS), []);
  const filtered = useMemo(
    () => filterPublications(PUBLICATIONS, typeFilter, query),
    [typeFilter, query]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (e.key === 'ArrowRight') {
        setLightbox((prev) =>
          prev ? { ...prev, index: (prev.index + 1) % prev.figures.length } : null
        );
      } else if (e.key === 'ArrowLeft') {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                index: (prev.index - 1 + prev.figures.length) % prev.figures.length,
              }
            : null
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

  const handleCopyBibtex = async (pub: PublicationItem) => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopiedId(pub.id);
      window.setTimeout(() => setCopiedId((cur) => (cur === pub.id ? null : cur)), 2200);
    } catch {
      setOpenBibId(pub.id);
    }
  };

  const renderAuthors = (authors: string) => {
    const target = 'Mohammad Javad Soltani';
    const parts = authors.split(target);
    if (parts.length === 1) return authors;
    return (
      <>
        {parts[0]}
        <strong className="font-semibold text-white">{target}</strong>
        {parts[1]}
      </>
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="publications"
        aria-labelledby="publications-title"
        className="relative border-t border-white/10 bg-void/20 px-4 py-24 sm:px-6 md:px-[4vw] md:py-32"
      >
        <div className="mx-auto max-w-[1320px]">
          {/* Section Header + Search & Type Filters */}
          <div className="flex flex-col gap-6 border-b border-white/15 pb-8 lg:flex-row lg:items-end lg:justify-between" data-reveal>
            <div>
              <p className="font-mono text-label uppercase text-biosphere">
                Peer-Reviewed Output · {PUBLICATIONS.length} Published Works
              </p>
              <h2
                id="publications-title"
                className="mt-3 font-display text-display text-white uppercase"
                style={{ textWrap: 'balance' }}
              >
                Selected publications &amp; telemetry.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Filter Tabs */}
              <div
                role="group"
                aria-label="Filter publications by venue type"
                className="flex flex-wrap gap-1.5"
              >
                {PUBLICATION_TYPES.map((t) => {
                  const active = typeFilter === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTypeFilter(t)}
                      aria-pressed={active}
                      className={`whitespace-nowrap rounded-[4px] px-3 py-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors ${
                        active
                          ? 'bg-biosphere text-void'
                          : 'eo-glass text-regolith/80 ring-1 ring-white/15 hover:text-white'
                      }`}
                    >
                      {t} ({counts[t]})
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <label className="relative block sm:w-64">
                <span className="sr-only">Search publications by keyword or DOI</span>
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-dust"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter title, method, DOI..."
                  className="eo-glass w-full rounded-[4px] py-2 pr-3 pl-9 font-mono text-[0.75rem] text-white ring-1 ring-white/15 outline-none placeholder:text-dust focus:ring-biosphere"
                />
              </label>
            </div>
          </div>

          {/* Publication Cards */}
          {filtered.length === 0 ? (
            <div className="eo-glass mt-10 rounded-[8px] p-10 text-center ring-1 ring-white/15">
              <p className="font-mono text-label uppercase text-dust">
                No published manuscripts match &ldquo;{query}&rdquo; under {typeFilter}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setTypeFilter('All');
                  setQuery('');
                }}
                className="mt-4 rounded-[4px] bg-white px-4 py-2 font-mono text-label uppercase text-void transition-colors hover:bg-biosphere"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <ol className="mt-10 space-y-8">
              {filtered.map((pub, idx) => (
                <li
                  key={pub.id}
                  data-reveal
                  className="eo-glass group relative overflow-hidden rounded-[8px] p-6 ring-1 ring-white/15 transition-all duration-500 hover:-translate-y-1 hover:ring-biosphere/60 hover:shadow-[0_28px_80px_-34px_rgb(52_211_153/0.35)] md:p-8"
                >
                  {/* Orbital geometry accent (SELENE Missions.tsx signature motif) */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 200"
                    className="pointer-events-none absolute -top-12 -right-12 size-52 text-white/[0.06] transition-transform duration-[1.2s] group-hover:rotate-45"
                  >
                    {Array.from({ length: pub.figures.length }, (_, k) => (
                      <ellipse
                        key={k}
                        cx="100"
                        cy="100"
                        rx={34 + k * 14}
                        ry={16 + k * 7}
                        fill="none"
                        stroke="currentColor"
                        transform={`rotate(${-18 + k * 15} 100 100)`}
                      />
                    ))}
                    <circle cx="100" cy="100" r="7" fill="currentColor" />
                  </svg>

                  <div className="relative z-10">
                    {/* Metadata Ribbon — Clean unboxed separators */}
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dust">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-earth tabular-nums">0{idx + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-white tabular-nums">{pub.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-sunlit">{pub.quartileOrSeries}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pub.venue}</span>
                      </div>
                      <span className="tabular-nums text-regolith/60">DOI {pub.doi}</span>
                    </div>

                    <h3
                      className="mt-4 max-w-4xl font-display text-[1.125rem] leading-snug tracking-[0.04em] text-white uppercase md:text-[1.375rem]"
                      style={{ textWrap: 'balance' }}
                    >
                      {pub.title}
                    </h3>

                    <p className="mt-2.5 text-[0.9375rem] text-regolith/75">
                      {renderAuthors(pub.authors)}
                    </p>

                    <p className="mt-4 max-w-4xl text-body text-regolith/80">{pub.abstract}</p>

                    {/* Quantitative Highlights */}
                    <ul className="mt-6 grid gap-2.5 border-t border-white/10 pt-5 md:grid-cols-3">
                      {pub.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-regolith/85">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-[1px] bg-earth" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Methods & Action Controls */}
                    <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 lg:flex-row lg:items-center lg:justify-between">
                      <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dust">
                        {pub.methods.join(' · ')}
                      </p>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-white px-4 py-2 font-mono text-label uppercase text-void transition-colors hover:bg-earth"
                        >
                          <FileText className="size-3.5" aria-hidden="true" />
                          Read Paper (PDF)
                        </a>

                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[4px] px-3.5 py-2 font-mono text-label uppercase text-white ring-1 ring-white/20 transition-colors hover:bg-white hover:text-void"
                        >
                          <BookOpen className="size-3.5" aria-hidden="true" />
                          DOI
                          <ExternalLink className="size-3 opacity-70" aria-hidden="true" />
                        </a>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenBibId((cur) => (cur === pub.id ? null : pub.id))
                          }
                          aria-expanded={openBibId === pub.id}
                          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[4px] px-3.5 py-2 font-mono text-label uppercase text-regolith ring-1 ring-white/20 transition-colors hover:ring-earth hover:text-earth"
                        >
                          <Quote className="size-3.5" aria-hidden="true" />
                          Cite (BibTeX)
                        </button>
                      </div>
                    </div>

                    {/* Expandable BibTeX Drawer */}
                    {openBibId === pub.id && (
                      <div className="mt-4 rounded-[6px] bg-void p-4 ring-1 ring-white/15">
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <span className="font-mono text-[0.6875rem] uppercase text-earth">
                            BibTeX Citation
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyBibtex(pub)}
                            className="inline-flex items-center gap-1.5 rounded-[4px] bg-white/[0.06] px-3 py-1 font-mono text-[0.6875rem] uppercase text-white ring-1 ring-white/15 transition-colors hover:bg-earth hover:text-void"
                          >
                            {copiedId === pub.id ? (
                              <>
                                <Check className="size-3.5" aria-hidden="true" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="size-3.5" aria-hidden="true" />
                                Copy BibTeX
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="overflow-x-auto font-mono text-[0.75rem] leading-relaxed text-regolith/85">
                          {pub.bibtex}
                        </pre>
                      </div>
                    )}

                    {/* Scientific Figures Grid — Crisp white specimen frames */}
                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dust">
                        Published Figures ({pub.figures.length}) — Click to enlarge
                      </p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {pub.figures.map((fig, figIdx) => (
                          <button
                            key={fig.src}
                            type="button"
                            onClick={() =>
                              setLightbox({
                                paperTitle: pub.title,
                                figures: pub.figures,
                                index: figIdx,
                              })
                            }
                            aria-label={`Open ${fig.label} from ${pub.title}`}
                            className="group/fig flex flex-col overflow-hidden rounded-[6px] bg-void p-2 text-left ring-1 ring-white/10 transition-colors hover:ring-earth"
                          >
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-white p-1.5">
                              <ResilientImage
                                src={fig.src}
                                alt={fig.caption}
                                fallbackLabel={fig.label}
                                className="size-full object-contain transition-transform duration-300 group-hover/fig:scale-[1.03]"
                              />
                            </div>
                            <span className="mt-2 font-mono text-[0.6875rem] uppercase text-regolith/85 transition-colors group-hover/fig:text-earth">
                              {fig.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Figure Lightbox Modal */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.figures[lightbox.index].label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 p-4 sm:p-6"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col rounded-[8px] bg-void-2 p-5 ring-1 ring-white/20 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-label uppercase text-earth">
                  {lightbox.figures[lightbox.index].label} · {lightbox.index + 1} /{' '}
                  {lightbox.figures.length}
                </p>
                <p className="mt-1 line-clamp-1 text-[0.875rem] text-dust">
                  {lightbox.paperTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close figure viewer"
                className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-white/[0.06] text-white ring-1 ring-white/15 transition-colors hover:bg-earth hover:text-void"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative mt-5 flex min-h-0 flex-1 items-center justify-center rounded-[6px] bg-white p-3">
              <ResilientImage
                src={lightbox.figures[lightbox.index].src}
                alt={lightbox.figures[lightbox.index].caption}
                fallbackLabel={lightbox.figures[lightbox.index].label}
                className="max-h-[60vh] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.875rem] leading-relaxed text-regolith/85">
                {lightbox.figures[lightbox.index].caption}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightbox((prev) =>
                      prev
                        ? {
                            ...prev,
                            index:
                              (prev.index - 1 + prev.figures.length) %
                              prev.figures.length,
                          }
                        : null
                    )
                  }
                  aria-label="Previous figure"
                  className="inline-flex h-10 items-center gap-1 rounded-[4px] bg-white/[0.06] px-3 font-mono text-label uppercase text-white ring-1 ring-white/15 transition-colors hover:bg-earth hover:text-void"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightbox((prev) =>
                      prev
                        ? { ...prev, index: (prev.index + 1) % prev.figures.length }
                        : null
                    )
                  }
                  aria-label="Next figure"
                  className="inline-flex h-10 items-center gap-1 rounded-[4px] bg-white/[0.06] px-3 font-mono text-label uppercase text-white ring-1 ring-white/15 transition-colors hover:bg-earth hover:text-void"
                >
                  Next
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
