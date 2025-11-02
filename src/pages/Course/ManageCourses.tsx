import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ManageCourses = () => {
  const courses = [
    { id: 1, title: "Web Development Bootcamp", status: "Published", students: 245, revenue: "$24,500" },
    { id: 2, title: "UI/UX Design Mastery", status: "Published", students: 189, revenue: "$18,900" },
    { id: 3, title: "Digital Marketing Pro", status: "Draft", students: 0, revenue: "$0" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            Manage Courses
          </h1>
          <Link to="/create-course">
            <Button className="gap-2">
              <Plus className="w-5 h-5" />
              Create Course
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{course.title}</h3>
                    <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>{course.students} students</span>
                    <span>Revenue: {course.revenue}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Link to={`/edit-course/${course.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageCourses;