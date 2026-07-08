export default function IntroCard({ destination, index, pickedIndex, onOpen }) {
  const isPicked = pickedIndex === index;

  return (
    <button
      className={`intro-card${isPicked ? " is-picked" : ""}`}
      type="button"
      aria-label={`Open ${destination.name}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onOpen(index);
      }}
    >
      <img src={destination.photo} alt="" />
    </button>
  );
}
