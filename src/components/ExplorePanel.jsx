import GalleryPanel from "./GalleryPanel.jsx";

export default function ExplorePanel({ destination, isOpen, onClose }) {
  return (
    <aside
      className={`explore-panel${isOpen ? " is-open" : ""}`}
      id="explore-panel"
      aria-label="Book photo contact sheet"
      aria-hidden={!isOpen}
    >
      <div className="panel-head">
        <span>Contact Sheet</span>
        <strong>{destination.name}</strong>
        <button className="panel-close" type="button" aria-label="Close contact sheet" onClick={onClose}>
          Close
        </button>
      </div>
      <GalleryPanel destination={destination} />
    </aside>
  );
}
