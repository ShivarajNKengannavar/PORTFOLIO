import { motion } from "framer-motion";

// Replace with your real images
const images = [
  "/about/about-01.jpg",
  "/about/about-02.jpg", 
  "/about/about-03.jpg",
  "/about/about-04.jpg",
  "/about/about-05.jpeg",
  "/about/about-08.jpg"
];

const InfiniteCarousel = () => {
  return (
    <div className="relative w-full overflow-hidden py-16 bg-black">
      {/* 1. GRADIENT MASKS (Fades edges so images don't just 'pop' out) */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
      
     

      {/* 2. THE CAROUSEL TRACK */}
      <div className="flex">
        <motion.div
          // flex-nowrap: Forces items to stay in one long line (The Chain)
          className="flex gap-8 flex-nowrap"
          animate={{
            x: "-50%", // We slide exactly 50% because we doubled the list
          }}
          transition={{
            ease: "linear",
            duration: 25, // Speed of the cycle (Higher = Slower)
            repeat: Infinity, // Never stops
          }}
          style={{ width: "max-content" }} // CRITICAL: Ensures the div is huge enough to hold everything
        >
          {/* 3. DOUBLE RENDER
             We render the list TWICE. 
             When Image 1 (Set 1) disappears, Image 1 (Set 2) takes its exact spot.
          */}
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="relative w-[300px] h-[400px] flex-shrink-0 group cursor-pointer"
            >
              <div className="w-full h-full rounded-2xl border border-white/10 overflow-hidden relative">
                <img
                  src={src}
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;