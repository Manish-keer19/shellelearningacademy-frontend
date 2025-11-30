import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Navigation as NavComponent } from "@/components/Navbar";

const Navigation = () => {
  const navigate = useNavigate();

  const routeCategories = [
    {
      title: "Main Pages",
      routes: [
        { path: "/", label: "Home" },
        { path: "/courses", label: "Courses" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
        { path: "/services", label: "Services" },
      ]
    },
    {
      title: "Authentication",
      routes: [
        { path: "/auth", label: "Auth" },
        { path: "/sign-up", label: "Sign Up" },
      ]
    },
    {
      title: "User Dashboard",
      routes: [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/profile", label: "Profile" },
      ]
    },
    {
      title: "Course Management",
      routes: [
        { path: "/all-courses", label: "All Courses" },
        { path: "/courses-list", label: "Courses List" },
        { path: "/create-course", label: "Create Course" },
        { path: "/manage-courses", label: "Manage Courses" },
      ]
    },
    {
      title: "Careers",
      routes: [
        { path: "/careers", label: "Careers" },
        { path: "/create-job", label: "Create Job" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavComponent />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Site Navigation
          </h1>
          <p className="text-muted-foreground text-lg">
            Quick access to all pages in the application
          </p>
        </div>

        <div className="space-y-12">
          {routeCategories.map((category) => (
            <div key={category.title} className="">
              <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.routes.map((route) => (
                  <Button
                    key={route.path}
                    onClick={() => navigate(route.path)}
                    variant="outline"
                    className="h-14 text-base font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    {route.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;