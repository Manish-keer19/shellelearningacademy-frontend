import { CourseCard } from "@/components/CourseCard";
import { courseService } from "@/service/course.service";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedCourses = () => {




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
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  // const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const fetchCourses = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await courseService.getAllCourses();
  //     const coursesData = res.data || [];

  //     // Sort by newest (createdAt)
  //     const sortedCourses = coursesData
  //       .sort((a: any, b: any) => 
  //         new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  //       )
  //       .slice(0, 6); // Only 6 featured

  //     setCourses(sortedCourses);
  //   } catch (error: any) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to load featured courses. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  // Loading State
  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground">Loading courses...</p>
        </div>
      </section>
    );
  }

  // Empty State (optional)
  if (!courses.length && !isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground">No courses available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Featured Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start learning with our most popular and newest courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => (
            <CourseCard key={course._id} {...course} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/all-courses">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 transition-all duration-300"
            >
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;