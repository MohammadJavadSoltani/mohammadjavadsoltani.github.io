import { useState } from 'react';
import { ChevronDown, ChevronUp, Radio } from 'lucide-react';
import { BACKDROP_SCENES } from '../data/portfolioData';
import { scrollToHash } from '../lib/scroll';

interface ViewportHudRailProps {
  activeSceneIndex: number;
}

/**
 * Grana-inspired edge telemetry framing & depth ruler + Murk-inspired compact
 * floating EO Biome Signal widget showing live satellite/landscape backdrop context.
 */
export function ViewportHudRail({ activeSceneIndex }: ViewportHudRailProps) {
  const [collapsed, setCollapsed] = useState(true);
  const activeScene = BACKDROP_SCENES[activeSceneIndex] ?? BACKDROP_SCENES[0];
  const isHero = activeSceneIndex === 0;

  const accentDotClass =
    activeScene.accent === 'biosphere'
      ? 'bg-biosphere shadow-[0_0_10px_#34d399]'
      : activeScene.accent === 'sunlit'
      ? 'bg-sunlit shadow-[0_0_10px_#f2e6c9]'
      : 'bg-earth shadow-[0_0_10px_#6fb6ff]';

  const accentTextClass =
    activeScene.accent === 'biosphere'
      ? 'text-biosphere'
      : activeScene.accent === 'sunlit'
      ? 'text-sunlit'
      : 'text-earth';

  return (
    <>
      {/* Grana-inspired left edge vertical swath depth ruler (wide viewports only) */}
      <aside
        aria-label="Section depth indicator"
        className="pointer-events-none fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 flex-col items-start gap-3 2xl:flex"
      >
        <span className="font-mono text-[0.5625rem] tracking-[0.2em] uppercase text-dust/70">
          EO SWATH
        </span>
        <ol className="pointer-events-auto flex flex-col gap-2.5 border-l border-white/15 pl-3">
          {BACKDROP_SCENES.map((scene, idx) => {
            const isCurrent = idx === activeSceneIndex;
            return (
              <li key={scene.id}>
                <a
                  href={`#${scene.sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(`#${scene.sectionId}`);
                  }}
                  aria-current={isCurrent ? 'location' : undefined}
                  className={`group flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-colors ${
                    isCurrent ? 'text-white' : 'text-dust/60 hover:text-earth'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block size-1.5 rotate-45 transition-all duration-300 ${
                      isCurrent
                        ? `${accentDotClass} scale-125`
                        : 'bg-white/25 group-hover:bg-earth'
                    }`}
                  />
                  <span>{scene.label.split(' · ')[0]}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Murk-inspired compact floating glass EO telemetry card (reveals cleanly once scrolled past Hero) */}
      <div
        className={`fixed right-4 bottom-3 z-30 hidden transition-all duration-300 lg:block ${
          isHero ? 'pointer-events-none translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div
          className={`eo-glass relative rounded-[4px] ring-1 ring-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.75)] transition-all duration-300 ${
            collapsed ? 'w-auto px-3 py-1.5' : 'w-64 p-3'
          }`}
        >
          <div
            aria-hidden="true"
            className="brackets pointer-events-none absolute -inset-[1px] text-white/25"
          />
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className={`size-2 shrink-0 rounded-full ${accentDotClass}`} aria-hidden="true" />
              <span className={`font-mono text-[0.625rem] tracking-[0.15em] uppercase whitespace-nowrap ${accentTextClass}`}>
                {activeScene.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              aria-expanded={!collapsed}
              aria-label={collapsed ? 'Expand Earth observation HUD' : 'Minimize Earth observation HUD'}
              className="flex size-5 items-center justify-center rounded-[3px] text-dust transition-colors hover:bg-white/10 hover:text-white"
            >
              {collapsed ? (
                <ChevronUp className="size-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="size-3.5" aria-hidden="true" />
              )}
            </button>
          </div>

          {!collapsed && (
            <div className="mt-2.5 border-t border-white/10 pt-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-sans text-[0.8125rem] font-medium text-white">
                  {activeScene.biome}
                </p>
                <Radio className={`size-3.5 shrink-0 ${accentTextClass}`} aria-hidden="true" />
              </div>
              <p className="mt-0.5 font-mono text-[0.625rem] tracking-[0.12em] uppercase text-dust">
                {activeScene.coordinates}
              </p>

              {/* Quick biome chapter jump bar */}
              <div className="mt-2.5 flex items-center gap-1" role="navigation" aria-label="Jump between Earth scenes">
                {BACKDROP_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => scrollToHash(`#${scene.sectionId}`)}
                    aria-label={`Jump to ${scene.biome}`}
                    className={`h-1 flex-1 rounded-[1px] transition-all duration-300 ${
                      idx === activeSceneIndex
                        ? 'bg-biosphere'
                        : idx < activeSceneIndex
                        ? 'bg-earth/60 hover:bg-earth'
                        : 'bg-white/15 hover:bg-white/35'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
