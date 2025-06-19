import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/tools", label: "Free Audit", special: true },
    { href: "/contact", label: "Contact" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-gray-800/50 nav-scan">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl font-bold font-cyber text-cyan-400 tracking-wider">
              PRIMORPHO
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium font-cyber tracking-wide transition-all duration-300 group ${
                    isActive(item.href) 
                      ? "text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20" 
                      : item.special 
                        ? "text-yellow-400 hover:bg-yellow-400/10" 
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg border border-cyan-400/30"></div>
                  )}
                  <span className="relative flex items-center">
                    {item.special && <Zap className="w-4 h-4 mr-1" />}
                    {item.label}
                  </span>
                  {!isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex">
            <Button className="relative bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 text-cyan-400 hover:from-cyan-400/30 hover:to-purple-400/30 font-cyber tracking-wider transition-all duration-300 shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20" asChild>
              <Link href="/contact">
                <span className="relative">GET STARTED</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-cyan-400 hover:bg-cyan-400/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden backdrop-blur-xl bg-black/90 border-t border-gray-800/50">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`relative block px-4 py-3 rounded-lg text-base font-medium font-cyber tracking-wide transition-all duration-300 ${
                      isActive(item.href) 
                        ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/30" 
                        : item.special 
                          ? "text-yellow-400 hover:bg-yellow-400/10" 
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {isActive(item.href) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-lg"></div>
                    )}
                    <span className="relative flex items-center">
                      {item.special && <Zap className="w-4 h-4 mr-2" />}
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Button className="w-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 text-cyan-400 hover:from-cyan-400/30 hover:to-purple-400/30 font-cyber tracking-wider transition-all duration-300" asChild>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    GET STARTED
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}