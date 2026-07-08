import TopBar from "./TopBar.jsx";
import DestinationStage from "./DestinationStage.jsx";
import PortfolioControls from "./PortfolioControls.jsx";

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
  onPrevious,
  onNext,
  onClose,
  onExplore
}) {
  return (
    <main className="portfolio" aria-label="Book carousel portfolio">
      <TopBar />
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
    </main>
  );
}
