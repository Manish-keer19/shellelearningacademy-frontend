
import HeroSection from "./nexaPages/HeroSection";
import AboutSection from "./nexaPages/AboutSection";
import FeaturesSection from "./nexaPages/FeaturesSection";
import HowItWorksSection from "./nexaPages/HowItWorksSection";
import TestimonialsSection from "./nexaPages/TestimonialsSection";
import CTASection from "./nexaPages/CTASection";
import ChatPreviewSection from "./nexaPages/ChatPreviewSection";

import WaveDivider from "./nexaPages/WaveDivider";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";



const NexaHome = () => {
  return (
    <div className="min-h-screen bg-background w-full">
      <Navbar />

      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <ChatPreviewSection />
        <WaveDivider />
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="contact">
          <CTASection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NexaHome;
