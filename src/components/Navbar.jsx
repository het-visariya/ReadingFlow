export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="flex bg-gradient-to-br from-orange-500 to-amber-600 w-8 h-8 rounded-full items-center justify-center shadow-md">
          <div className="w-2.5 h-2.5 bg-white rounded-full" />
        </div>
        <span className="text-xl font-serif font-semibold tracking-tight text-stone-900">ReadFlow</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-xs font-medium tracking-widest uppercase hover:text-orange-600 transition-colors text-stone-500">
          Features
        </a>
        <a href="#how-it-works" className="text-xs font-medium tracking-widest uppercase hover:text-orange-600 transition-colors text-stone-500">
          Methodology
        </a>
        <a href="#faq" className="text-xs font-medium tracking-widest uppercase hover:text-orange-600 transition-colors text-stone-500">
          FAQ
        </a>
      </div>

      <div className="flex items-center gap-4">
        <a href="#" className="text-sm font-medium hover:text-stone-900 transition-colors text-stone-500 hidden sm:block">
          Log In
        </a>
        <button
          type="button"
          className="group relative px-5 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <span className="relative z-10">Get Access</span>
        </button>
      </div>
    </nav>
  );
}
