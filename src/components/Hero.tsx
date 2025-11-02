import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/20" />
      
      {/* Geometric Shape - inspired by Unlox */}
      <div className="absolute right-0 top-1/4 h-[600px] w-[600px] opacity-10">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rotate-45 rounded-full bg-primary blur-3xl" />
          <div className="absolute right-20 top-20 h-64 w-64 rounded-full bg-primary/50 blur-2xl" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="text-sm font-medium">Learning Reimagined For The Future</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Learn The Future {" "}
            <span className="text-gradient">TODAY</span>
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Shell Entertainment was created with one simple yet powerful core belief, "Learning Made Easy". 
            Dive into our dynamic programs, connect with awesome mentors, and experience education like never before.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="group smooth-transition hover:scale-105">
              Explore Programs
              <ArrowRight className="ml-2 h-5 w-5 smooth-transition group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group smooth-transition">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="text-center sm:text-left">
              <div className="mb-1 font-display text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="mb-1 font-display text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Expert Mentors</div>
            </div>
            <div className="col-span-2 text-center sm:col-span-1 sm:text-left">
              <div className="mb-1 font-display text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
