import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, User, Award, Globe } from "lucide-react";
import Neural3D from "@/components/ui/neural-3d";


export default function About() {
  return (
    <div className="min-h-screen bg-background neural-bg relative">
      <Neural3D intensity="subtle" />
      {/* Header Section */}
      <section className="pt-12 md:pt-24 pb-6 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">

          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight page-title">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">ABOUT</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">PRIMORPHO</span>
          </h1>
          
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-4 md:p-6 mb-6 md:mb-12">
            <p className="text-lg md:text-xl text-readable leading-relaxed">
              We build websites that help your business <span className="text-cyan-300 font-semibold">grow</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-8 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-12">
            <div className="backdrop-blur-sm bg-gray-900/30 border border-cyan-300/20 rounded-lg p-4 md:p-8">
              <h2 className="text-cyan-300 text-xl md:text-2xl tracking-wide mb-4 md:mb-6 text-subheading">WHAT WE DO</h2>
              <p className="text-readable leading-relaxed text-sm md:text-base">
                We build beautiful websites that turn visitors into customers. 
                Fast, easy to use, and designed to grow your business.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-gray-900/30 border border-purple-300/20 rounded-lg p-6 md:p-8">
              <h2 className="text-purple-300 text-2xl tracking-wide mb-6 text-subheading">HOW WE HELP</h2>
              <p className="text-readable leading-relaxed">
                We know how to build websites and get them found online. 
                From start to finish - we take care of everything for you.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <User className="w-8 h-8 text-cyan-300 opacity-80" />,
                number: "7+",
                label: "YEARS EXPERIENCE",
                description: "Building websites",
                color: "cyan-300"
              },
              {
                icon: <Award className="w-8 h-8 text-yellow-300 opacity-80" />,
                number: "100%",
                label: "COMMITMENT",
                description: "Quality guaranteed",
                color: "yellow-300"
              },
              {
                icon: <Globe className="w-8 h-8 text-purple-300 opacity-80" />,
                number: "24H",
                label: "RESPONSE TIME",
                description: "Quick communication",
                color: "purple-400"
              }
            ].map((stat, index) => (
              <Card key={index} className={`glass-card bg-${stat.color}/10 border border-${stat.color}/30 p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className={`text-4xl font-bold font-cyber text-${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className={`text-${stat.color}/80 font-cyber text-xs tracking-wider mb-1`}>
                    {stat.label}
                  </div>
                  <div className="text-gray-300 text-xs">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills Section */}
          <div className="glass-card border border-cyan-400/30 p-6 mb-12">
            <h2 className="font-cyber text-cyan-400 text-2xl tracking-wider mb-8 text-center">CORE CAPABILITIES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "CUSTOM DEVELOPMENT", level: 95, color: "cyan-400" },
                { title: "PERFORMANCE OPTIMIZATION", level: 90, color: "purple-400" },
                { title: "SEO & MARKETING", level: 88, color: "yellow-400" },
                { title: "MOBILE RESPONSIVE", level: 98, color: "cyan-400" },
                { title: "SECURITY & MAINTENANCE", level: 92, color: "purple-400" },
                { title: "USER EXPERIENCE", level: 94, color: "yellow-400" }
              ].map((skill, index) => (
                <div key={index} className={`glass-card bg-${skill.color}/10 border border-${skill.color}/30 p-4 text-center`}>
                  <h3 className={`font-cyber text-${skill.color} text-sm tracking-wider mb-2`}>
                    {skill.title}
                  </h3>
                  <div className={`text-2xl font-bold font-cyber text-${skill.color} mb-2`}>
                    {skill.level}%
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className={`bg-${skill.color} h-1 rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center glass-card border border-cyan-400/30 p-12">
            <h2 className="text-4xl font-bold mb-6 font-cyber-clean">
              READY TO COLLABORATE?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something <span className="text-cyan-400">extraordinary</span> together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="cyber-button glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-8 py-4" asChild>
                <Link href="/contact">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  START PROJECT
                </Link>
              </Button>
              <Button size="lg" className="cyber-button bg-purple-500/20 border-purple-500 text-purple-400 hover:bg-purple-500/30 font-cyber px-8 py-4" asChild>
                <Link href="/portfolio">VIEW PORTFOLIO</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card border border-cyan-400/30 p-6">
              <h3 className="font-cyber text-cyan-400 text-lg tracking-wider mb-4">Primorpho</h3>
              <p className="text-gray-300 text-sm mb-4">Neural web solutions for the future</p>
            </div>
            
            <div className="glass-card border border-cyan-400/30 p-6">
              <h3 className="font-cyber text-cyan-400 text-lg tracking-wider mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors">LaunchPad - $2,500</Link></li>
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Pro Presence - $5,500</Link></li>
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Smart Business - $12,000</Link></li>
              </ul>
            </div>
            
            <div className="glass-card border border-cyan-400/30 p-6">
              <h3 className="font-cyber text-yellow-400 text-lg tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
                <li><Link href="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}