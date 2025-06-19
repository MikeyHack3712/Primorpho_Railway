import { Link } from "wouter";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-primary/30 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="glass-card p-6 rounded-xl">
            <div className="text-2xl font-cyber font-bold white-highlight mb-4">
              <span className="cyber-text">PRIMORPHO</span>
              <span className="text-yellow-400">.EXE</span>
            </div>
            <p className="white-highlight text-sm">
              Neural-enhanced websites built for quantum impact. 7 years of crafting digital excellence.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-cyber text-yellow-400 mb-4">SERVICES</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="white-highlight hover:text-primary text-sm">LaunchPad Package</Link></li>
              <li><Link href="/services" className="white-highlight hover:text-primary text-sm">Pro Presence</Link></li>
              <li><Link href="/services" className="white-highlight hover:text-primary text-sm">Smart Business</Link></li>
              <li><Link href="/contact" className="white-highlight hover:text-primary text-sm">Custom Quote</Link></li>
            </ul>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-cyber text-purple-400 mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li><Link href="/portfolio" className="white-highlight hover:text-primary text-sm">Portfolio</Link></li>
              <li><Link href="/about" className="white-highlight hover:text-primary text-sm">About</Link></li>
              <li><Link href="/blog" className="white-highlight hover:text-primary text-sm">Blog</Link></li>
              <li><Link href="/tools" className="white-highlight hover:text-primary text-sm">Tools</Link></li>
            </ul>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-cyber text-primary mb-4">CONNECT</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-primary hover:text-yellow-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary hover:text-yellow-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary hover:text-yellow-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>
            <p className="white-highlight text-sm">
              Response within 24 hours guaranteed
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary/30 mt-8 pt-8 text-center">
          <p className="white-highlight text-sm">
            © 2024 Primorpho. All rights reserved. Quantum-enhanced digital solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
