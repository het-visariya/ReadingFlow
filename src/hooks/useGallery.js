import { useCallback, useEffect, useRef, useState } from 'react';

export default function useGallery() {
  const [activeCard, setActiveCard] = useState(null);
  const containerRef = useRef(null);

  const resetCards = useCallback(() => {
    setActiveCard(null);
  }, []);

  const handleCardClick = useCallback((index) => {
    setActiveCard((current) => (current === index ? null : index));
  }, []);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (activeCard !== null && !containerRef.current?.contains(event.target)) {
        resetCards();
      }
    }

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [activeCard, resetCards]);

  return {
    activeCard,
    containerRef,
    handleCardClick,
  };
}
