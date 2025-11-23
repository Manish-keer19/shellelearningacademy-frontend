import { Navigation } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Award, Zap } from "lucide-react";
import FeaturedCourses from "./Course/FeaturedCourses";
import { CategoriesSection } from "./CategoriesSection"
import Testimonials from "./Testimonials";
import WhyChooseShell from "./WhyChooseShell";
import NewsletterSection from "./NewsletterSection";

// import { TrustedCompanies } from "@/components/TrustedCompanies";
// import { InstructorsSection } from "@/components/InstructorsSection";
// import { CertificationsSection } from "@/components/CertificationsSection";

const Index = () => {
  // ... existing code ...
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        <Hero />
        {/* <TrustedCompanies /> */}
        <CategoriesSection />
        <FeaturedCourses />
        {/* <CertificationsSection /> */}
        {/* <InstructorsSection /> */}
        <WhyChooseShell />
        <Testimonials />
        <NewsletterSection />

      </main>

      <Footer />
    </div>
  );
};

export default Index;
