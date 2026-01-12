const items = [
  "/about/about-01.jpg",
  "/about/about-02.jpg",
  "/about/about-03.jpg",
  "/about/about-04.jpg",
  "/about/about-05.jpg",
  "/about/about-06.jpg",
];

export default function About3DRing() {
  return (
    <div className="ring-banner">
      <div
        className="ring-slider"
        style={{ ["--quantity" as any]: items.length }}
      >
        {items.map((src, index) => (
          <div
            key={index}
            className="ring-item"
            style={{ ["--position" as any]: index + 1 }}
          >
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
