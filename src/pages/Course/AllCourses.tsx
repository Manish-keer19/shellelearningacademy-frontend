import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const AllCourses = () => {
  const courses = [
    {
      title: "Complete Web Development Bootcamp",
      description: "Master modern web development from scratch to advanced level",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      students: 15420,
      duration: "48 hours",
      level: "Beginner",
      category: "Development",
      image: "/placeholder.svg",
    },
    {
      title: "UI/UX Design Mastery",
      description: "Learn to create beautiful and intuitive user interfaces",
      instructor: "Mike Chen",
      rating: 4.9,
      students: 12300,
      duration: "36 hours",
      level: "Intermediate",
      category: "Design",
      image: "/placeholder.svg",
    },
    {
      title: "Digital Marketing Pro",
      description: "Grow your business with strategic digital marketing",
      instructor: "Emily Rodriguez",
      rating: 4.7,
      students: 18500,
      duration: "24 hours",
      level: "Beginner",
      category: "Marketing",
      image: "/placeholder.svg",
    },
    {
      title: "Data Science Fundamentals",
      description: "Analyze data and build machine learning models",
      instructor: "Prof. David Kim",
      rating: 4.9,
      students: 14200,
      duration: "60 hours",
      level: "Advanced",
      category: "Data Science",
      image: "/placeholder.svg",
    },
    {
      title: "Mobile App Development",
      description: "Build native iOS and Android applications",
      instructor: "Lisa Anderson",
      rating: 4.6,
      students: 10800,
      duration: "42 hours",
      level: "Intermediate",
      category: "Development",
      image: "/placeholder.svg",
    },
    {
      title: "Cloud Computing Essentials",
      description: "Deploy and manage applications in the cloud",
      instructor: "James Wilson",
      rating: 4.8,
      students: 13400,
      duration: "32 hours",
      level: "Intermediate",
      category: "Cloud",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            All Courses
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our complete course catalog
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button>Apply Filters</Button>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllCourses;