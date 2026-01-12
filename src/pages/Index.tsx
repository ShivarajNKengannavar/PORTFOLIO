import { useState } from 'react';
import Navigation from "@/components/portfolio/Navigation";
import IntroLoader from "@/components/portfolio/IntroLoader";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import WhyDifferent from "@/components/portfolio/WhyDifferent";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsDivider from "@/components/portfolio/ProjectsDivider";
//import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ProjectsWave from "@/components/portfolio/ProjectsWave";
//import MoreProjectsSection from "@/components/portfolio/MoreProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import CatPeepsSection from "@/components/portfolio/CatPeepsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <IntroLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden bg-[#000000]">
      <Navigation />
      <main className="bg-[#000000]">
        <HeroSection />
        <AboutSection />
        <WhyDifferent />
        <SkillsSection />
        <ProjectsDivider />
        <ProjectsWave />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;