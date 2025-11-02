import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Clock, Users, Star, Award, BookOpen } from "lucide-react";

const ViewCourse = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Course Hero */}
          <Card className="p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group cursor-pointer hover-lift smooth-transition">
                <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 smooth-transition">
                  <Play className="w-10 h-10 text-primary" />
                </div>
              </div>

              <div>
                <Badge className="mb-4">Web Development</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  Complete Web Development Bootcamp
                </h1>
                <p className="text-muted-foreground mb-6">
                  Master modern web development from scratch to advanced level
                </p>

                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground">(2,450)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>15,420 students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>48 hours</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link to={`/course-learning/${id}`} className="flex-1">
                    <Button size="lg" className="w-full">
                      Start Learning
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Course Details */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Build responsive websites",
                    "Master React and Node.js",
                    "Create RESTful APIs",
                    "Work with databases",
                    "Deploy to production",
                    "Best practices & patterns",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Instructor</h2>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-lg">Dr. Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Senior Web Developer & Educator</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4">Course Includes</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>48 hours on-demand video</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>15 articles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="text-3xl font-bold mb-4">$99</div>
                <Button className="w-full mb-3">Enroll Now</Button>
                <Button variant="outline" className="w-full">Add to Cart</Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewCourse;