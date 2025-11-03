import React from 'react';
import Navbar from './components/Navbar';
import BottleScene from './components/BottleScene';
import WaterfallCanvas from './components/WaterfallCanvas';
import Features from './components/Features';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white font-inter">
      <Navbar />

      {/* 3D hero experience */}
      <main className="pt-16">
        <BottleScene />
        <WaterfallCanvas />
        <Features />
      </main>

      <Footer />
    </div>
  );
}
