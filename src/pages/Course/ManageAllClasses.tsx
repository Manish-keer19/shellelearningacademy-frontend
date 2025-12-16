import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Calendar, Link as LinkIcon, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { courseClassService } from '@/service/courseClass.service';
import { courseService } from '@/service/course.service';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface Course {
    _id: string;
    courseName: string;
    courseDescription?: string;
    thumbnail?: string;
}

interface CourseClass {
    _id: string;
    className: string;
    classDescription: string;
    classUrl: string;
    classDate: string;
}

const ManageAllClasses: React.FC = () => {
    const { toast } = useToast();
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
    const [classes, setClasses] = useState<{ [courseId: string]: CourseClass[] }>({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentClassId, setCurrentClassId] = useState<string | null>(null);
    const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        className: '',
        classDescription: '',
        classUrl: '',
        classDate: '',
    });

    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            // Use the new lightweight endpoint that only returns ID, name, thumbnail, and description
            const response = await courseService.getCoursesBasicInfo();
            if (response.success) {
                setCourses(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch courses", error);
            toast({
                title: "Error",
                description: "Failed to load courses",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClassesForCourse = async (courseId: string) => {
        try {
            const res = await courseClassService.getClassesByCourse(courseId, accessToken!);
            setClasses(prev => ({ ...prev, [courseId]: res.data }));
        } catch (error) {
            console.error("Failed to fetch classes", error);
            toast({
                title: "Error",
                description: "Failed to load classes",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleToggleCourse = (courseId: string) => {
        if (expandedCourseId === courseId) {
            setExpandedCourseId(null);
        } else {
            setExpandedCourseId(courseId);
            if (!classes[courseId]) {
                fetchClassesForCourse(courseId);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            className: '',
            classDescription: '',
            classUrl: '',
            classDate: '',
        });
        setIsEditing(false);
        setCurrentClassId(null);
        setCurrentCourseId(null);
    };

    const handleOpenDialog = (courseId: string) => {
        resetForm();
        setCurrentCourseId(courseId);
        setIsDialogOpen(true);
    };

    const handleEditClass = (courseId: string, cls: CourseClass) => {
        // Convert UTC date to local datetime-local format
        let localDateTimeString = '';
        if (cls.classDate) {
            const date = new Date(cls.classDate);
            const offset = date.getTimezoneOffset();
            const localDate = new Date(date.getTime() - (offset * 60 * 1000));
            localDateTimeString = localDate.toISOString().slice(0, 16);
        }

        setFormData({
            className: cls.className,
            classDescription: cls.classDescription,
            classUrl: cls.classUrl,
            classDate: localDateTimeString,
        });
        setCurrentClassId(cls._id);
        setCurrentCourseId(courseId);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.className || !formData.classDate || !formData.classUrl) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsLoading(true);

            // Convert local datetime to UTC ISO string for backend
            const localDate = new Date(formData.classDate);
            const utcDateString = localDate.toISOString();

            const dataToSend = {
                ...formData,
                classDate: utcDateString,
            };

            if (isEditing && currentClassId) {
                await courseClassService.updateClass({
                    classId: currentClassId,
                    ...dataToSend,
                }, accessToken!);
                toast({ title: "Class Updated Successfully" });
            } else {
                await courseClassService.createClass({
                    courseId: currentCourseId!,
                    ...dataToSend,
                }, accessToken!);
                toast({ title: "Class Created Successfully" });
            }
            setIsDialogOpen(false);
            if (currentCourseId) {
                fetchClassesForCourse(currentCourseId);
            }
            resetForm();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to save class",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClass = async (courseId: string, classId: string) => {
        if (!window.confirm("Are you sure you want to delete this class?")) return;

        try {
            setIsLoading(true);
            await courseClassService.deleteClass({ classId, courseId }, accessToken!);
            toast({ title: "Class Deleted Successfully" });
            fetchClassesForCourse(courseId);
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to delete class",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-8 mt-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Manage Classes</h1>
                    <p className="text-muted-foreground">
                        View all courses and manage their classes in one place
                    </p>
                </div>

                {isLoading && courses.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Loading courses...</p>
                    </div>
                ) : courses.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground">No courses found</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <Card key={course._id} className="overflow-hidden">
                                <div
                                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-accent/50 transition-colors"
                                    onClick={() => handleToggleCourse(course._id)}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            {course.thumbnail && (
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.courseName}
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                            )}
                                            <div>
                                                <h3 className="text-lg font-semibold">{course.courseName}</h3>
                                                <p className="text-sm text-muted-foreground">ID: {course._id}</p>
                                                {course.courseDescription && (
                                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                        {course.courseDescription}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenDialog(course._id);
                                            }}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Class
                                        </Button>
                                        {expandedCourseId === course._id ? (
                                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>

                                {expandedCourseId === course._id && (
                                    <div className="border-t bg-muted/30 p-6">
                                        {!classes[course._id] ? (
                                            <div className="text-center py-8">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                                <p className="mt-2 text-sm text-muted-foreground">Loading classes...</p>
                                            </div>
                                        ) : classes[course._id].length === 0 ? (
                                            <div className="text-center py-8 text-muted-foreground">
                                                <p>No classes scheduled for this course.</p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-4"
                                                    onClick={() => handleOpenDialog(course._id)}
                                                >
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Add First Class
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Class Name</TableHead>
                                                            <TableHead>Date & Time</TableHead>
                                                            <TableHead>Link</TableHead>
                                                            <TableHead className="text-right">Actions</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {classes[course._id].map((cls) => (
                                                            <TableRow key={cls._id}>
                                                                <TableCell className="font-medium">
                                                                    <div>{cls.className}</div>
                                                                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                                        {cls.classDescription}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div className="flex items-center">
                                                                        <Calendar className="w-3 h-3 mr-2 text-muted-foreground" />
                                                                        {cls.classDate ? format(new Date(cls.classDate), "PP p") : "Invalid Date"}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <a
                                                                        href={cls.classUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center text-primary hover:underline"
                                                                    >
                                                                        Join <ExternalLink className="w-3 h-3 ml-1" />
                                                                    </a>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleEditClass(course._id, cls)}
                                                                    >
                                                                        <Edit className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="text-destructive hover:text-destructive"
                                                                        onClick={() => handleDeleteClass(course._id, cls._id)}
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                )}

                {/* Dialog for Add/Edit Class */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Class" : "Schedule New Class"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="className">Class Name *</Label>
                                <Input
                                    id="className"
                                    name="className"
                                    value={formData.className}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Introduction to React"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="classDate">Date & Time *</Label>
                                <Input
                                    id="classDate"
                                    name="classDate"
                                    type="datetime-local"
                                    value={formData.classDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="classUrl">Meeting URL *</Label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                        <LinkIcon className="h-4 w-4" />
                                    </span>
                                    <Input
                                        id="classUrl"
                                        name="classUrl"
                                        value={formData.classUrl}
                                        onChange={handleInputChange}
                                        placeholder="https://zoom.us/..."
                                        className="rounded-l-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="classDescription">Description</Label>
                                <Textarea
                                    id="classDescription"
                                    name="classDescription"
                                    value={formData.classDescription}
                                    onChange={handleInputChange}
                                    placeholder="Brief agenda..."
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Saving..." : (isEditing ? "Update Class" : "Schedule Class")}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Footer />
        </div>
    );
};

export default ManageAllClasses;
