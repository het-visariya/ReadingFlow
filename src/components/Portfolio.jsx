import TopBar from "./TopBar.jsx";
import DestinationStage from "./DestinationStage.jsx";
import PortfolioControls from "./PortfolioControls.jsx";
import CircularGallery from "./CircularGallery.jsx";

export default function Portfolio({
  active,
  previous,
  next,
  currentIndex,
  total,
  stageClass,
  heroPhase,
  slide,
  heroScale,
  isGalleryStage,
  galleryItems,
  selectedBookIndex,
  onPrevious,
  onNext,
  onClose,
  onExplore,
  onSelectBook
}) {
  return (
    <main className="portfolio" aria-label={isGalleryStage ? "Book gallery launcher" : "Book carousel portfolio"}>
      <TopBar />
      <section className={`gallery-launcher${isGalleryStage ? "" : " is-hidden"}`} aria-label="Choose a book from the gallery" aria-hidden={!isGalleryStage}>
        <div className="gallery-launcher__copy">
          <span className="gallery-launcher__eyebrow">Library View</span>
          <h2 className="gallery-launcher__title">Browse your next read</h2>
          <p className="gallery-launcher__text">Drag, swipe, or use the arrow keys to rotate the shelf and open a title.</p>
        </div>
        <div className="gallery-launcher__stage">
          <CircularGallery
            items={galleryItems}
            isActive={isGalleryStage}
            initialIndex={selectedBookIndex}
            onSelect={onSelectBook}
            bend={3}
            textColor="#f6efe0"
            borderRadius={0.04}
          />
        </div>
      </section>
      {!isGalleryStage ? (
        <>
          <DestinationStage
            active={active}
            previous={previous}
            next={next}
            stageClass={stageClass}
            heroPhase={heroPhase}
            slide={slide}
            heroScale={heroScale}
            onPrevious={onPrevious}
            onNext={onNext}
          />
          <PortfolioControls onClose={onClose} onExplore={onExplore} />
          <div className="index">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </>
      ) : null}
    </main>
  );
}
