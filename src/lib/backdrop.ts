import { clamp, smoothstep } from './math';

export interface ChapterBounds {
  id: string;
  top: number;
  height: number;
}

export interface BackdropState {
  activeIndex: number;
  /** Per-scene opacity weights aligned to chapters. */
  weights: number[];
  /** 0..1 intensity peaking right when crossing between two chapters (triggers pixel-matrix dissolve). */
  transitionPulse: number;
  /** Normalized progress through the current chapter (0..1). */
  chapterProgress: number;
}

/**
 * Computes smooth cross-fade weights across chapters plus a boundary transition pulse
 * centered around viewport mid-screen transitions. Pure function for deterministic testing.
 */
export function computeBackdropState(
  scrollY: number,
  viewportHeight: number,
  chapters: ChapterBounds[]
): BackdropState {
  if (chapters.length === 0) {
    return { activeIndex: 0, weights: [], transitionPulse: 0, chapterProgress: 0 };
  }

  const probeY = scrollY + viewportHeight * 0.45;
  let activeIndex = 0;

  for (let i = 0; i < chapters.length; i++) {
    if (probeY >= chapters[i].top) {
      activeIndex = i;
    }
  }

  const weights = new Array<number>(chapters.length).fill(0);
  const blendBand = Math.max(160, viewportHeight * 0.45);
  let transitionPulse = 0;

  const current = chapters[activeIndex];
  const chapterProgress = clamp((probeY - current.top) / Math.max(1, current.height));

  if (activeIndex < chapters.length - 1) {
    const next = chapters[activeIndex + 1];
    const distToNext = next.top - probeY;
    if (distToNext <= blendBand) {
      const t = smoothstep(clamp(1 - distToNext / blendBand));
      weights[activeIndex] = 1 - t;
      weights[activeIndex + 1] = t;
      // Peaks cleanly at 1.0 when t = 0.5 (mid-crossfade)
      transitionPulse = Math.sin(t * Math.PI);
      return { activeIndex, weights, transitionPulse, chapterProgress };
    }
  }

  if (activeIndex > 0) {
    const distFromStart = probeY - current.top;
    if (distFromStart <= blendBand * 0.65) {
      const t = clamp(distFromStart / (blendBand * 0.65));
      transitionPulse = Math.sin((0.5 + t * 0.5) * Math.PI) * 0.7;
    }
  }

  weights[activeIndex] = 1;
  return { activeIndex, weights, transitionPulse, chapterProgress };
}
