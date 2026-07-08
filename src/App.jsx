import CTA from './components/CTA.jsx';
import FAQ from './components/FAQ.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';

export default function App() {
  return (
    <div className="bg-stone-50 text-stone-800 antialiased overflow-x-hidden relative selection:bg-orange-200 selection:text-orange-900">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-noise" />
      <div
        className="fixed inset-0 w-full h-full opacity-[0.4] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(#e7e5e4 1px, transparent 1px), linear-gradient(90deg, #e7e5e4 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <Hero />
      <main className="z-10 relative">
        <Features />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
