import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Users, Award, Star } from "lucide-react";
import { courseService } from "@/service/course.service";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!courseId) return;
      try {
        const res = await courseService.getCourseDetails(courseId);
        const data = Array.isArray(res?.data) ? res.data[0] : res?.data?.[0] || res?.data; // controller returns array
        setCourse(data || null);
      } catch (error: any) {
        toast({ title: "Failed to load course", description: error?.response?.data?.message || "", variant: "destructive" });
      }
    };
    fetchDetails();
  }, [courseId, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{course?.category?.name || "Course"}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                {course?.courseName || "Course"}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {course?.courseDescription || ""}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold">{Array.isArray(course?.ratingAndReviews) ? (Math.round((course.ratingAndReviews.reduce((a: number, r: any) => a + (r?.rating || 0), 0) / (course.ratingAndReviews.length || 1)) * 10) / 10) : 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{course?.studentsEnrolled?.length || course?.studentsEnroled?.length || 0} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>—</span>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <Card className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group cursor-pointer hover-lift smooth-transition">
              <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 smooth-transition">
                <Play className="w-10 h-10 text-primary" />
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-2xl font-bold mb-4">What you'll learn</h3>
                  <ul className="space-y-3">
                    {(course?.instructions || []).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    {(course?.courseContent || []).map((section: any) => (
                      <div key={section._id}>
                        <h4 className="font-semibold mb-2">{section.sectionName}</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          {(section?.subSection || []).map((ss: any) => (
                            <li key={ss._id}>{ss.title}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    {(course?.ratingAndReviews || []).map((r: any) => (
                      <div key={r._id} className="text-sm">
                        <div className="font-semibold">{r?.user?.firstName} {r?.user?.lastName}</div>
                        <div className="text-muted-foreground">Rating: {r?.rating}</div>
                        <div>{r?.review}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="text-4xl font-bold mb-6">$99</div>
              <Button className="w-full mb-4" size="lg">
                Enroll Now
              </Button>
              <Button variant="outline" className="w-full mb-6">
                Add to Cart
              </Button>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">48 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-semibold">All Levels</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Certificate</span>
                  <Award className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;