const questions = [
  ['Is my reading data private?', 'Absolutely. Your notes and reading history are stored locally on your device by default, with optional encrypted cloud backup.'],
  ['Can I export my notes?', 'Yes. Export to Markdown, PDF, or directly to Notion and Obsidian to integrate with your second brain.'],
  ['Does it work offline?', 'ReadFlow is designed to be distraction-free. It works perfectly without an internet connection.'],
  ['How is this different from Goodreads?', 'Goodreads is for discovery and social. ReadFlow is for the act of reading itself-focusing, tracking, and learning.'],
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif text-center mb-12 text-stone-900">Common Questions</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {questions.map(([question, answer]) => (
          <div key={question} className="bg-white p-6 rounded shadow-sm border border-stone-200">
            <h4 className="font-medium text-stone-900 mb-2">{question}</h4>
            <p className="text-sm text-stone-600 leading-relaxed">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
