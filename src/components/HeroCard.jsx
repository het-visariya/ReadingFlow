import Viewfinder from "./Viewfinder.jsx";

function titleClass(name) {
  return [
    "destination",
    name.length <= 6 ? "is-short" : "",
    name.length >= 12 ? "is-long" : ""
  ]
    .filter(Boolean)
    .join(" ");
}

export default function HeroCard({ destination, phase, slide, heroScale }) {
  return (
    <div
      className={`hero-wrap${phase ? ` ${phase}` : ""}`}
      id="hero"
      style={{
        "--slide": slide,
        "--hero-scale": heroScale
      }}
    >
      <figure className="hero-photo">
        <img alt={destination.alt} src={destination.photo} />
      </figure>
      <h1 className={titleClass(destination.name)}>{destination.name}</h1>
      <Viewfinder />
      <div className="meta-readout">{destination.readout}</div>
    </div>
  );
}
