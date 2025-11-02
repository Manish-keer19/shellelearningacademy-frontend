import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make quality education accessible to everyone, everywhere, at any time.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a global community of learners who support and inspire each other.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality educational content and experiences.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously evolving our platform with the latest learning technologies.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Students Worldwide" },
    { value: "1000+", label: "Expert Instructors" },
    { value: "500+", label: "Courses Available" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/20 to-background py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                About <span className="text-gradient">Shell Entertainment</span>
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                We're on a mission to transform education and make learning accessible, 
                engaging, and effective for everyone around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 font-display text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Shell Entertainment was founded with a simple yet powerful belief: "Learning Made Easy". 
                  We recognized that traditional education wasn't meeting the needs of modern learners who 
                  demand flexibility, quality, and practical skills.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 students worldwide, offering cutting-edge courses 
                  taught by industry experts. Our platform combines the best of technology and pedagogy to 
                  deliver an unparalleled learning experience.
                </p>
                <p>
                  From web development to digital marketing, from design to data science, we offer courses 
                  that help you build real-world skills and advance your career.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-y border-border bg-accent/30 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                These principles guide everything we do
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-6 text-center hover-lift"
                >
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 font-display text-4xl font-bold text-primary sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
              Join Our Community
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Be part of a global learning community that's shaping the future
            </p>
            <Button size="lg" className="smooth-transition hover:scale-105">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
