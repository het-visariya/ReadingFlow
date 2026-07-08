export default function Footer() {
  return (
    <footer className="bg-stone-100 text-stone-500 py-12 text-sm border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-stone-900">ReadFlow</span>
          <span className="text-xs">© 2025</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-orange-600 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-orange-600 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-orange-600 transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
