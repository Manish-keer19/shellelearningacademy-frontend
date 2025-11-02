import { Moon, Sun, Menu, X, User, LogOut, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import logo from "../assets/logo.png"

export const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isAuthenticated, user, token } = useAppSelector((state) => state.auth);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate('/');
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Courses", path: "/all-courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    
  ];

  const AuthButtons = () => {
    if (!token) {
      return (
        <Link to="/auth">
          <Button variant="default" size="sm" className="ml-2 bg-gradient-to-r from-primary to-accent hover:shadow-blue">
            Login
          </Button>
        </Link>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image} alt={user?.firstName} />
                <AvatarFallback>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.accountType}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/all-courses')}>
              <BookOpen className="mr-2 h-4 w-4" />
              All Courses
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 smooth-transition hover:opacity-80 group">
            <img loading="lazy" src={logo} alt="Logo" className="h-12 w-12 object-contain" />
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">Shell E-learning academy</span>
              <span className="text-xs text-muted-foreground font-body">MSME Verified</span>
            </div>
          </Link>
    
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-primary bg-secondary"
                    : "text-foreground smooth-transition hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="smooth-transition ml-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <AuthButtons />
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden animate-fade-in">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-primary bg-secondary"
                    : "text-foreground smooth-transition hover:bg-accent hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start px-4 py-3"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
            {!token ? (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-blue">
                  Login
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start px-4 py-3">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start px-4 py-3">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Link to="/all-courses" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start px-4 py-3">
                    <BookOpen className="w-4 h-4 mr-2" />
                    All Courses
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start px-4 py-3"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};