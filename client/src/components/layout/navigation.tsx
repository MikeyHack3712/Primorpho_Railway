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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl font-bold font-cyber text-glow-primary">
              PRIMORPHO
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-all duration-300 hover:text-cyan-400 hover:text-glow-primary ${
                    isActive(item.href) 
                      ? "text-cyan-400 text-glow-primary" 
                      : item.special 
                        ? "text-yellow-400" 
                        : "text-gray-300"
                  } ${item.special ? "pulse-glow" : ""}`}
                >
                  {item.special && <Zap className="w-4 h-4 inline mr-1" />}
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex">
            <Button className="cyber-button glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30" asChild>
              <Link href="/contact">GET STARTED</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass-card border-t border-cyan-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`block px-3 py-2 text-base font-medium transition-colors hover:text-cyan-400 ${
                      isActive(item.href) 
                        ? "text-cyan-400" 
                        : item.special 
                          ? "text-yellow-400" 
                          : "text-gray-300"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.special && <Zap className="w-4 h-4 inline mr-1" />}
                    {item.label}
                  </div>
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full cyber-button glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400" asChild>
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