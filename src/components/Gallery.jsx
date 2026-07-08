import useGallery from '../hooks/useGallery.js';

const books = [
  {
    src: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    className: '-rotate-6 translate-y-4',
  },
  {
    src: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
    className: 'rotate-3 translate-y-8',
  },
  {
    src: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
    className: '-rotate-2 -translate-y-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop',
    className: 'rotate-6 translate-y-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=800&auto=format&fit=crop',
    className: '-rotate-3 translate-y-6',
  },
  {
    src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
    className: 'rotate-2 -translate-y-1',
  },
];

export default function Gallery() {
  const { activeCard, containerRef, handleCardClick } = useGallery();

  return (
    <div className="mt-16 sm:mt-24 max-w-5xl mx-auto relative w-full animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="-top-8 left-[5%] sm:left-[10%] z-40 absolute animate-[bounce_4s_infinite]">
        <div className="relative group cursor-pointer hover:-translate-y-1 transition-transform">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 bg-white border border-stone-200 rounded-full py-1.5 px-3 shadow-beautiful hover:shadow-lg transition-shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Fiction
          </span>
        </div>
      </div>

      <div className="-top-12 right-[5%] sm:right-[15%] z-40 absolute animate-[bounce_5s_infinite]">
        <div className="relative group cursor-pointer hover:-translate-y-1 transition-transform">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 bg-white border border-stone-200 rounded-full py-1.5 px-3 shadow-beautiful hover:shadow-lg transition-shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Philosophy
          </span>
        </div>
      </div>

      <div className="flex justify-center w-full px-4" ref={containerRef}>
        <div className="grid grid-cols-6 gap-3 sm:gap-6 w-full max-w-4xl">
          {books.map((book, index) => {
            const isActive = activeCard === index;
            const isInactive = activeCard !== null && !isActive;
            const activeClass = isActive
              ? 'scale-[1.15] -translate-y-2.5 rotate-0 z-50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]'
              : `${book.className} z-auto`;
            const inactiveClass = isInactive ? 'blur-[4px] grayscale opacity-50 scale-95 z-[1]' : '';

            return (
              <button
                type="button"
                key={book.src}
                className={`card-item col-span-2 sm:col-span-1 transform cursor-pointer group text-left ${activeClass} ${inactiveClass}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleCardClick(index);
                }}
                aria-label={`Select book cover ${index + 1}`}
              >
                <span className="block aspect-[2/3] relative rounded-r-md rounded-l-sm bg-white shadow-book overflow-hidden border-l-2 border-stone-100 ring-1 ring-black/5 group-hover:ring-orange-500/30 transition-shadow">
                  <img src={book.src} className="w-full h-full object-cover" alt="Book Cover" />
                  <span className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
