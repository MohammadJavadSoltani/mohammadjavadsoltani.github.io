import { useState, type FormEvent, type MouseEvent } from 'react';
import { Check, Copy, Download, ExternalLink, Mail } from 'lucide-react';
import { PROFILE, REFERENCES } from '../data/portfolioData';
import { useReveals } from '../hooks/useReveals';
import { scrollToHash } from '../lib/scroll';
import { OrbitalMark } from './Navbar';

/**
 * SELENE Reserve.tsx + Footer.tsx adaptation: glowing bottom Earth limb horizon,
 * HUD-bracketed Academic References, Collaboration/Inquiry manifest form, and minimal footer.
 */

type FormStatus = 'idle' | 'invalid' | 'sent';

export function ContactFooter() {
  const sectionRef = useReveals<HTMLElement>();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus('invalid');
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(
      `[Research Inquiry] ${String(data.get('topic') || 'Collaboration')}`
    );
    const body = encodeURIComponent(
      `Name: ${String(data.get('name'))}\nEmail: ${String(data.get('email'))}\nTopic: ${String(
        data.get('topic')
      )}\n\n${String(data.get('message') || '')}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  const handleBackToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToHash('#top');
  };

  const field =
    'eo-glass w-full rounded-[4px] px-4 py-3 text-[0.9375rem] text-white ring-1 ring-white/20 outline-none placeholder:text-regolith/45 focus:ring-biosphere user-invalid:ring-red-400/70';

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        aria-labelledby="contact-title"
        className="relative overflow-hidden border-t border-white/10 bg-void/20 px-4 py-24 sm:px-6 md:px-[4vw] md:py-32"
      >
        {/* SELENE glowing Earth atmospheric sliver at the bottom edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-20vw] -bottom-[42vw] h-[52vw] rounded-[50%] blur-[2px]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(242,230,201,0.22), rgba(111,182,255,0.18) 55%, transparent 72%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-10vw] bottom-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(242,230,201,0.6), transparent)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1320px]">
          {/* Academic References */}
          <div data-reveal>
            <p className="font-mono text-label uppercase text-sunlit">Academic References</p>
            <h2
              id="contact-title"
              className="mt-3 font-display text-display text-white uppercase"
              style={{ textWrap: 'balance' }}
            >
              Supervisors &amp; direct collaboration.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REFERENCES.map((person) => (
              <div
                key={person.email}
                data-reveal
                className="eo-glass relative rounded-[6px] p-6 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:ring-sunlit/55"
              >
                <div
                  aria-hidden="true"
                  className="brackets pointer-events-none absolute inset-0 text-sunlit/35"
                />
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-sunlit">
                  {person.role}
                </p>
                <h3 className="mt-2.5 font-display text-[1rem] tracking-[0.05em] text-white uppercase">
                  {person.name}
                </h3>
                <p className="mt-1.5 text-[0.875rem] text-regolith/80">{person.affiliation}</p>
                <a
                  href={`mailto:${person.email}`}
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[0.75rem] text-regolith/90 transition-colors hover:text-sunlit"
                >
                  <Mail className="size-3.5 text-sunlit" aria-hidden="true" />
                  {person.email}
                </a>
              </div>
            ))}
          </div>

          {/* Direct Channels + Manifest Inquiry Form */}
          <div className="mt-16 grid gap-12 border-t border-white/10 pt-14 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6" data-reveal>
              <p className="font-mono text-label uppercase text-earth">Direct Channel</p>
              <h3 className="mt-3 font-display text-[1.5rem] tracking-[0.05em] text-white uppercase md:text-[2rem]">
                Initiate a research correspondence.
              </h3>
              <p className="mt-4 max-w-[30rem] text-body text-regolith/75">
                Open to PhD collaboration, co-authored Earth observation benchmarks, OBIA optimization packages, and peer-review invitations.
              </p>

              {/* HUD Email Readout */}
              <div className="brackets mt-8 inline-flex flex-wrap items-center gap-4 px-5 py-4 text-regolith/35">
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase text-dust">Primary Email</p>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="mt-1 block font-mono text-[0.875rem] text-white transition-colors hover:text-earth"
                  >
                    {PROFILE.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy primary email address"
                  className="inline-flex items-center gap-1.5 rounded-[4px] bg-white/[0.06] px-3 py-2 font-mono text-[0.6875rem] uppercase text-white ring-1 ring-white/15 transition-colors hover:bg-earth hover:text-void"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-3.5" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-label uppercase text-dust">
                <a
                  href={PROFILE.cvUrl}
                  download="Mohammad_Javad_Soltani_CV.pdf"
                  className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-earth"
                >
                  <Download className="size-3.5 text-earth" aria-hidden="true" />
                  CV PDF
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={PROFILE.scholarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-earth"
                >
                  Google Scholar
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={PROFILE.githubProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-earth"
                >
                  GitHub
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-earth"
                >
                  LinkedIn
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={PROFILE.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-biosphere"
                >
                  YouTube ({PROFILE.outreach.channelHandle})
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              noValidate
              aria-describedby="contact-form-status"
              className="flex flex-col gap-4 md:col-span-5 md:col-start-8"
              data-reveal
              style={{ transitionDelay: '100ms' }}
            >
              <label className="block">
                <span className="mb-1.5 block font-mono text-label uppercase text-regolith/60">
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Dr. Jane Researcher"
                  className={field}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block font-mono text-label uppercase text-regolith/60">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="researcher@university.edu"
                  className={field}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block font-mono text-label uppercase text-regolith/60">
                  Inquiry Topic
                </span>
                <select name="topic" defaultValue="Research Collaboration" className={`${field} appearance-none`}>
                  <option value="Research Collaboration" className="bg-void">
                    Research Collaboration · OBIA / GeoAI
                  </option>
                  <option value="PhD / Fellowship Inquiry" className="bg-void">
                    PhD / Visiting Research Inquiry
                  </option>
                  <option value="Data & Code Request" className="bg-void">
                    Paper Code &amp; Dataset Request
                  </option>
                  <option value="Peer Review / Lecture" className="bg-void">
                    Peer Review or Guest Lecture
                  </option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block font-mono text-label uppercase text-regolith/60">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Brief note on project scope, paper, or dataset..."
                  className={field}
                />
              </label>

              <button
                type="submit"
                className="mt-1 w-full rounded-[4px] bg-white px-5 py-3.5 font-mono text-label uppercase text-void transition-colors hover:bg-earth"
              >
                Compose Email Draft
              </button>

              <p id="contact-form-status" role="status" className="min-h-[1.25rem] text-[0.8125rem] text-regolith/75">
                {status === 'invalid' && 'Please provide your name and a valid email address.'}
                {status === 'sent' &&
                  `Your email draft should be open. Direct address: ${PROFILE.email}.`}
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-void/70 px-4 py-8 backdrop-blur-md sm:px-6 md:px-[4vw]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 font-mono text-label uppercase text-regolith/65 md:flex-row md:items-center md:justify-between">
          <span className="flex items-center gap-2.5 text-white/90">
            <OrbitalMark className="size-4 text-biosphere" />
            {PROFILE.shortName} · Environmental Remote Sensing &amp; GeoAI
          </span>
          <span>
            © {new Date().getFullYear()} {PROFILE.name} · KNTU Tehran
          </span>
          <a href="#top" onClick={handleBackToTop} className="transition-colors hover:text-biosphere">
            Back to orbit ↑
          </a>
        </div>
      </footer>
    </>
  );
}
