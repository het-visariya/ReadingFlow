export default function SideCard({ direction, destination, onClick }) {
  return (
    <button
      className={`photo-shell ${direction}`}
      type="button"
      aria-label={direction === "left" ? "Previous book" : "Next book"}
      onClick={onClick}
    >
      <img alt="" src={destination.photo} />
      <span className="side-name">{destination.name}</span>
    </button>
  );
}
