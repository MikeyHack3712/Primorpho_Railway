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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/90 border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl font-bold font-cyber text-cyan-300 tracking-wider hover:text-cyan-200 transition-colors duration-300">
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

          {/* Desktop CTA Button */}
          <div className="hidden md:flex">
            <Button className="relative bg-cyan-300/10 border border-cyan-300/20 text-cyan-300 hover:bg-cyan-300/15 hover:border-cyan-300/30 hover:text-cyan-200 tracking-wide transition-all duration-300" asChild>
              <Link href="/contact">
                GET STARTED
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-cyan-300 hover:bg-cyan-300/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden backdrop-blur-xl bg-black/95 border-t border-gray-800/30">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`block px-4 py-3 rounded-md text-base font-medium tracking-wide transition-all duration-300 ${
                      isActive(item.href) 
                        ? "text-cyan-300 bg-cyan-300/5 border border-cyan-300/20" 
                        : item.special 
                          ? "text-yellow-300 hover:bg-yellow-300/5" 
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
              <div className="px-4 pt-4">
                <Button className="w-full bg-cyan-300/10 border border-cyan-300/20 text-cyan-300 hover:bg-cyan-300/15 tracking-wide transition-all duration-300" asChild>
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