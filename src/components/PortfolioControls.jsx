export default function PortfolioControls({ onClose, onExplore }) {
  return (
    <div className="controls" aria-label="Portfolio controls">
      <button className="close" type="button" onClick={onClose}>
        Close
      </button>
      <button className="explore" type="button" onClick={onExplore}>
        Explore
      </button>
    </div>
  );
}
