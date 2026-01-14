# Shivaraj N Kengannavar - Creative Portfolio

A stunning, interactive portfolio website showcasing creative development skills with cutting-edge web technologies, immersive 3D experiences, and smooth animations.

## ✨ Features

### 🎨 **Interactive Elements**
- **3D Sakura Petals**: Beautiful animated cherry blossom particles using WebGL
- **Custom Cursor**: Interactive cursor with magnetic hover effects
- **Smooth Scrolling**: Lenis-powered buttery-smooth scroll experience
- **Audio Experience**: Ambient intro audio with optional glitch effects

### 🎯 **Core Sections**
- **Hero Section**: Eye-catching introduction with animated gradients
- **About Section**: Professional background with 3D ring animations
- **Skills Section**: Interactive skill showcase with orbiting animations
- **Projects Gallery**: Dynamic project cards with 3D wave effects
- **Experience Timeline**: Professional journey visualization
- **Contact Form**: Functional contact form with EmailJS integration

### 🚀 **Technical Highlights**
- **Performance Optimized**: Lazy loading and efficient animations
- **Responsive Design**: Perfect experience across all devices
- **Accessibility**: ARIA labels and keyboard navigation
- **SEO Friendly**: Meta tags and semantic HTML structure

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** - Modern component-based architecture
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **GSAP** - Professional animation library
- **Framer Motion** - Smooth motion animations

### **3D & Graphics**
- **Three.js** - 3D graphics and WebGL
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Helper components for R3F

### **Form & Interaction**
- **React Hook Form** - Performant forms
- **Zod** - Schema validation
- **EmailJS** - Contact form functionality

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **AutoPrefixer** - Cross-browser compatibility

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### **Build for Production**

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Development build (for testing)
npm run build:dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── portfolio/           # Main portfolio components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── IntroLoader.tsx   # Animated intro screen
│   │   ├── Navigation.tsx
│   │   └── ...
│   └── ui/                  # Reusable UI components
├── assets/                  # Static assets
├── hooks/                   # Custom React hooks
├── styles/                  # Global styles
└── utils/                   # Utility functions
```

## 🎨 Key Components

### **IntroLoader**
- WebGL-powered sakura petal animation
- Multilingual welcome sequence
- Audio integration with glitch effects
- Smooth transition to main content

### **SkillsSection**
- Interactive orbiting skill cards
- Category filtering system
- 3D visualization with Three.js
- Responsive grid layout

### **ProjectsWave**
- 3D wave effect for project cards
- Smooth scroll-driven animations
- Interactive hover states
- Dynamic content loading

### **ContactSection**
- Functional contact form
- Real-time validation
- EmailJS integration
- Animated form elements

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file in the root directory:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

### **Customization**
- **Colors**: Modify `tailwind.config.js` for theme customization
- **Animations**: Adjust GSAP timelines in component files
- **3D Settings**: Configure Three.js parameters in respective components

## 🌟 Performance Features

### **Optimizations**
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Lazy loading and WebP support
- **Animation Performance**: GPU-accelerated CSS transforms
- **Bundle Size**: Tree-shaking and minification

### **Browser Support**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### **Mobile Features**
- Touch-optimized interactions
- Simplified navigation
- Performance-optimized animations
- Reduced motion support

## 🎯 Accessibility

### **Features**
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: ARIA labels and descriptions
- **Focus Management**: Logical focus flow
- **Color Contrast**: WCAG AA compliance
- **Reduced Motion**: Respects user preferences

## 🚀 Deployment

### **Vercel** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Netlify**
```bash
# Build and deploy
npm run build
# Upload dist/ folder to Netlify
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🚀 Live Demo
[https://your-portfolio-url.com](https://your-portfolio-url.com)
 

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** - For incredible 3D graphics capabilities
- **GSAP** - For smooth, professional animations
- **shadcn/ui** - For beautiful, accessible components
- **Tailwind CSS** - For rapid UI development
- **React** - For the component-based architecture

## 📞 Contact

- **Email**: shivarajnkengannavar@example.com
- **Portfolio**: https://shivaraj.dev
- **LinkedIn**: [https://www.linkedin.com/in/shivarajkengannavar/)]
- **GitHub**: [(https://github.com/ShivarajNKengannavar)]

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript, and cutting-edge web technologies</p>
  <p>© 2026 Shivaraj N Kengannavar. All rights reserved.</p>
</div>
