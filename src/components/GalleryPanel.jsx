import { useEffect, useMemo, useRef } from "react";

export default function GalleryPanel({ destination }) {
  const galleryRef = useRef(null);
  const expandedGallery = useMemo(
    () => [...destination.gallery, ...destination.gallery, ...destination.gallery.slice(0, 4)],
    [destination]
  );

  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = 0;
    }
  }, [destination]);

  return (
    <div className="gallery" id="gallery" ref={galleryRef}>
      {expandedGallery.map((src, index) => (
        <figure key={`${src}-${index}`}>
          <img src={src} alt={`${destination.name} photograph ${index + 1}`} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
