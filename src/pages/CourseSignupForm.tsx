import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CourseSignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Course signup:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Enroll in a Course
            </h1>
            <p className="text-xl text-muted-foreground">
              Start your learning journey today
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Select Course</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, course: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-dev">Web Development Bootcamp</SelectItem>
                    <SelectItem value="ui-ux">UI/UX Design Mastery</SelectItem>
                    <SelectItem value="marketing">Digital Marketing Pro</SelectItem>
                    <SelectItem value="data-science">Data Science Fundamentals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Enroll Now
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseSignupForm;