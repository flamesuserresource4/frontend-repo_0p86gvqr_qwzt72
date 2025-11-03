import React from 'react';
import { Droplets, Sparkles, Timer } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-300 grid place-items-center">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-white font-semibold">{title}</h3>
    </div>
    <p className="mt-3 text-white/70 leading-relaxed">{desc}</p>
  </div>
);

export default function Features() {
  return (
    <section id="features" className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Crafted for Smoothness</h2>
          <p className="mt-4 text-white/70 md:text-lg">Performance-forward visuals, subtle motion, and fluid interactivity.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Droplets}
            title="Realistic Flow"
            desc="Physics-inspired particles emulate a natural waterfall with splashes and trails."
          />
          <FeatureCard
            icon={Sparkles}
            title="GPU-Friendly"
            desc="Single-canvas rendering and careful blending keep the frame rate high across devices."
          />
          <FeatureCard
            icon={Timer}
            title="Scroll Reactive"
            desc="Pour rate reacts to your scroll speed for an intuitive, tactile feel."
          />
        </div>
      </div>
    </section>
  );
}
