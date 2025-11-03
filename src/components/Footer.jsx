import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-slate-900 py-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/70">© {new Date().getFullYear()} AquaFlow — Built for immersive web experiences.</p>
        <div className="flex items-center gap-4 text-white/80">
          <a className="hover:text-white transition-colors" href="#experience">Experience</a>
          <a className="hover:text-white transition-colors" href="#features">Features</a>
          <a className="hover:text-white transition-colors" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
