import { Link } from "wouter";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-card border-t border-cyan-500/20 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="text-2xl font-bold mb-4 font-cyber-clean">PRIMORPHO</div>
            <p className="text-gray-300 mb-4">
              Custom websites built for <span className="text-cyan-400">impact</span>. No templates, just results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 font-cyber text-cyan-400">SERVICES</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">LaunchPad</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Pro Presence</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Smart Business</Link></li>
              <li><Link href="/tools" className="hover:text-yellow-400 transition-colors">Website Audit</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 font-cyber text-purple-400">COMPANY</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link></li>
              <li><Link href="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="font-semibold mb-4 font-cyber text-yellow-400">GET STARTED</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Free Consultation</Link></li>
              <li><Link href="/reserve-slot" className="hover:text-cyan-400 transition-colors">Reserve Slot</Link></li>
              <li><Link href="/tools" className="hover:text-yellow-400 transition-colors">Free Audit</Link></li>
              <li><Link href="/admin" className="hover:text-purple-400 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 font-cyber text-sm">
            &copy; 2024 PRIMORPHO. ALL RIGHTS RESERVED.
          </div>
          <div className="text-gray-400 font-cyber text-sm mt-4 md:mt-0">
            <span className="text-cyan-400">NEURAL</span> WEB SOLUTIONS
          </div>
        </div>
      </div>
    </footer>
  );
}