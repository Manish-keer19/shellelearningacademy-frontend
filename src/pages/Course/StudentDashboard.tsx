import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Play, 
  CheckCircle, 
  TrendingUp,
  Award,
  Loader2,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { studentService } from '@/service/student.service';
import { courseService } from '@/service/course.service';
import { useAppSelector } from '@/hooks/redux';
import CourseSearch from './CourseSearch';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token, user } = useAppSelector((state) => state.auth);
  
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEnrolled: 0,
    completedCourses: 0,
    totalProgress: 0,
    certificatesEarned: 0
  });

  const fetchEnrolledCourses = async () => {
    if (!token) return;
    
    try {
      // Fetch all courses for recommendations
      const coursesRes = await courseService.getAllCourses();
      const allCoursesData = coursesRes.data || [];
      setAllCourses(allCoursesData);
      
      // Fetch user's enrolled courses
      let userEnrolledCourses = [];
      
      // First try to get from backend
      try {
        const enrolledRes = await studentService.getEnrolledCourses(token);
        const enrolledData = enrolledRes.data;
        
        if (enrolledData && enrolledData.courses) {
          // Fetch progress for each course
          const coursesWithProgress = await Promise.all(
            enrolledData.courses.map(async (course) => {
              try {
                const progressRes = await courseService.getFullCourseDetails(course._id, token);
                const completedVideos = progressRes.data?.completedVideos || [];
                const totalLectures = course.courseContent?.reduce((total, section) => 
                  total + (section.subSection?.length || 0), 0) || 0;
                const progress = totalLectures > 0 ? (completedVideos.length / totalLectures) * 100 : 0;
                
                return {
                  ...course,
                  progress: Math.round(progress),
                  completedLectures: completedVideos.length,
                  totalLectures,
                  lastAccessed: new Date().toISOString()
                };
              } catch (error) {
                return {
                  ...course,
                  progress: 0,
                  completedLectures: 0,
                  totalLectures: course.courseContent?.reduce((total, section) => 
                    total + (section.subSection?.length || 0), 0) || 0,
                  lastAccessed: new Date().toISOString()
                };
              }
            })
          );
          userEnrolledCourses = coursesWithProgress;
        }
      } catch (enrolledError) {
        console.error('Error fetching enrolled courses:', enrolledError);
        // If backend fails, use user object with real progress
        if (user?.courses && user.courses.length > 0) {
          const coursesWithProgressData = await Promise.all(
            user.courses.map(async (course) => {
              try {
                const progressRes = await courseService.getFullCourseDetails(course._id, token);
                const completedVideos = progressRes.data?.completedVideos || [];
                const totalLectures = course.courseContent?.reduce((total, section) => 
                  total + (section.subSection?.length || 0), 0) || 0;
                const progress = totalLectures > 0 ? (completedVideos.length / totalLectures) * 100 : 0;
                
                return {
                  ...course,
                  progress: Math.round(progress),
                  completedLectures: completedVideos.length,
                  totalLectures,
                  lastAccessed: new Date().toISOString()
                };
              } catch (error) {
                return {
                  ...course,
                  progress: 0,
                  completedLectures: 0,
                  totalLectures: 0,
                  lastAccessed: new Date().toISOString()
                };
              }
            })
          );
          userEnrolledCourses = coursesWithProgressData;
        }
      }
      
      // Filter out any null or undefined courses
      userEnrolledCourses = userEnrolledCourses.filter(course => course && course._id);
      
      setEnrolledCourses(userEnrolledCourses);
      
      // Calculate stats
      const totalEnrolled = userEnrolledCourses.length;
      const completedCourses = userEnrolledCourses.filter(c => c.progress === 100).length;
      const totalProgress = totalEnrolled > 0 ? userEnrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / totalEnrolled : 0;
      
      setStats({
        totalEnrolled,
        completedCourses,
        totalProgress: Math.round(totalProgress),
        certificatesEarned: completedCourses
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch enrolled courses",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, [token]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.firstName || 'Student'}!
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey and track your progress
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Discover New Courses</h2>
        </div>
        <CourseSearch placeholder="Search for new courses to enroll..." />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card/80 backdrop-blur-lg border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalEnrolled}</p>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/80 backdrop-blur-lg border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.completedCourses}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/80 backdrop-blur-lg border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalProgress}%</p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/80 backdrop-blur-lg border-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{stats.certificatesEarned}</p>
                <p className="text-sm text-muted-foreground">Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">My Courses</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate('/courses')}
          >
            Browse All Courses
          </Button>
        </div>

        {enrolledCourses.length === 0 ? (
          <Card className="bg-card/80 backdrop-blur-lg border-border">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No enrolled courses yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Button 
                onClick={() => navigate('/courses')}
                className="bg-gradient-to-r from-primary to-accent"
              >
                Explore Courses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course: any) => (
              <Card key={course._id} className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-all duration-200">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.thumbnail || '/placeholder.svg'} 
                    alt={course.courseName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={course.progress === 100 ? 'default' : 'secondary'}>
                      {course.progress === 100 ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {course.courseName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.courseDescription}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>{course.completedLectures}/{course.totalLectures} lectures</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Last accessed today</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/course-learning/${course._id}`)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {course.progress === 0 ? 'Start Course' : 'Continue Learning'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Courses */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allCourses.slice(0, 4).map((course: any) => (
            <Card key={course._id} className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => navigate(`/course-detail/${course._id}`)}>
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={course.thumbnail || '/placeholder.svg'} 
                  alt={course.courseName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">
                  {course.courseName}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  by {course.instructor?.firstName} {course.instructor?.lastName}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {course.category?.name}
                  </Badge>
                  <span className="font-bold text-primary">
                    ₹{course.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;