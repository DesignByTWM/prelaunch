/**
 * KeywordTicker
 *
 * Approved V2: black ground with the brushed metal texture, a 20 percent
 * overlay, edge mask fade and a 34 second linear drift. Two identical
 * sequences make the loop seamless.
 *
 * The whole band is aria-hidden in V2 because the same phrases are already
 * announced in the services section below it. Kept that way.
 */

const phrases = [
  "Blackout Packages",
  "Paint Protection Film",
  "Vehicle Wraps",
  "Wheels & Fitment",
  "Interior Transformation",
  "Suspension",
  "Paint & Body",
  "Lighting",
  "Audio",
  "Truck Accessories",
  "Houston, Texas",
];

function Sequence() {
  return (
    <div className="ticker-seq">
      {phrases.map((phrase) => (
        <span key={phrase} style={{ display: "contents" }}>
          <span>{phrase}</span>
          <i>◆</i>
        </span>
      ))}
    </div>
  );
}

export function KeywordTicker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}
