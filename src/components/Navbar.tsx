import { useState, type MouseEvent } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { scrollToHash } from '../lib/scroll';

const NAV_LINKS = [
  { label: 'Pipeline', href: '#trajectory' },
  { label: 'Publications', href: '#publications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

function go(e: MouseEvent<HTMLAnchorElement>, then?: () => void) {
  const hash = e.currentTarget.getAttribute('href');
  if (!hash?.startsWith('#')) return;
  e.preventDefault();
  then?.();
  scrollToHash(hash);
}

/** Orbital limb crescent mark. */
export function OrbitalMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d="M15.5 3.6A8.6 8.6 0 1 0 20.4 15.8 6.9 6.9 0 0 1 15.5 3.6Z" fill="currentColor" />
      <circle cx="17.8" cy="6.2" r="1.6" fill="#34d399" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-void/75 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-4 py-4 sm:px-6 md:px-[4vw]">
        <a
          href="#top"
          onClick={(e) => go(e)}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
          aria-label={`${PROFILE.name} — back to top`}
        >
          <OrbitalMark className="size-5 text-white" />
          <span className="font-display text-[0.8125rem] tracking-[0.26em] text-white sm:text-[0.875rem]">
            M. J. SOLTANI
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e)}
              className="shrink-0 whitespace-nowrap font-mono text-label uppercase text-white/75 transition-colors hover:text-earth"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={PROFILE.cvUrl}
            download="Mohammad_Javad_Soltani_CV.pdf"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-white px-4 py-2 font-mono text-label uppercase text-void transition-colors hover:bg-earth lg:inline-flex"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Download CV
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 min-w-[44px] items-center justify-center gap-2 rounded-[4px] border border-white/15 bg-void-2/90 px-3 font-mono text-label uppercase text-white transition-colors hover:border-earth lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
            <span>{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-drawer"
        inert={!open}
        className={`fixed inset-0 -z-10 flex flex-col justify-center gap-5 bg-void/95 px-6 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {NAV_LINKS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => go(e, () => setOpen(false))}
            className="flex items-baseline gap-4 border-b border-white/10 pb-3 font-display text-[1.35rem] tracking-[0.12em] uppercase text-white transition-colors hover:text-earth"
          >
            <span className="font-mono text-label text-earth">0{i + 1}</span>
            <span>{item.label}</span>
          </a>
        ))}
        <a
          href={PROFILE.cvUrl}
          download="Mohammad_Javad_Soltani_CV.pdf"
          onClick={() => setOpen(false)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-[4px] bg-white px-5 py-3.5 font-mono text-label uppercase text-void transition-colors hover:bg-earth"
        >
          <Download className="size-4" aria-hidden="true" />
          Download CV (PDF)
        </a>
      </div>
    </header>
  );
}
