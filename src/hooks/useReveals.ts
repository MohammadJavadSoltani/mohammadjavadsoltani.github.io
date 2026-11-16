import { useEffect, useRef } from 'react';

/**
 * Watches every `[data-reveal]` element inside the returned ref's element and
 * adds `.is-in` the first time each one is seen.
 */
export function useReveals<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const revealVisible = () => {
      const cutoff = window.innerHeight * 0.98;
      root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= cutoff) {
          el.classList.add('is-in');
        }
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '80px 0px 40px 0px', threshold: 0.01 }
    );

    const watch = () => {
      revealVisible();
      root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    };
    watch();

    window.addEventListener('scroll', revealVisible, { passive: true });
    const mo = new MutationObserver(watch);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', revealVisible);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return ref;
}
