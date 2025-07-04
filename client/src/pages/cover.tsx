import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Zap, Globe, Code } from "lucide-react";
import Neural3D from "@/components/ui/neural-3d";

export default function Cover() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <Neural3D intensity="enhanced" />
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan-down"></div>
          <div className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-purple-400/50 to-transparent animate-scan-right"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-6 md:mb-8 relative">
          <div className="inline-block p-4 md:p-6 rounded-full border border-cyan-300/30 bg-cyan-300/5 backdrop-blur-sm">
            <Code className="w-12 md:w-16 h-12 md:h-16 text-cyan-300 animate-pulse" />
          </div>
          {/* Orbital rings */}
          <div className="absolute inset-0 rounded-full border border-purple-300/20 animate-spin-slow"></div>
          <div className="absolute inset-2 rounded-full border border-yellow-300/20 animate-spin-reverse"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 page-title tracking-wider">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">
            PRIMORPHO
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mb-6 md:mb-8">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-200/90 font-medium tracking-wide mb-3 md:mb-4">
            Website Design & Development
          </p>
          <div className="flex items-center justify-center gap-2 md:gap-4 text-sm md:text-lg text-slate-300">
            <Globe className="w-4 md:w-5 h-4 md:h-5 text-purple-300" />
            <span>Transforming Digital Presence</span>
            <Zap className="w-4 md:w-5 h-4 md:h-5 text-yellow-300" />
          </div>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-200/80 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          A website that works. <span className="text-cyan-300 font-semibold">Fast</span>, <span className="text-purple-300 font-semibold">stunning</span>, and <span className="text-yellow-300 font-semibold">built to convert</span>.
        </p>

        {/* Enter Button */}
        <div className="relative mb-6 md:mb-8">
          <Button
            size="lg"
            className="relative group bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-cyan-600/20 border-2 border-cyan-300/40 text-cyan-200 hover:border-cyan-300/80 hover:text-white px-6 sm:px-8 md:px-12 py-4 md:py-6 text-base sm:text-lg md:text-xl font-semibold tracking-wide transition-all duration-500 rounded-xl backdrop-blur-sm overflow-hidden"
            asChild
          >
            <Link href="/home">
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              {/* Pulsing border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-cyan-300/0 group-hover:border-cyan-300/60 group-hover:shadow-[0_0_40px_rgba(103,232,249,0.4)] transition-all duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center gap-2 md:gap-3">
                <span className="hidden sm:inline">GET STARTED</span>
                <span className="sm:hidden">START</span>
                <ArrowRight className="w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </Button>
          
          {/* Orbiting particles around button */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-orbit-1 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-orbit-2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-orbit-3 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Custom Development Statement */}
        <div className="mb-6 md:mb-8 max-w-4xl mx-auto">
          <div className="backdrop-blur-sm bg-gray-900/20 border border-cyan-300/20 rounded-lg p-4 md:p-6">
            <div className="text-center space-y-2 md:space-y-3">
              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                No templates. No gimmicks. Just <span className="text-cyan-300 font-semibold">handcrafted code</span> tailored to you.
              </p>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 text-xs md:text-sm text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>SYSTEMS ONLINE</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
            <span>ONLINE & READY</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
            <span className="hidden sm:inline">READY TO START</span>
            <span className="sm:hidden">READY</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}