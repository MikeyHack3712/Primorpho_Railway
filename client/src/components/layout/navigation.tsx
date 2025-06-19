import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/services", label: "SERVICES" },
    { path: "/portfolio", label: "PORTFOLIO" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
    { path: "/admin", label: "ADMIN", className: "text-purple-400" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-cyber font-bold white-highlight">
              <span className="cyber-text animate-glow-pulse">PRIMORPHO</span>
              <span className="text-yellow-400">.EXE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-item transition-all duration-300 hover:text-primary ${
                    location === item.path ? "text-primary" : ""
                  } ${item.className || ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-primary/30">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xl font-cyber font-bold white-highlight">
                    <span className="cyber-text">PRIMORPHO</span>
                    <span className="text-yellow-400">.EXE</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-primary"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`nav-item text-lg transition-all duration-300 hover:text-primary ${
                        location === item.path ? "text-primary" : ""
                      } ${item.className || ""}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
