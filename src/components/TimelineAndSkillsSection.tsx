import { useMemo, useState } from 'react';
import { ExternalLink, Youtube } from 'lucide-react';
import {
  AWARDS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SKILL_GROUPS,
} from '../data/portfolioData';
import { useReveals } from '../hooks/useReveals';
import { filterSkillGroups } from '../utils/portfolioFilters';
import { ResilientImage } from './ResilientImage';

export function TimelineAndSkillsSection() {
  const sectionRef = useReveals<HTMLElement>();
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<string>('all');

  const visibleSkillGroups = useMemo(
    () => filterSkillGroups(SKILL_GROUPS, selectedSkillGroup),
    [selectedSkillGroup]
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-title"
      className="relative border-t border-white/10 bg-void/20 px-4 py-24 sm:px-6 md:px-[4vw] md:py-32"
    >
      <div className="mx-auto max-w-[1320px] space-y-20">
        {/* Education & Experience Split */}
        <div>
          <div data-reveal>
            <p className="font-mono text-label uppercase text-biosphere">Academic Background</p>
            <h2
              id="experience-title"
              className="mt-3 font-display text-display text-white uppercase"
              style={{ textWrap: 'balance' }}
            >
              Education &amp; appointments.
            </h2>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* Education Column */}
            <div className="space-y-4">
              <p className="font-mono text-label uppercase text-regolith/75">Degrees · KNTU Tehran</p>
              {EDUCATION.map((edu, idx) => (
                <article
                  key={edu.degree}
                  data-reveal
                  style={{ transitionDelay: `${idx * 90}ms` }}
                  className="eo-glass rounded-[8px] p-6 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:ring-biosphere/55"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dust">
                    <span className="text-biosphere">
                      {edu.rank} · GPA {edu.gpa}
                    </span>
                    <span className="tabular-nums">{edu.period}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[1.0625rem] tracking-[0.06em] text-white uppercase">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="mt-1 text-[0.875rem] text-regolith/80">{edu.institution}</p>
                  <p className="mt-4 border-t border-white/10 pt-3 text-[0.875rem] leading-relaxed text-regolith/85">
                    <span className="font-mono text-[0.6875rem] uppercase text-dust">Thesis: </span>
                    {edu.thesis}
                  </p>
                  <p className="mt-2 font-mono text-[0.6875rem] uppercase text-dust">
                    Supervisors · {edu.supervisors}
                  </p>
                </article>
              ))}
            </div>

            {/* Academic Experience Column */}
            <div className="space-y-4">
              <p className="font-mono text-label uppercase text-regolith/75">Teaching &amp; Research</p>
              {EXPERIENCE.map((exp, idx) => (
                <article
                  key={exp.role}
                  data-reveal
                  style={{ transitionDelay: `${idx * 90}ms` }}
                  className="eo-glass rounded-[8px] p-6 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:ring-earth/55"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dust">
                    <span className="text-sunlit">{exp.type}</span>
                    <span className="tabular-nums">{exp.period}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[1rem] leading-snug tracking-[0.05em] text-white uppercase">
                    {exp.role}
                  </h3>
                  <p className="mt-1 font-mono text-[0.75rem] text-earth">{exp.organization}</p>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-regolith/85">
                    {exp.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Science Communication & Outreach Showcase ("WHY HERE? — Earth Answers From Space") */}
        <div
          data-reveal
          className="eo-glass relative overflow-hidden rounded-[8px] p-6 ring-1 ring-white/15 md:p-8"
        >
          <div
            aria-hidden="true"
            className="brackets pointer-events-none absolute inset-0 text-biosphere/35"
          />
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.95fr]">
            <a
              href={PROFILE.outreach.channelUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${PROFILE.outreach.title} on YouTube (${PROFILE.outreach.channelHandle})`}
              className="group/yt block overflow-hidden rounded-[6px] bg-white ring-1 ring-white/20 transition-all duration-300 hover:ring-biosphere"
            >
              <ResilientImage
                src={PROFILE.outreach.bannerSrc}
                alt={PROFILE.outreach.bannerAlt}
                fallbackLabel={PROFILE.outreach.title}
                className="w-full object-cover transition-transform duration-700 group-hover/yt:scale-[1.02]"
              />
            </a>
            <div>
              <p className="font-mono text-label uppercase text-biosphere">
                {PROFILE.outreach.platformLabel}
              </p>
              <h3 className="mt-2 font-display text-[1.25rem] tracking-[0.05em] text-white uppercase sm:text-[1.5rem]">
                {PROFILE.outreach.title}
              </h3>
              <p className="mt-1 font-serif text-[1.125rem] italic text-earth">
                {PROFILE.outreach.subtitle}
              </p>
              <p className="mt-3 text-body text-regolith/85">{PROFILE.outreach.description}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-regolith/80">
                  <span>Nature</span>
                  <span aria-hidden="true" className="text-biosphere">·</span>
                  <span>Cities</span>
                  <span aria-hidden="true" className="text-biosphere">·</span>
                  <span>Climate</span>
                  <span aria-hidden="true" className="text-biosphere">·</span>
                  <span>Our Planet</span>
                </div>
                <a
                  href={PROFILE.outreach.channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-white px-4 py-2 font-mono text-label uppercase text-void transition-all duration-300 hover:-translate-y-0.5 hover:bg-biosphere"
                >
                  <Youtube className="size-3.5" aria-hidden="true" />
                  Watch {PROFILE.outreach.channelHandle}
                  <ExternalLink className="size-3 opacity-70" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="border-t border-white/15 pt-16">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between" data-reveal>
            <div>
              <p className="font-mono text-label uppercase text-biosphere">Technical Stack</p>
              <h3 className="mt-3 font-display text-[1.5rem] tracking-[0.06em] text-white uppercase md:text-[2rem]">
                Instrumentation &amp; computational capabilities.
              </h3>
            </div>

            <div
              role="group"
              aria-label="Filter technical domains"
              className="flex flex-wrap gap-1.5"
            >
              <button
                type="button"
                onClick={() => setSelectedSkillGroup('all')}
                aria-pressed={selectedSkillGroup === 'all'}
                className={`whitespace-nowrap rounded-[4px] px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors ${
                  selectedSkillGroup === 'all'
                    ? 'bg-biosphere text-void'
                    : 'eo-glass text-regolith/80 ring-1 ring-white/15 hover:text-white'
                }`}
              >
                All Domains
              </button>
              {SKILL_GROUPS.map((group) => {
                const active = selectedSkillGroup === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setSelectedSkillGroup(group.id)}
                    aria-pressed={active}
                    className={`whitespace-nowrap rounded-[4px] px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors ${
                      active
                        ? 'bg-biosphere text-void'
                        : 'eo-glass text-regolith/80 ring-1 ring-white/15 hover:text-white'
                    }`}
                  >
                    {group.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleSkillGroups.map((group, idx) => (
              <div
                key={group.id}
                className="eo-glass group relative overflow-hidden rounded-[8px] p-6 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:ring-biosphere/55"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 120"
                  className="pointer-events-none absolute -top-6 -right-6 size-28 text-white/[0.08] transition-transform duration-700 group-hover:rotate-45"
                >
                  <circle cx="60" cy="60" r={32 + (idx % 3) * 10} fill="none" stroke="currentColor" />
                  <circle cx="60" cy="60" r="6" fill="currentColor" />
                </svg>

                <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-biosphere">
                  0{SKILL_GROUPS.findIndex((g) => g.id === group.id) + 1} · Domain
                </p>
                <h4 className="mt-2 font-display text-[1rem] tracking-[0.06em] text-white uppercase">
                  {group.label}
                </h4>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-dust">
                  {group.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-[0.875rem] text-regolith/85">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-biosphere" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Honors & Languages Ledger */}
        <div className="grid gap-10 border-t border-white/15 pt-16 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="eo-glass rounded-[8px] p-6 ring-1 ring-white/15">
            <p className="font-mono text-label uppercase text-biosphere" data-reveal>
              Recognition &amp; Service
            </p>
            <ol className="mt-5 divide-y divide-white/10 border-t border-white/10">
              {AWARDS.map((award) => (
                <li
                  key={award.title}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div>
                    <p className="font-medium text-white">{award.title}</p>
                    <p className="text-[0.875rem] text-dust">{award.detail}</p>
                  </div>
                  <span className="shrink-0 font-mono text-label text-biosphere tabular-nums">
                    {award.year}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="eo-glass flex flex-col justify-between rounded-[8px] p-6 ring-1 ring-white/15">
            <div>
              <p className="font-mono text-label uppercase text-earth">Languages &amp; Telemetry</p>
              <h4 className="mt-3 font-display text-[1.125rem] tracking-[0.06em] text-white uppercase">
                Academic Communication
              </h4>
              <dl className="mt-6 space-y-4 border-t border-white/10 pt-5">
                {PROFILE.languages.map((lang) => (
                  <div key={lang.name} className="flex items-baseline justify-between">
                    <dt className="font-display text-[0.9375rem] tracking-[0.06em] text-white uppercase">
                      {lang.name}
                    </dt>
                    <dd className="font-mono text-label uppercase text-biosphere">{lang.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-8 border-t border-white/10 pt-4 font-mono text-[0.6875rem] leading-relaxed uppercase text-dust">
              ORCID {PROFILE.orcid} · Based in {PROFILE.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
