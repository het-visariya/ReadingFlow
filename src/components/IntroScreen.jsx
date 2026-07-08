import TopBar from "./TopBar.jsx";
import IntroCard from "./IntroCard.jsx";

export default function IntroScreen({ destinations, pickedIndex, onOpen }) {
  return (
    <section className="intro" aria-label="Choose a book to open the carousel">
      <TopBar />
      <div className="intro-strip" id="intro-strip">
        {destinations.map((destination, index) => (
          <IntroCard
            key={destination.name}
            destination={destination}
            index={index}
            pickedIndex={pickedIndex}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}
