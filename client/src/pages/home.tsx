import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Clock, CheckCircle, Zap } from "lucide-react";
import Neural3D from "@/components/ui/neural-3d";


export default function Home() {
  return (
    <div className="min-h-screen bg-background neural-bg relative">
      <Neural3D />
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 pb-8 md:pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center relative">

          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 leading-tight page-title px-2">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">
              UPGRADE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">
              YOUR WEBSITE
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto mb-4 md:mb-8 px-4">
            <p className="text-base md:text-xl text-readable leading-relaxed">
              We build websites that <span className="text-cyan-300 font-semibold">actually work</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center mb-6 md:mb-12 px-4">
            <Button 
              size="lg" 
              className="relative bg-cyan-300/10 border border-cyan-300/20 text-cyan-300 hover:bg-cyan-300/20 hover:border-cyan-300/40 hover:shadow-[0_0_20px_rgba(103,232,249,0.3)] hover:text-cyan-200 px-6 md:px-8 py-3 md:py-4 tracking-wide transition-all duration-300 group overflow-hidden w-full sm:w-auto"
              asChild
            >
              <Link href="/contact">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 mr-2 relative z-10" />
                <span className="relative z-10 text-sm md:text-base">START PROJECT</span>
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="relative bg-purple-300/10 border border-purple-300/20 text-purple-300 hover:bg-purple-300/20 hover:border-purple-300/40 hover:shadow-[0_0_20px_rgba(196,181,253,0.3)] hover:text-purple-200 px-6 md:px-8 py-3 md:py-4 tracking-wide transition-all duration-300 group overflow-hidden w-full sm:w-auto"
              asChild
            >
              <Link href="/portfolio">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Zap className="w-4 md:w-5 h-4 md:h-5 mr-2 relative z-10" />
                <span className="relative z-10 text-sm md:text-base">VIEW PORTFOLIO</span>
              </Link>
            </Button>
          </div>

          {/* System Status Dashboard */}
          <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-4 md:p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-4 md:mb-8">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full opacity-80"></div>
                <span className="text-green-400 text-xs md:text-sm tracking-wide opacity-90">SYSTEM STATUS: OPERATIONAL</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <Clock className="w-6 md:w-8 h-6 md:h-8 text-yellow-300 mx-auto mb-3 md:mb-4 opacity-80" />
                <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1 md:mb-2">7+</div>
                <div className="text-yellow-300/70 text-xs md:text-sm tracking-wide mb-1">YEARS</div>
                <div className="text-yellow-300/50 text-xs">EXPERIENCE</div>
              </div>
              
              <div className="text-center">
                <CheckCircle className="w-6 md:w-8 h-6 md:h-8 text-green-300 mx-auto mb-3 md:mb-4 opacity-80" />
                <div className="text-2xl md:text-3xl font-bold text-green-300 mb-1 md:mb-2">100%</div>
                <div className="text-green-300/70 text-xs md:text-sm tracking-wide mb-1">SATISFACTION</div>
                <div className="text-green-300/50 text-xs">GUARANTEED</div>
              </div>
              
              <div className="text-center">
                <Zap className="w-6 md:w-8 h-6 md:h-8 text-purple-300 mx-auto mb-3 md:mb-4 opacity-80" />
                <div className="text-2xl md:text-3xl font-bold text-purple-300 mb-1 md:mb-2">2-4</div>
                <div className="text-purple-300/70 text-xs md:text-sm tracking-wide mb-1">WEEKS</div>
                <div className="text-purple-400/60 font-cyber text-xs">DELIVERY</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 font-cyber text-cyan-400 text-heading">
              READY TO START?
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-12 text-readable max-w-3xl mx-auto">
              Let's build something extraordinary.
            </p>
            <div className="flex flex-col lg:flex-row gap-8 justify-center">
              <Button 
                size="lg" 
                className="cyber-button bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-12 py-6 text-lg"
                asChild
              >
                <Link href="/contact">
                  START TRANSFORMATION
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="cyber-button bg-yellow-400/20 border-yellow-400 text-yellow-400 hover:bg-yellow-400/30 font-cyber px-12 py-6 text-lg"
                asChild
              >
                <Link href="/tools">
                  FREE NEURAL AUDIT
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}