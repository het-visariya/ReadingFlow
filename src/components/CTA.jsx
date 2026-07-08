export default function CTA() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="py-20 text-center relative overflow-hidden bg-stone-900">
      <div className="absolute inset-0 opacity-10 bg-noise z-0 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Ready to read smarter?</h2>
        <p className="text-stone-400 mb-8 font-light text-lg">Join the waitlist and get early access to the future of reading.</p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 w-full"
          />
          <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded font-medium transition-colors whitespace-nowrap">
            Join Waitlist
          </button>
        </form>
      </div>
    </section>
  );
}
