const steps = [
  ['Add to Library', 'Import your physical and digital books.'],
  ['Start Session', 'Set a goal and start the focus timer.'],
  ['Capture Insights', 'Jot down thoughts as they emerge.'],
  ['Review', 'See your knowledge base grow.'],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-stone-100 relative">
      <div
        className="absolute top-0 left-0 w-full h-8 bg-white z-10"
        style={{
          clipPath:
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 2% 50%, 4% 100%, 6% 50%, 8% 100%, 10% 50%, 12% 100%, 14% 50%, 16% 100%, 18% 50%, 20% 100%, 22% 50%, 24% 100%, 26% 50%, 28% 100%, 30% 50%, 32% 100%, 34% 50%, 36% 100%, 38% 50%, 40% 100%, 42% 50%, 44% 100%, 46% 50%, 48% 100%, 50% 50%, 52% 100%, 54% 50%, 56% 100%, 58% 50%, 60% 100%, 62% 50%, 64% 100%, 66% 50%, 68% 100%, 70% 50%, 72% 100%, 74% 50%, 76% 100%, 78% 50%, 80% 100%, 82% 50%, 84% 100%, 86% 50%, 88% 100%, 90% 50%, 92% 100%, 94% 50%, 96% 100%, 98% 50%)',
          transform: 'rotate(180deg)',
          marginTop: '-1px',
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-serif text-center mb-16 text-stone-900">How It Works</h2>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-stone-300 border-l border-dashed border-stone-400" />

          <div className="space-y-12">
            {steps.map(([title, description], index) => {
              const odd = index % 2 === 0;
              return (
                <div key={title} className="relative flex flex-col md:flex-row items-center md:justify-between gap-6 group">
                  <div className={`md:w-1/2 md:text-right md:pr-12 order-2 md:order-1 ${odd ? '' : 'hidden md:block'}`}>
                    {odd && (
                      <>
                        <h4 className="text-lg font-medium text-stone-900">{title}</h4>
                        <p className="text-sm text-stone-600 mt-1">{description}</p>
                      </>
                    )}
                  </div>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-orange-500 z-10 shadow-sm" />
                  <div className={`md:w-1/2 md:pl-12 order-3 md:order-2 ${odd ? 'hidden md:block' : ''}`}>
                    {!odd && (
                      <>
                        <h4 className="text-lg font-medium text-stone-900">{title}</h4>
                        <p className="text-sm text-stone-600 mt-1">{description}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
