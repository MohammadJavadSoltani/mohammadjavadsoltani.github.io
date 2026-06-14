import { useEffect, useRef } from 'react';

export default function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 120;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 10;

    let angle = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Circles
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (r / 4) * i, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(42, 157, 143, ${0.15 + i * 0.05})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Cross lines
      ctx.strokeStyle = 'rgba(42, 157, 143, 0.2)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI / 4) * i;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        ctx.stroke();
      }

      // Sweep

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const grad = ctx.createLinearGradient(0, 0, r, 0);
      grad.addColorStop(0, 'rgba(42, 157, 143, 0.6)');
      grad.addColorStop(1, 'rgba(42, 157, 143, 0)');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, -Math.PI / 6, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(42, 157, 143, 0.15)';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(r, 0);
      ctx.strokeStyle = '#2a9d8f';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#2a9d8f';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();

      // Blips
      const blips = [
        { a: 0.8, d: 0.6 },
        { a: 2.3, d: 0.8 },
        { a: 4.1, d: 0.45 },
        { a: 5.5, d: 0.7 },
      ];
      blips.forEach(b => {
        const bx = cx + r * b.d * Math.cos(b.a);
        const by = cy + r * b.d * Math.sin(b.a);
        const diff = ((b.a - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const fade = diff < 0.5 ? 1 : Math.max(0, 1 - (diff - 0.5) / (Math.PI * 2));
        if (fade > 0.05) {
          ctx.beginPath();
          ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(233, 196, 106, ${fade})`;
          ctx.shadowColor = '#e9c46a';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#2a9d8f';
      ctx.fill();

      angle += 0.02;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <canvas ref={canvasRef} className="opacity-80" />
      <span className="font-mono-jet text-[10px] text-[#2a9d8f]/60 tracking-widest">SCAN ACTIVE</span>
    </div>
  );
}
