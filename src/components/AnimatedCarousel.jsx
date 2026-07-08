import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Portfolio from "./Portfolio.jsx";
import ExplorePanel from "./ExplorePanel.jsx";
import { books } from "../data/books.js";

const wrap = (value) => (value + books.length) % books.length;

export default function AnimatedCarousel() {
  const [current, setCurrent] = useState(0);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [stageClass, setStageClass] = useState("");
  const [heroPhase, setHeroPhase] = useState("");
  const [slide, setSlide] = useState("0");
  const [heroScale, setHeroScale] = useState("1");

  const isAnimatingRef = useRef(false);
  const timersRef = useRef([]);
  const exploreOpenRef = useRef(exploreOpen);

  const active = books[current];
  const previous = books[wrap(current - 1)];
  const next = books[wrap(current + 1)];

  const queueTimer = useCallback((callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
    return timer;
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    exploreOpenRef.current = exploreOpen;
  }, [exploreOpen]);

  useEffect(() => {
    document.documentElement.style.setProperty("--room-bg", active.bg);
    document.documentElement.style.setProperty("--room-glow", active.glow);
  }, [active]);

  useEffect(() => {
    books.forEach((book) => {
      [book.photo, ...book.gallery].forEach((src) => {
        const image = new Image();
        image.src = src;
      });
    });
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const move = useCallback(
    (delta) => {
      if (isAnimatingRef.current || exploreOpenRef.current) return;

      isAnimatingRef.current = true;
      setStageClass(delta > 0 ? "is-moving-next" : "is-moving-prev");
      setHeroScale("0.988");
      setSlide(delta > 0 ? "-28vw" : "28vw");
      setHeroPhase("is-exiting");

      queueTimer(() => {
        setCurrent((value) => wrap(value + delta));
        setHeroPhase("");
        setHeroScale("0.992");
        setSlide(delta > 0 ? "22vw" : "-22vw");
        setHeroPhase("is-entering");

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHeroPhase("");
            setSlide("0");
            setHeroScale("1");
          });
        });
      }, 150);

      queueTimer(() => {
        setStageClass("");
      }, 520);

      queueTimer(() => {
        isAnimatingRef.current = false;
      }, 620);
    },
    [queueTimer]
  );

  const closePanel = useCallback(() => {
    setExploreOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    closePanel();
  }, [closePanel]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePanel();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePanel, move]);

  return (
    <div>
      <Portfolio
        active={active}
        previous={previous}
        next={next}
        currentIndex={current}
        total={books.length}
        stageClass={stageClass}
        heroPhase={heroPhase}
        slide={slide}
        heroScale={heroScale}
        onPrevious={() => move(-1)}
        onNext={() => move(1)}
        onClose={handleClose}
        onExplore={() => setExploreOpen(true)}
      />
      <ExplorePanel destination={active} isOpen={exploreOpen} onClose={closePanel} />
    </div>
  );
}
