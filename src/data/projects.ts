export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  progressLabel: string;
  progressValue: number;
  stats: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  gradientClass: string;
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "securestego",
    title: "SecureStego",
    subtitle: "Multi-Media Steganography Suite",
    description: "A pioneering steganography solution that elegantly conceals secrets within images, audio, and video. Featuring AES-256 encryption and a beautiful Flask-based interface, it transforms invisible data protection into an art form.",
    image: "/projects/securestego.png",
    progressLabel: "Achieving 99% data integrity with invisible embedding",
    progressValue: 99,
    stats: [
      { label: "Data Integrity", value: "99%" },
      { label: "Media Types", value: "3+" },
      { label: "Encryption", value: "AES-256" },
    ],
    technologies: ["Python", "Flask", "OpenCV", "PyAudio", "MoviePy", "Cryptography"],
    gradientClass: "gradient-text-cyan",
    githubUrl: "https://github.com/ShivarajNKengannavar",
  },
  {
    id: "hiresume",
    title: "hiREsume",
    subtitle: "AI-Powered Career Platform",
    description: "An intelligent resume screening ecosystem that harnesses power of AI to match talents with opportunities. Built with semantic understanding and advanced NLP, it revolutionizes how companies discover exceptional candidates.",
    image: "/projects/hiresume.png",
    progressLabel: "90%+ accuracy in semantic job matching",
    progressValue: 90,
    stats: [
      { label: "Match Accuracy", value: "90%+" },
      { label: "Processing Speed", value: "< 2s" },
      { label: "AI Models", value: "RAG" },
    ],
    technologies: ["Python", "LangChain", "ChromaDB", "React", "FastAPI", "OpenAI"],
    gradientClass: "gradient-text-purple",
    githubUrl: "https://github.com/ShivarajNKengannavar",
  },
  {
    id: "precision-fertilizer",
    title: "Precision Fertilizer",
    subtitle: "Sustainable Agriculture Innovation",
    description: "A machine learning solution that optimizes fertilizer recommendations for healthier crops and a healthier planet. By analyzing soil conditions and crop requirements, it reduces waste while maximizing yield.",
    image: "/projects/precision-fertilizer.png",
    progressLabel: "20% reduction in fertilizer waste",
    progressValue: 80,
    stats: [
      { label: "Waste Reduced", value: "20%" },
      { label: "Accuracy", value: "High" },
      { label: "Impact", value: "Sustainable" },
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "Flask", "Random Forest"],
    gradientClass: "gradient-text-cyan",
    githubUrl: "https://github.com/ShivarajNKengannavar",
  },
  {
    id: "greenhub",
    title: "GreenHub",
    subtitle: "Integrated Online Nursery Management System",
    description: "A comprehensive digital ecosystem designed to streamline nursery operations and enhance plant-shopping experience. By bridging the gap between botanical inventory management and e-commerce, it transforms traditional plant nurseries into efficient, modern retail hubs.",
    image: "/projects/greenhub.png",
    progressLabel: "95% Operational Efficiency with 100% Order Accuracy",
    progressValue: 95,
    stats: [
      { label: "Operational Efficiency", value: "95%" },
      { label: "Order Accuracy", value: "100%" },
      { label: "Plant Categories", value: "Unlimited" },
    ],
    technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Apache"],
    gradientClass: "gradient-text-purple",
    githubUrl: "https://github.com/ShivarajNKengannavar",
  },
  {
    id: "pyroguard",
    title: "PyroGuard AI",
    subtitle: "Real-Time Fire Detection & Segmentation",
    description: "A high-performance computer vision system engineered to identify and isolate fire hazards in real-time. Utilizing state-of-the-art deep learning architectures, it doesn't just detect presence of fire—it precisely segments flame boundaries to provide actionable data for emergency response and automated suppression systems.",
    image: "/projects/pyroguard.png",
    progressLabel: "96% Detection Accuracy with 45ms Inference Speed",
    progressValue: 96,
    stats: [
      { label: "Detection Accuracy", value: "96%" },
      { label: "Inference Speed", value: "45ms" },
      { label: "Detection Modes", value: "Dual" },
    ],
    technologies: ["Python", "PyTorch", "TensorFlow", "OpenCV", "YOLOv8", "DeepLabV3+", "NumPy"],
    gradientClass: "gradient-text-orange",
    githubUrl: "https://github.com/ShivarajNKengannavar",
  },
  {
    id: "vaidya",
    title: "VAIDYA",
    subtitle: "Disease Prediction & Drug Recommendation System",
    description: "A cutting-edge healthcare assistant that leverages machine learning to bridge the gap between symptom recognition and clinical guidance. VAIDYA (meaning 'Physician' in Sanskrit) analyzes user-input symptoms to predict potential ailments with high precision and provides data-driven recommendations for medications, precautions, and lifestyle adjustments.",
    image: "/projects/vaidya.png",
    progressLabel: "96% Prediction Accuracy across 40+ Disease Categories",
    progressValue: 96,
    stats: [
      { label: "Prediction Accuracy", value: "96%" },
      { label: "Disease Categories", value: "40+" },
      { label: "Health Planning", value: "Integrated" },
    ],
    technologies: ["Python", "Scikit-Learn", "Flask", "Pandas", "NumPy", "HTML5", "Bootstrap5"],
    gradientClass: "gradient-text-blue",
    githubUrl: "https://github.com/ShivarajNKengannavar",
  },
];
