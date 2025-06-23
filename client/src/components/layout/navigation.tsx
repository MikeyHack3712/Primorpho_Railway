import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/mood-board", label: "Vision Board", special: true },
    { href: "/tools", label: "Website Audit", special: true },
    { href: "/contact", label: "Contact" }
  ];

  const isActive = (href: string) => {
    if (href === "/home") return location === "/home";
    return location.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/90 border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="text-lg md:text-2xl font-bold tracking-wider transition-colors duration-300 font-cyber-clean hover:text-cyan-200">
              PRIMORPHO
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`relative px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-300 group ${
                    isActive(item.href) 
                      ? "text-cyan-300 bg-cyan-300/5 border border-cyan-300/20" 
                      : item.special 
                        ? "text-yellow-300 hover:text-yellow-200 hover:bg-yellow-300/5" 
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-300/5"
                  }`}
                >
                  <span className="relative flex items-center">
                    {item.special && <Zap className="w-4 h-4 mr-1 opacity-70" />}
                    {item.label}
                  </span>
                  {!isActive(item.href) && (
                    <div className="absolute bottom-1 left-1/2 w-0 h-px bg-cyan-300/60 transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></div>
                  )}
                </div>
              </Link>
            ))}
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-gray-200 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-sm bg-black/50 border-t border-gray-800/30">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      isActive(item.href)
                        ? "text-cyan-300 bg-cyan-300/5"
                        : item.special
                          ? "text-yellow-300 hover:text-yellow-200 hover:bg-yellow-300/5"
                          : "text-gray-400 hover:text-gray-200 hover:bg-gray-300/5"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center">
                      {item.special && <Zap className="w-4 h-4 mr-2 opacity-70" />}
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}