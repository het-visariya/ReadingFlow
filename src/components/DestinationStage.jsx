import SideCard from "./SideCard.jsx";
import HeroCard from "./HeroCard.jsx";

export default function DestinationStage({
  active,
  previous,
  next,
  stageClass,
  heroPhase,
  slide,
  heroScale,
  onPrevious,
  onNext
}) {
  return (
    <section className={`stage${stageClass ? ` ${stageClass}` : ""}`} aria-live="polite">
      <SideCard direction="left" destination={previous} onClick={onPrevious} />
      <HeroCard destination={active} phase={heroPhase} slide={slide} heroScale={heroScale} />
      <SideCard direction="right" destination={next} onClick={onNext} />
    </section>
  );
}
