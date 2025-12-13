import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Clock,
    Play,
    Loader2,
    Calendar,
    ChevronDown,
    CheckCircle,
    BookOpen,
    Video,
    ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";
import { courseService } from "@/service/course.service";
import { useAppSelector } from "@/hooks/redux"; // Assuming this hook exists

const EnrolledCourseView = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useAppSelector((state: any) => state.auth);

    const [course, setCourse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
    const [completedLectures, setCompletedLectures] = useState<Set<string>>(new Set());
    const [completedClasses, setCompletedClasses] = useState<Set<string>>(new Set());
    const [stats, setStats] = useState({
        totalLectures: 0,
        completedLectures: 0,
        totalClasses: 0,
        completedClasses: 0,
        progress: 0
    });

    const fetchCourseDetails = useCallback(async () => {
        if (!courseId) return;
        setIsLoading(true);
        try {
            // Using getFullCourseDetails which should now return including upcomingClasses
            const response = await courseService.getFullCourseDetails(courseId, accessToken);
            // Handling potential difference in API structure depending on how it was implemented
            // Assuming response.data.courseDetails or response.data[0] based on previous files
            const courseData = response.data.courseDetails || (Array.isArray(response.data) ? response.data[0] : response.data);

            if (!courseData) {
                throw new Error("No course data found");
            }

            setCourse(courseData);

            const completedVids = response.data.completedVideos || [];
            const completedCls = response.data.completedClasses || [];
            setCompletedLectures(new Set(completedVids));
            setCompletedClasses(new Set(completedCls));

            // Calculate progress based on fetched data initially
            const totalLectures = courseData.courseContent?.reduce((acc: number, sec: any) => acc + (sec.subSection?.length || 0), 0) || 0;
            const totalClasses = courseData.upcomingClasses?.length || 0;
            const totalItems = totalLectures + totalClasses;
            const completedItems = completedVids.length + completedCls.length;

            setStats({
                totalLectures,
                completedLectures: completedVids.length,
                totalClasses,
                completedClasses: completedCls.length,
                progress: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
            });

        } catch (error) {
            console.error("Error fetching course:", error);
            toast.error("Failed to load course details");
        } finally {
            setIsLoading(false);
        }
    }, [courseId, accessToken]);

    useEffect(() => {
        fetchCourseDetails();
    }, [fetchCourseDetails]);

    const toggleSection = (index: number) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            newSet.has(index) ? newSet.delete(index) : newSet.add(index);
            return newSet;
        });
    };

    const handleLectureCompletion = async (subSectionId: string) => {
        if (!accessToken) return;

        // Optimistic update prevention/handling could be added, but for now we just check if it's already done
        if (completedLectures.has(subSectionId)) {
            // Optional: Handle un-marking if backend supports it (currently backend only supports marking as complete)
            // For now, we only allow marking as complete
            return;
        }

        try {
            const res = await courseService.markLectureComplete(courseId!, subSectionId, accessToken);
            if (res?.success) {
                setCompletedLectures(prev => {
                    const newSet = new Set(prev);
                    newSet.add(subSectionId);
                    return newSet;
                });

                // Re-calculate progress
                setStats(prev => {
                    const newCompletedCount = prev.completedLectures + 1;
                    return {
                        ...prev,
                        completedLectures: newCompletedCount,
                        progress: prev.totalLectures > 0 ? Math.round((newCompletedCount / prev.totalLectures) * 100) : 0
                    };
                });
                toast.success("Lecture marked as completed");
            }
        } catch (error) {
            console.error("Error marking lecture complete:", error);
            toast.error("Failed to mark lecture as complete");
        }
    };

    const handleClassCompletion = async (classId: string) => {
        if (!accessToken) return;

        if (completedClasses.has(classId)) {
            return; // Already completed
        }

        try {
            const res = await courseService.markClassComplete(courseId!, classId, accessToken);
            if (res?.success) {
                setCompletedClasses(prev => {
                    const newSet = new Set(prev);
                    newSet.add(classId);
                    return newSet;
                });

                // Re-calculate progress
                setStats(prev => {
                    const newCompletedClasses = prev.completedClasses + 1;
                    const totalItems = prev.totalLectures + prev.totalClasses;
                    const completedItems = prev.completedLectures + newCompletedClasses;
                    return {
                        ...prev,
                        completedClasses: newCompletedClasses,
                        progress: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
                    };
                });
                toast.success("Class marked as completed");
            }
        } catch (error) {
            console.error("Error marking class complete:", error);
            toast.error("Failed to mark class as complete");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
                    <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 max-w-6xl">

                {/* Hero / Header Section */}
                <div className="mb-8">
                    <p className="text-sm text-primary font-medium mb-2 uppercase tracking-wider">Enrolled Course</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{course.courseName}</h1>
                    <p className="text-muted-foreground text-lg mb-6 max-w-3xl">{course.courseDescription}</p>

                    {/* Progress Bar */}
                    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-4 max-w-md">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Course Progress</span>
                            <span className="text-sm font-bold text-primary">{stats.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
                                style={{ width: `${stats.progress}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            {/* <span>{stats.completedLectures}/{stats.totalLectures} Lectures</span> */}
                            {/* <span>•</span> */}
                            <span>{stats.completedClasses}/{stats.totalClasses} Classes</span>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Upcoming Classes Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-primary" />
                                    Upcoming Live Classes
                                </h2>
                                {/* Optional: Link to see all past classes if implemented */}
                            </div>

                            {course.upcomingClasses && course.upcomingClasses.length > 0 ? (
                                <div className="space-y-4">
                                    {course.upcomingClasses
                                        .filter((cls: any) => new Date(cls.classDate) > new Date())
                                        .map((cls: any) => {
                                            const isCompleted = completedClasses.has(cls._id);
                                            return (
                                                <Card key={cls._id} className={`border-border/60 hover:border-primary/50 transition-colors ${isCompleted ? 'bg-green-500/5 border-green-500/30' : 'bg-card/50 backdrop-blur-sm'}`}>
                                                    <CardContent className="p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                                        <div className="space-y-1 flex-1">
                                                            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1">
                                                                {isCompleted ? (
                                                                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0">✓ Completed</Badge>
                                                                ) : (
                                                                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">Live Session</Badge>
                                                                )}
                                                                <span>{new Date(cls.classDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                                <span>•</span>
                                                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {new Date(cls.classDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                                            </div>
                                                            <h3 className="text-xl font-bold">{cls.className}</h3>
                                                            <p className="text-muted-foreground text-sm">{cls.classDescription}</p>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
                                                            {new Date(cls.classDate) > new Date() && (
                                                                <Button className="w-full sm:w-auto" asChild>
                                                                    <a href={cls.classUrl} target="_blank" rel="noopener noreferrer">
                                                                        Start Class <ArrowRight className="w-4 h-4 ml-2" />
                                                                    </a>
                                                                </Button>
                                                            )}
                                                            {!isCompleted && (
                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full sm:w-auto border-green-500/30 hover:bg-green-500/10"
                                                                    onClick={() => handleClassCompletion(cls._id)}
                                                                >
                                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                                    Mark as Done
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                </div>
                            ) : (
                                <Card className="bg-muted/30 border-dashed border-2">
                                    <CardContent className="p-8 text-center text-muted-foreground">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No upcoming live classes scheduled at the moment.</p>
                                        <p className="text-sm">Check back later for updates!</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Previous Classes Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-muted-foreground" />
                                    Previous Classes
                                </h2>
                            </div>

                            {course.upcomingClasses && course.upcomingClasses.filter((cls: any) => new Date(cls.classDate) <= new Date()).length > 0 ? (
                                <div className="space-y-4">
                                    {course.upcomingClasses
                                        .filter((cls: any) => new Date(cls.classDate) <= new Date())
                                        .sort((a: any, b: any) => new Date(b.classDate).getTime() - new Date(a.classDate).getTime())
                                        .map((cls: any) => {
                                            const isCompleted = completedClasses.has(cls._id);
                                            return (
                                                <Card key={cls._id} className={`border-border/60 ${isCompleted ? 'bg-green-500/5 border-green-500/30' : 'bg-muted/30'} opacity-80`}>
                                                    <CardContent className="p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                                        <div className="space-y-1 flex-1">
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-1">
                                                                {isCompleted ? (
                                                                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0">✓ Attended</Badge>
                                                                ) : (
                                                                    <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">Past Class</Badge>
                                                                )}
                                                                <span>{new Date(cls.classDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                                <span>•</span>
                                                                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {new Date(cls.classDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                                            </div>
                                                            <h3 className="text-xl font-bold text-foreground">{cls.className}</h3>
                                                            <p className="text-muted-foreground text-sm">{cls.classDescription}</p>
                                                        </div>
                                                        {!isCompleted && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="shrink-0 border-green-500/30 hover:bg-green-500/10"
                                                                onClick={() => handleClassCompletion(cls._id)}
                                                            >
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                Mark as Done
                                                            </Button>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                </div>
                            ) : (
                                <Card className="bg-muted/30 border-dashed border-2">
                                    <CardContent className="p-8 text-center text-muted-foreground">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No previous classes yet.</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        <Separator />

                        {/* Course Content Outline */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-primary" />
                                Course Curriculum
                            </h2>
                            <div className="border border-border/60 rounded-xl overflow-hidden bg-card">
                                {course.courseContent?.map((section: any, idx: number) => {
                                    const isOpen = expandedSections.has(idx);
                                    return (
                                        <div key={section._id} className="border-b border-border/60 last:border-0">
                                            <button
                                                onClick={() => toggleSection(idx)}
                                                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-1.5 rounded-full ${isOpen ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-foreground">{section.sectionName}</h3>
                                                        <p className="text-xs text-muted-foreground mt-0.5">{section.subSection?.length || 0} Lessons</p>
                                                    </div>
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="bg-muted/10 divide-y divide-border/30">
                                                    {section.subSection?.map((lesson: any) => {
                                                        const isCompleted = completedLectures.has(lesson._id);
                                                        return (
                                                            <div key={lesson._id} className="p-3 pl-14 flex items-center gap-3 hover:bg-muted/20 transition-colors group cursor-pointer"
                                                                onClick={(e) => {
                                                                    // Prevent triggering if clicking something else if needed, but row click is fine
                                                                    e.stopPropagation();
                                                                    handleLectureCompletion(lesson._id);
                                                                }}>
                                                                <CheckCircle
                                                                    className={`w-5 h-5 transition-all ${isCompleted ? 'text-green-500 fill-green-500/10' : 'text-muted-foreground hover:text-primary'}`}
                                                                />
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                                                                    {lesson.timeDuration && (
                                                                        <p className="text-xs text-muted-foreground">{lesson.timeDuration} min</p>
                                                                    )}
                                                                </div>
                                                                {/* Could show completion status here if available in lesson data */}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30 shadow-lg">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                    Course Instructor
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                                    <p className="text-xl font-bold text-foreground mb-1">
                                        {course.instructor?.firstName} {course.instructor?.lastName}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                                        Industry Expert
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                                        10+ Years of Experience
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Support Section */}
                        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 shadow-md">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="text-primary">💬</span>
                                    Need Support?
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Have questions about the content or schedule? Reach out to our support team:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                                        <p className="text-xs text-muted-foreground mb-1">Email</p>
                                        <a href="mailto:support@shellelearningacademy.com" className="text-sm font-medium text-primary hover:underline break-all">
                                            support@shellelearningacademy.com
                                        </a>
                                    </div>
                                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                                        <p className="text-xs text-muted-foreground mb-1">WhatsApp / Call</p>
                                        <a href="tel:+919406688303" className="text-sm font-medium text-primary hover:underline">
                                            +91 94066 88303
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EnrolledCourseView;
