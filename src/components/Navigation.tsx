import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.jpg"

export const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Navigation", path: "/navigation" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 smooth-transition hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
             <img loading="lazy" src={logo} alt="Logo" className="h-6 w-6" />
            </div>
            <span className="font-display text-xl font-bold">Shell Entertainment</span>
          </Link>
    
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-foreground smooth-transition hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="smooth-transition"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* CTA Buttons - Desktop */}
            <div className="hidden items-center gap-3 md:flex">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="smooth-transition hover:scale-105">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground smooth-transition hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
