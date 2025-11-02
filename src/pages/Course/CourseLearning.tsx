import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from "lucide-react";

const CourseLearning = () => {
  const { id } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);

  const lessons = [
    { title: "Introduction to Web Development", duration: "10:30", completed: true },
    { title: "HTML Fundamentals", duration: "15:45", completed: true },
    { title: "CSS Basics", duration: "20:15", completed: false },
    { title: "JavaScript Essentials", duration: "25:00", completed: false },
    { title: "Building Your First Website", duration: "30:00", completed: false },
  ];

  const progress = (lessons.filter(l => l.completed).length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-4 h-screen">
        {/* Video Player */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl text-muted-foreground">Video Player</p>
              <p className="text-sm text-muted-foreground mt-2">{lessons[currentLesson].title}</p>
            </div>
          </div>
          
          <div className="p-6 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{lessons[currentLesson].title}</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                  disabled={currentLesson === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
                  disabled={currentLesson === lessons.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              Lesson content and description goes here...
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 border-l bg-card p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Course Progress</span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <h3 className="font-bold mb-4">Course Content</h3>
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer hover-lift smooth-transition ${
                  currentLesson === index ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setCurrentLesson(index)}
              >
                <div className="flex items-start gap-3">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1 truncate">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;