import { ArrowRight, ExternalLink } from 'lucide-react';
import AnimatedCarousel from './AnimatedCarousel.jsx';
import Navbar from './Navbar.jsx';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-6 pb-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] right-[20%] w-[60%] h-[60%] bg-orange-200/40 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] bg-stone-200/60 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-6 relative z-10">
        <Navbar />

        <div className="flex-1 flex flex-col justify-center pt-8 sm:pt-24 pb-12">
          <div className="mx-auto max-w-4xl text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl sm:text-7xl lg:text-7xl leading-[0.95] tracking-tighter text-stone-900 font-serif font-medium mb-8">
              Curate your mental
              <br />
              library.
            </h1>
            <p className="mx-auto max-w-xl text-lg sm:text-xl text-stone-500 font-light leading-relaxed">
              Transform scattered reading into structured knowledge. Visualize your progress and build a legacy of ideas.
            </p>
          </div>

          <AnimatedCarousel />

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button className="group relative px-8 py-3.5 bg-stone-900 text-white rounded-full text-base font-medium overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-stone-800 to-stone-900" />
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                Start Tracking
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-stone-600 border border-stone-200 text-base font-medium hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/50 transition-all hover:-translate-y-1 shadow-sm"
            >
              View Examples
              <ExternalLink size={16} className="opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
