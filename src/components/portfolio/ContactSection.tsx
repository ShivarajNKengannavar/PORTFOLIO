import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Linkedin, Github, MapPin, Loader2, Film } from "lucide-react";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import InfiniteCarousel from "./InfiniteCarousel";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface SubmitStatus {
  success: boolean;
  message: string;
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // State management
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (!formRef.current) {
        throw new Error('Form reference is not available');
      }

      const response = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus({
        success: false,
        message: 'Oops! Something went wrong. Please try again or email me directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (field: string) => `
    w-full px-6 py-4 rounded-2xl bg-background/50 border-2 
    font-montserrat text-foreground placeholder:text-muted-foreground/50
    transition-all duration-500 outline-none
    ${focusedField === field 
      ? "border-lavender shadow-lg shadow-lavender/20" 
      : "border-border hover:border-muted-foreground/50"
    }
  `;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-12 md:py-16 px-6 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000000, transparent)" }} />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-lavender/10 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-bodoni italic font-bold text-[clamp(3.2rem,8vw,6.5rem)] tracking-[-0.02em] leading-[0.92] mb-4">
            Let's <span className="aurora-text">Connect</span>
          </h2>
          <div className="section-divider" />
          <p className="mt-6 font-inter text-muted-foreground max-w-2xl mx-auto tracking-normal leading-relaxed">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Infinite Carousel Section - Moved Above Grid */}
        <div className="mb-6">
            <InfiniteCarousel />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 items-start mb-8">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="glass-card p-8">
              <h3 className="font-bodoni italic font-bold text-2xl tracking-[-0.02em] leading-[0.92] mb-2">Get in Touch</h3>
              <div className="space-y-2">
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <a href="mailto:shivarajnkengannavar@gmail.com" className="flex items-center gap-4 w-full">
                    <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 w-full">
                      <div className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center group-hover:bg-lavender/30 transition-colors">
                        <Mail className="w-5 h-5 text-lavender" />
                      </div>
                      <div>
                        <p className="font-inter text-sm text-muted-foreground tracking-normal">Email</p>
                        <p className="font-inter text-foreground group-hover:text-lavender transition-colors tracking-normal">
                          shivarajnkengannavar@gmail.com
                        </p>
                      </div>
                    </motion.div>
                  </a>
                </div>

                {/* Location */}
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-muted-foreground tracking-normal">Location</p>
                    <p className="font-inter text-foreground tracking-normal">Bengaluru, Karnataka, India</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-3 pt-6 border-t border-border">
                <p className="font-inter text-sm text-muted-foreground mb-1 tracking-normal">Find me on</p>
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.linkedin.com/in/shivaraj-n-kengannavar"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-lavender hover:border-lavender/50 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/ShivarajNKengannavar"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-lavender hover:border-lavender/50 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="glass-card p-4 space-y-2"
            >
              {/* Status Message */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.success 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )}

              {/* Name Field */}
              <motion.div animate={{ scale: focusedField === "name" ? 1.02 : 1 }}>
                <label className="block font-montserrat text-sm text-muted-foreground mb-2">Your Name</label>
                <input
                  type="text"
                  name="from_name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  className={inputClasses("name")}
                  required
                />
              </motion.div>

              {/* Email Field */}
              <motion.div animate={{ scale: focusedField === "email" ? 1.02 : 1 }}>
                <label className="block font-montserrat text-sm text-muted-foreground mb-2">Your Email</label>
                <input
                  type="email"
                  name="from_email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  className={inputClasses("email")}
                  required
                />
              </motion.div>

              {/* Message Field */}
              <motion.div animate={{ scale: focusedField === "message" ? 1.02 : 1 }}>
                <label className="block font-montserrat text-sm text-muted-foreground mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                  className={inputClasses("message")}
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-lavender text-white font-montserrat font-medium transition-all hover:bg-lavender/90 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Tour Guide Section (Credits) - Moved to Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative py-3 mt-4 border-t border-white/5"
        >
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-black/80 via-orange-900/60 to-black/80 backdrop-blur-lg border border-orange-500/30 shadow-xl"
            >
              {/* Animated Header */}
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-lg shadow-orange-400/50"
                />
                <h3 className="font-bodoni italic text-xl bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent tracking-wide">
                  Ready for the finale?
                </h3>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full shadow-lg shadow-orange-500/50"
                />
              </div>
              
              <p className="font-montserrat text-orange-200/80 text-sm tracking-wide max-w-sm">
                Experience the cinematic credits sequence
              </p>
              
              <Link to="/credits">
                <motion.button
                  whileHover={{ 
                    y: -3, 
                    scale: 1.03,
                    boxShadow: "0 15px 30px rgba(251, 146, 60, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-black backdrop-blur-sm border border-orange-400/50 font-montserrat text-sm font-semibold text-white shadow-lg shadow-orange-500/30 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-orange-600 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  <div className="relative flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Film className="w-4 h-4 text-white drop-shadow-sm" />
                    </motion.div>
                    <span className="text-white drop-shadow-sm">View Credits</span>
                  </div>
                </motion.button>
              </Link>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-inter text-orange-300/60 text-xs italic tracking-wide"
              >
                ✨ Don't miss the spectacular ending
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;