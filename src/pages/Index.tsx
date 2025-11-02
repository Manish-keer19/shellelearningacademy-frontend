import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Zap } from "lucide-react";
import FeaturedCourses from "./Course/FeaturedCourses";

const Index = () => {
  const courses = [
    {
      title: "Web Development Bootcamp",
      description: "Master modern web development with React, Node.js, and more. Build real-world projects.",
      duration: "12 weeks",
      students: 2340,
      rating: 4.9,
      image: "/placeholder-course.jpg",
      category: "Development",
    },
    {
      title: "UI/UX Design Mastery",
      description: "Learn to create stunning user interfaces and exceptional user experiences.",
      duration: "8 weeks",
      students: 1820,
      rating: 4.8,
      image: "/placeholder-course.jpg",
      category: "Design",
    },
    {
      title: "Digital Marketing Pro",
      description: "Become a digital marketing expert. SEO, social media, content strategy & more.",
      duration: "10 weeks",
      students: 3150,
      rating: 4.7,
      image: "/placeholder-course.jpg",
      category: "Marketing",
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of real-world experience.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a thriving community of learners and mentors who support your growth.",
    },
    {
      icon: Award,
      title: "Certified Programs",
      description: "Earn recognized certifications that boost your career prospects.",
    },
    {
      icon: Zap,
      title: "Hands-On Projects",
      description: "Build real-world projects that showcase your skills to employers.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <main className="flex-1">
        <Hero />

        {/* Features Section */}
        <section className="border-t border-border bg-accent/30 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                Why Choose Shell Entertainment?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We provide everything you need to succeed in your learning journey
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-border bg-card p-6 smooth-transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 smooth-transition group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      <FeaturedCourses/>

        {/* CTA Section */}
        <section className="border-y border-border bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Join thousands of learners who have transformed their careers with Shell Entertainment
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="smooth-transition hover:scale-105">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
