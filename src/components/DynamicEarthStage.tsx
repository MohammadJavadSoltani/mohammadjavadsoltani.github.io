import { useEffect, useRef } from 'react';
import { BACKDROP_SCENES } from '../data/portfolioData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { computeBackdropState, type ChapterBounds } from '../lib/backdrop';
import { lerp } from '../lib/math';
import { onFrame } from '../lib/scroll';

interface Ripple {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  maxRadius: number;
  hue: 'earth' | 'biosphere' | 'sunlit';
}

interface FloatingParticle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
}

interface DynamicEarthStageProps {
  onSceneChange?: (index: number) => void;
}

/**
 * Full-viewport fixed Earth Observation backdrop engine.
 * - Cross-fades and parallax-glides across the 6 uploaded Earth/cosmic scenes per section.
 * - Draws Grana-inspired pixel-raster swath dissolves during section transitions.
 * - Draws Murk-inspired hydro/sonar ripples on pointer movement and floating orbital motes.
 * - Runs inside the single shared Lenis rAF loop with zero per-frame React re-renders.
 */
export function DynamicEarthStage({ onSceneChange }: DynamicEarthStageProps) {
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const onSceneChangeRef = useRef(onSceneChange);
  onSceneChangeRef.current = onSceneChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const syncCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };
    syncCanvas();
    window.addEventListener('resize', syncCanvas, { passive: true });

    let chapters: ChapterBounds[] = [];
    const measureChapters = () => {
      chapters = BACKDROP_SCENES.map((scene) => {
        const el = document.getElementById(scene.sectionId);
        if (!el) return { id: scene.sectionId, top: 0, height: window.innerHeight };
        const rect = el.getBoundingClientRect();
        return {
          id: scene.sectionId,
          top: rect.top + window.scrollY,
          height: Math.max(rect.height, window.innerHeight * 0.6),
        };
      });
    };
    measureChapters();
    const ro = new ResizeObserver(measureChapters);
    ro.observe(document.body);

    // Deterministic seeded motes + pseudo-random matrix mask for pixel dissolve
    let seed = 42;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const particles: FloatingParticle[] = Array.from({ length: 64 }, () => ({
      x: rand(),
      y: rand(),
      r: 0.8 + rand() * 1.6,
      vx: (rand() - 0.5) * 0.006,
      vy: -0.002 - rand() * 0.005,
      alpha: 0.16 + rand() * 0.36,
    }));

    const ripples: Ripple[] = [];
    let lastRippleAt = 0;
    let currentSceneIdx = -1;
    let lastTime = 0;

    const spawnRipple = (x: number, y: number, hue: 'earth' | 'biosphere' | 'sunlit') => {
      if (reducedRef.current) return;
      ripples.push({
        x,
        y,
        age: 0,
        maxAge: 1.5,
        maxRadius: 68 + Math.random() * 52,
        hue,
      });
      if (ripples.length > 14) ripples.shift();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRippleAt < 135) return;
      lastRippleAt = now;
      const accent = BACKDROP_SCENES[Math.max(0, currentSceneIdx)]?.accent ?? 'earth';
      spawnRipple(e.clientX, e.clientY, accent);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const stopFrame = onFrame((time) => {
      const dt = lastTime ? Math.min(0.08, (time - lastTime) / 1000) : 1 / 60;
      lastTime = time;

      if (chapters.length === 0) measureChapters();

      const state = computeBackdropState(window.scrollY, window.innerHeight, chapters);
      if (state.activeIndex !== currentSceneIdx) {
        currentSceneIdx = state.activeIndex;
        onSceneChangeRef.current?.(currentSceneIdx);
        document.documentElement.dataset.activeBiome = BACKDROP_SCENES[currentSceneIdx]?.id ?? '';
      }

      // Drive background image cross-fade & kinetic Ken Burns + scroll parallax
      const tSec = time * 0.001;
      layerRefs.current.forEach((layer, i) => {
        if (!layer) return;
        const w = state.weights[i] ?? 0;
        layer.style.opacity = w.toFixed(3);
        if (w > 0.005) {
          const driftX = reducedRef.current ? 0 : Math.sin(tSec * 0.18 + i * 1.4) * 1.2;
          const driftY = reducedRef.current ? 0 : Math.cos(tSec * 0.14 + i * 1.1) * 1.0;
          const baseScale = i === 5 ? 1.16 : 1.06;
          const zoom = baseScale + (i === state.activeIndex ? state.chapterProgress * 0.07 : 0);
          layer.style.transform = `translate3d(${driftX}%, ${driftY}%, 0) scale(${zoom.toFixed(4)})`;
        }
      });

      // Canvas layer: pixel-raster swath transition + hydro ripples + ambient motes
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dpr = canvas.width / Math.max(1, vw);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      const accent = BACKDROP_SCENES[currentSceneIdx]?.accent ?? 'earth';
      const accentRgb =
        accent === 'biosphere'
          ? '52, 211, 153'
          : accent === 'sunlit'
          ? '242, 230, 201'
          : '111, 182, 255';

      // 1. Grana-inspired pixel-raster dissolve blocks during chapter crossfades
      if (!reducedRef.current && state.transitionPulse > 0.06) {
        const cell = vw < 768 ? 18 : 22;
        const cols = Math.ceil(vw / cell);
        const rows = Math.ceil(vh / cell);
        const pulse = state.transitionPulse;
        const sweepBand = state.chapterProgress;

        for (let r = 0; r < rows; r += 2) {
          for (let c = 0; c < cols; c += 2) {
            const hash = Math.sin(c * 12.9898 + r * 78.233 + currentSceneIdx * 17.3) * 43758.5453;
            const frac = hash - Math.floor(hash);
            const bandDist = Math.abs(r / rows - sweepBand);
            const threshold = 0.72 - pulse * 0.42 + bandDist * 0.25;
            if (frac > threshold) {
              const blockAlpha = Math.min(0.28, (frac - threshold) * pulse * 0.9);
              ctx.fillStyle =
                frac > 0.93
                  ? `rgba(242, 230, 201, ${blockAlpha})`
                  : `rgba(${accentRgb}, ${blockAlpha})`;
              ctx.fillRect(c * cell, r * cell, cell - 2, cell - 2);
            }
          }
        }
      }

      // 2. Murk-inspired concentric water/sonar cursor ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.age += dt;
        if (rip.age >= rip.maxAge) {
          ripples.splice(i, 1);
          continue;
        }
        const k = rip.age / rip.maxAge;
        const radius = lerp(8, rip.maxRadius, 1 - Math.pow(1 - k, 2.2));
        const alpha = (1 - k) * 0.36;
        const rgb =
          rip.hue === 'biosphere'
            ? '52, 211, 153'
            : rip.hue === 'sunlit'
            ? '242, 230, 201'
            : '111, 182, 255';

        ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        if (radius > 22) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.45).toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, radius * 0.62, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 3. Drifting atmospheric & biosphere motes
      for (const p of particles) {
        if (!reducedRef.current) {
          p.x = (p.x + p.vx * dt + 1) % 1;
          p.y = (p.y + p.vy * dt + 1) % 1;
        }
        ctx.fillStyle = `rgba(${accentRgb}, ${p.alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x * vw, p.y * vh, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    return () => {
      stopFrame();
      ro.disconnect();
      window.removeEventListener('resize', syncCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-testid="dynamic-earth-stage"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void"
    >
      {/* Cross-fading Earth observation & cosmic photography layers */}
      {BACKDROP_SCENES.map((scene, idx) => (
        <div
          key={scene.id}
          ref={(el) => {
            if (el) layerRefs.current[idx] = el;
          }}
          className="absolute inset-0 will-change-[transform,opacity]"
          style={{
            opacity: idx === 0 ? 1 : 0,
            transform: idx === 5 ? 'scale(1.16)' : 'scale(1.06)',
          }}
        >
          <img
            src={scene.image}
            alt=""
            decoding="async"
            loading={idx === 0 ? 'eager' : 'lazy'}
            className="size-full object-cover brightness-[0.72] contrast-[1.08] saturate-[1.12]"
            style={{ objectPosition: scene.cropStyle ?? '50% 50%' }}
          />
          {/* Deep obsidian + environmental tint gradient scrim for effortless text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                scene.accent === 'biosphere'
                  ? 'radial-gradient(85% 75% at 50% 40%, rgba(5,16,18,0.26) 0%, rgba(5,7,12,0.8) 100%)'
                  : scene.accent === 'sunlit'
                  ? 'radial-gradient(80% 70% at 55% 45%, rgba(16,11,8,0.28) 0%, rgba(5,7,12,0.84) 100%)'
                  : 'radial-gradient(85% 75% at 50% 42%, rgba(5,10,20,0.26) 0%, rgba(5,7,12,0.8) 100%)',
            }}
          />
        </div>
      ))}

      {/* Subtle architectural scanline sweep */}
      <div
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-earth/[0.06] to-transparent opacity-60 motion-reduce:hidden"
        style={{ animation: 'swath-scan 9s linear infinite' }}
      />

      {/* Interactive hydro-ripple & pixel-matrix transition canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
