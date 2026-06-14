import { useEffect, useRef } from 'react';

export default function SatelliteOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    let angle = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Earth
      const earthGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 45);
      earthGrad.addColorStop(0, '#1a3a4a');
      earthGrad.addColorStop(0.5, '#264653');
      earthGrad.addColorStop(1, '#2a9d8f40');
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.fillStyle = earthGrad;
      ctx.fill();
      ctx.strokeStyle = '#2a9d8f40';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Grid lines on earth
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = 'rgba(42, 157, 143, 0.15)';
      ctx.lineWidth = 0.5;
      for (let i = -45; i <= 45; i += 15) {
        ctx.beginPath();
        ctx.moveTo(cx - 45, cy + i);
        ctx.lineTo(cx + 45, cy + i);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + i, cy - 45);
        ctx.lineTo(cx + i, cy + 45);
        ctx.stroke();
      }
      ctx.restore();

      // Orbit path 1
      ctx.beginPath();
      ctx.ellipse(cx, cy, 75, 55, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(42, 157, 143, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbit path 2
      ctx.beginPath();
      ctx.ellipse(cx, cy, 88, 30, -Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(233, 196, 106, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Satellite 1 on orbit 1
      const s1x = cx + 75 * Math.cos(angle) * Math.cos(Math.PI / 6) - 55 * Math.sin(angle) * Math.sin(Math.PI / 6);
      const s1y = cy + 75 * Math.cos(angle) * Math.sin(Math.PI / 6) + 55 * Math.sin(angle) * Math.cos(Math.PI / 6);

      ctx.save();
      ctx.translate(s1x, s1y);
      ctx.rotate(angle);
      ctx.fillStyle = '#2a9d8f';
      ctx.shadowColor = '#2a9d8f';
      ctx.shadowBlur = 8;
      // Body
      ctx.fillRect(-4, -2, 8, 4);
      // Solar panels
      ctx.fillStyle = '#e9c46a';
      ctx.fillRect(-10, -1, 5, 2);
      ctx.fillRect(5, -1, 5, 2);
      ctx.restore();
      ctx.shadowBlur = 0;

      // Satellite 2 on orbit 2
      const a2 = angle * 1.4 + Math.PI;
      const s2x = cx + 88 * Math.cos(a2) * Math.cos(-Math.PI / 4) - 30 * Math.sin(a2) * Math.sin(-Math.PI / 4);
      const s2y = cy + 88 * Math.cos(a2) * Math.sin(-Math.PI / 4) + 30 * Math.sin(a2) * Math.cos(-Math.PI / 4);

      ctx.save();
      ctx.translate(s2x, s2y);
      ctx.rotate(a2);
      ctx.fillStyle = '#f4a261';
      ctx.shadowColor = '#f4a261';
      ctx.shadowBlur = 6;
      ctx.fillRect(-3, -1.5, 6, 3);
      ctx.fillStyle = '#e9c46a40';
      ctx.fillRect(-8, -1, 4, 2);
      ctx.fillRect(4, -1, 4, 2);
      ctx.restore();
      ctx.shadowBlur = 0;

      // Scan ring
      ctx.beginPath();
      ctx.arc(cx, cy, 55 + Math.sin(angle * 2) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(42, 157, 143, ${0.1 + 0.05 * Math.sin(angle * 3)})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      angle += 0.015;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <canvas ref={canvasRef} className="opacity-90 float-anim" />
      <span className="font-mono-jet text-[10px] text-[#2a9d8f]/50 tracking-widest">ORBIT SIM</span>
    </div>
  );
}
