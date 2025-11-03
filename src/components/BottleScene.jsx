import React from 'react';
import Spline from '@splinetool/react-spline';

// Note: Replace the URL with your own Spline scene for a custom water bottle model.
// The given scene is a light, abstract 3D composition to ensure fast loading.
export default function BottleScene() {
  return (
    <div id="experience" className="relative h-[120vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/9fxHyQmGv3N6WJcW/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* gentle radial highlight overlay that does not block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-blue-900/40" />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 -translate-x-1/2 top-24 w-[80vw] max-w-4xl h-[80vw] max-h-[48rem] rounded-full blur-3xl bg-cyan-400/20" />
      </div>
      <div className="absolute bottom-10 left-0 right-0 mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">Hydration in Motion</h1>
        <p className="mt-4 text-white/80 text-lg md:text-xl">Scroll to pour. Experience a silky-smooth waterfall effect synced to your scroll.</p>
      </div>
    </div>
  );
}
