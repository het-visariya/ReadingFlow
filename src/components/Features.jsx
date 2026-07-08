import { BookOpen, CheckCircle2, Clock3, Link as LinkIcon } from 'lucide-react';

const problems = [
  {
    icon: BookOpen,
    title: "The Collector's Trap",
    text: '"You buy books with enthusiasm but struggle to actually finish them, leaving shelves full of unread potential."',
    className: 'rotate-[-1deg] border-orange-200',
  },
  {
    icon: LinkIcon,
    title: 'Fleeting Insights',
    text: '"Great ideas slip away because you have nowhere to capture them. Your margins are messy and notebooks get lost."',
    className: 'rotate-[1.5deg] border-stone-300 md:-mt-6',
  },
  {
    icon: Clock3,
    title: 'Inconsistent Habit',
    text: '"Reading feels sporadic despite your best intentions. You lose momentum and forget where you left off."',
    className: 'rotate-[-1.5deg] border-orange-200',
  },
];

export default function Features() {
  return (
    <>
      <section className="relative z-40 py-24 px-6 border-t border-stone-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {problems.map(({ icon: Icon, title, text, className }) => (
              <div
                key={title}
                className={`relative bg-white p-8 shadow-beautiful hover:rotate-0 transition-transform duration-300 min-h-[220px] flex flex-col justify-center border-t-4 ${className}`}
              >
                <div className="mb-4 text-orange-500">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-white/50 relative border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-20">
            <span className="text-orange-600 font-mono text-xs uppercase tracking-widest mb-2 block">The Toolkit</span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-stone-900 tracking-tight">
              Everything you need to read deeper.
            </h2>
          </div>

          <div className="space-y-24">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div className="flex-1 order-2 md:order-1 relative">
                <div className="relative bg-stone-50 p-6 rounded shadow-beautiful border border-stone-100 rotate-[-1deg] max-w-sm mx-auto">
                  <div className="absolute -top-3 left-10 w-16 h-4 bg-orange-300/30 -rotate-2" />
                  <div className="space-y-4">
                    <div className="flex gap-4 items-center p-3 bg-white rounded border border-stone-100 shadow-sm">
                      <div className="w-10 h-14 bg-stone-800 rounded-sm" />
                      <div className="flex-1">
                        <div className="h-2 w-20 bg-stone-200 rounded mb-2" />
                        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div className="w-[75%] h-full bg-green-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center p-3 bg-white rounded border border-stone-100 shadow-sm opacity-60">
                      <div className="w-10 h-14 bg-orange-100 rounded-sm" />
                      <div className="flex-1">
                        <div className="h-2 w-16 bg-stone-200 rounded mb-2" />
                        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div className="w-[30%] h-full bg-orange-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2 text-left">
                <h3 className="text-2xl font-serif text-stone-900 mb-4">Never Lose Your Place</h3>
                <p className="text-stone-600 leading-relaxed mb-6 font-light">
                  Visual progress tracking across your entire library. See exactly where you are in each book and how far you&apos;ve come.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <CheckCircle2 size={18} strokeWidth={1.5} className="text-orange-500" />
                    Beautiful visual library
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <CheckCircle2 size={18} strokeWidth={1.5} className="text-orange-500" />
                    Stay motivated with % completion
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-serif text-stone-900 mb-4">Capture Lightning in a Bottle</h3>
                <p className="text-stone-600 leading-relaxed mb-6 font-light">
                  Create timestamped notes and reflections as you read. Tag insights by theme, connect ideas across books, and build your personal knowledge base.
                </p>
                <p className="text-sm font-medium text-orange-600">Transform reading from consumption to creation.</p>
              </div>
              <div className="flex-1 relative">
                <div className="relative bg-white p-6 rounded-sm shadow-beautiful border border-stone-200 rotate-[1deg] max-w-sm mx-auto">
                  <div className="absolute -top-3 right-10 w-24 h-6 bg-orange-200/50 backdrop-blur-sm -rotate-1" />
                  <div className="font-serif text-lg italic text-stone-800 border-l-2 border-orange-500 pl-4 mb-4">
                    &quot;The only way to win is to learn faster than anyone else.&quot;
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 bg-stone-100 text-[10px] uppercase tracking-wide text-stone-500 rounded">#Strategy</span>
                    <span className="px-2 py-1 bg-stone-100 text-[10px] uppercase tracking-wide text-stone-500 rounded">#Growth</span>
                  </div>
                  <div className="text-xs text-stone-400 font-mono text-right">Page 142 - The Lean Startup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
