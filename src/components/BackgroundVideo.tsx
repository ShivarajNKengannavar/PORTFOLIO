import ambientVideo from '/src/assets/bg/ambient.webm';

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-30 blur-[2px]"
      >
        <source src={ambientVideo} type="video/webm" />
      </video>

      {/* Soft color tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-rose-500/20 mix-blend-overlay" />

      {/* Optional grain (if you have grain.png) */}
      {/* <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.05] mix-blend-overlay" /> */}
    </div>
  );
}
