import { Navbar } from "@/components/Navbar";
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
import { CertificationsSection } from "@/components/CertificationsSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { UniversitySection } from "@/components/UniversitySection";

// import { TrustedCompanies } from "@/components/TrustedCompanies";
// import { InstructorsSection } from "@/components/InstructorsSection";


const Index = () => {

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <SponsorsSection />
        <UniversitySection />
        <CategoriesSection />
        <FeaturedCourses />
        {/* <InstructorsSection /> */}
        <WhyChooseShell />
        <Testimonials />
        <CertificationsSection />
        <NewsletterSection />

      </main>

      <Footer />
    </div>
  );
};

export default Index;
