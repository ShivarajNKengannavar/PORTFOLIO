import { motion } from "framer-motion";

export default function WhyDifferent() {
  return (
    <section className="py-24 px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="justified text-white/80 text-xl leading-relaxed">
          I don't chase trends or build for demos.  
          I focus on systems that hold up under real use — code that stays readable,
          interfaces that stay calm, and decisions that make sense months later.
        </p>
      </motion.div>
    </section>
  );
}
