import React, { useEffect, useRef } from 'react';

/*
  WaterfallCanvas renders a highly-performant particle-based waterfall.
  - Particles spawn from a source near the top-center (as if from a bottle mouth)
  - Scroll speed controls emission rate for a responsive, smooth feel
  - Uses requestAnimationFrame and a single canvas for optimal performance
*/
export default function WaterfallCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);
  const emissionRef = useRef({ base: 140, extra: 0 });
  const scrollStateRef = useRef({ lastY: 0, lastT: 0, velocity: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.clientWidth * devicePixelRatio);
    let height = (canvas.height = canvas.clientHeight * devicePixelRatio);

    const handleResize = () => {
      width = canvas.width = canvas.clientWidth * devicePixelRatio;
      height = canvas.height = canvas.clientHeight * devicePixelRatio;
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(16, now - scrollStateRef.current.lastT);
      const dy = y - scrollStateRef.current.lastY;
      // Basic velocity in px/s
      const v = (dy / dt) * 1000;
      // Smooth velocity using a simple low-pass filter
      scrollStateRef.current.velocity = scrollStateRef.current.velocity * 0.85 + v * 0.15;
      scrollStateRef.current.lastY = y;
      scrollStateRef.current.lastT = now;
      // Map velocity to additional emission amount
      emissionRef.current.extra = Math.max(0, Math.min(260, Math.abs(scrollStateRef.current.velocity) * 1.2));
    };

    const opts = {
      gravity: 2200, // px/s^2
      drag: 0.0015,
      splash: 0.18,
      radiusMin: 1.2,
      radiusMax: 3.4,
      hue: 196,
      saturation: 100,
      lightness: 60,
      alpha: 0.88,
    };

    const spawnParticle = () => {
      const mouthX = width * 0.5 + (Math.random() - 0.5) * (width * 0.02);
      const mouthY = height * 0.08 + (Math.random() - 0.5) * (height * 0.01);
      const speed = 120 + Math.random() * 80;
      const angle = Math.PI * (1.02 + (Math.random() - 0.5) * 0.15); // mostly downward
      const vx = Math.cos(angle) * speed * (devicePixelRatio);
      const vy = Math.sin(angle) * speed * (devicePixelRatio);
      const r = (opts.radiusMin + Math.random() * (opts.radiusMax - opts.radiusMin)) * devicePixelRatio;
      particlesRef.current.push({ x: mouthX, y: mouthY, vx, vy, r, life: 1 });
    };

    const step = (t) => {
      const dt = Math.min(34, t - (lastTimeRef.current || t));
      lastTimeRef.current = t;
      // fade trail
      ctx.fillStyle = 'rgba(5, 15, 30, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // emission
      const total = emissionRef.current.base + emissionRef.current.extra;
      const spawnCount = Math.floor((total * dt) / 1000);
      for (let i = 0; i < spawnCount; i++) spawnParticle();

      // update and draw
      const drag = opts.drag;
      const gy = opts.gravity * (dt / 1000) * devicePixelRatio;
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= 1 - drag;
        p.vy = p.vy * (1 - drag) + gy;
        p.x += p.vx * (dt / 1000);
        p.y += p.vy * (dt / 1000);
        p.life -= 0.005 * (dt / 16);

        // bounce/splash near bottom
        if (p.y > height * 0.92) {
          p.y = height * 0.92;
          p.vy *= -opts.splash;
          p.vx *= 0.9;
        }

        // cull
        if (p.y > height + 40 * devicePixelRatio || p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        const a = Math.max(0, Math.min(opts.alpha, p.life * opts.alpha));
        ctx.fillStyle = `hsla(${opts.hue} ${opts.saturation}% ${opts.lightness}% / ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      rafRef.current = requestAnimationFrame(step);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // prime canvas background
    ctx.fillStyle = 'rgba(2,8,20,1)';
    ctx.fillRect(0, 0, width, height);

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative h-[160vh] w-full bg-slate-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
      {/* top label */}
      <div className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Seamless Waterfall</h2>
        <p className="mt-3 text-white/70 md:text-lg">Scroll to increase the pour. The animation is tuned for smoothness and high frame rates.</p>
      </div>
    </div>
  );
}
