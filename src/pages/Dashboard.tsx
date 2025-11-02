import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { icon: <BookOpen className="w-6 h-6" />, label: "Enrolled Courses", value: "5", color: "text-blue-500" },
    { icon: <Award className="w-6 h-6" />, label: "Certificates", value: "2", color: "text-green-500" },
    { icon: <Clock className="w-6 h-6" />, label: "Hours Learned", value: "24", color: "text-orange-500" },
    { icon: <TrendingUp className="w-6 h-6" />, label: "Avg. Progress", value: "68%", color: "text-purple-500" },
  ];

  const enrolledCourses = [
    { title: "Web Development Bootcamp", progress: 75, instructor: "John Doe", image: "/placeholder.svg" },
    { title: "UI/UX Design Mastery", progress: 45, instructor: "Jane Smith", image: "/placeholder.svg" },
    { title: "Digital Marketing Pro", progress: 90, instructor: "Mike Johnson", image: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Welcome Back!
          </h1>
          <p className="text-xl text-muted-foreground">
            Continue your learning journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover-lift smooth-transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Continue Learning</h2>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover-lift smooth-transition group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 smooth-transition"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Button className="w-full mt-4">Continue</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;