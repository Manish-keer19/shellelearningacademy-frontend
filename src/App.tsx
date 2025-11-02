import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthLoader from "@/components/AuthLoader";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Certificate from "./pages/Certificate";
import Course from "./pages/Course";
import CourseSignupForm from "./pages/CourseSignupForm";
import AllCourses from "./pages/Course/AllCourses";
import CoursesList from "./pages/Course/CoursesList";
import CourseDetail from "./pages/Course/CourseDetail";
import ViewCourse from "./pages/Course/ViewCourse";
import CourseLearning from "./pages/Course/CourseLearning";
import CreateCourse from "./pages/Course/CreateCourse";
import CreateCategory from "./pages/Course/CreateCatagory";
import EditCourse from "./pages/Course/EditCourse";
import ManageCourses from "./pages/Course/ManageCourses";
import Navigation from "./pages/Navigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthLoader>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/navigation" element={<Navigation />} />
            {/* <Route path="/courses" element={<Courses />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sign-up" element={<CourseSignupForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/certificate/:courseId" element={<Certificate />} />
            
            {/* Course Routes */}
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/courses-list" element={<CoursesList />} />
            <Route path="/course/:id" element={<ViewCourse />} />
            <Route path="/course-detail/:courseId" element={<CourseDetail />} />
            <Route path="/course-learning/:id" element={<CourseLearning />} />
            
            {/* Course Management Routes */}
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/edit-course/:courseId" element={<EditCourse />} />
            <Route path="/manage-courses" element={<ManageCourses />} />
            <Route path="/add-category" element={<CreateCategory />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            </AuthLoader>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
