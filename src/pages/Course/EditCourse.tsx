import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditCourse = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({
    title: "Web Development Bootcamp",
    description: "Master modern web development",
    category: "development",
    level: "beginner",
    duration: "48",
    price: "99",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update course:", courseData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gradient">
            Edit Course
          </h1>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={courseData.category} onValueChange={(value) => setCourseData({ ...courseData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={courseData.level} onValueChange={(value) => setCourseData({ ...courseData, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={courseData.duration}
                    onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={courseData.price}
                    onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">Update Course</Button>
                <Button type="button" variant="outline" className="flex-1">Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditCourse;