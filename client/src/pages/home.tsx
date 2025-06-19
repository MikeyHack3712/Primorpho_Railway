import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Clock, CheckCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";

// Floating Particles Component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background neural-bg">
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <span className="font-cyber text-sm text-cyan-400 tracking-wider border border-cyan-400/30 px-4 py-2 rounded">
              NEURAL WEB SOLUTIONS
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-glow-primary block">TRANSFORM</span>
            <span className="text-white block">YOUR DIGITAL</span>
            <span className="text-glow-accent block">PRESENCE</span>
          </h1>
          
          <div className="max-w-3xl mx-auto glass-card p-8 mb-12 border border-cyan-400/30">
            <p className="text-xl text-gray-300 leading-relaxed">
              From vision to velocity, we code <span className="text-cyan-400 font-cyber">transformation</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="lg" className="cyber-button glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-8 py-4" asChild>
              <Link href="/contact">
                <ArrowRight className="w-5 h-5 mr-2" />
                INITIATE PROJECT
              </Link>
            </Button>
            <Button size="lg" className="cyber-button bg-purple-500/20 border-purple-500 text-purple-400 hover:bg-purple-500/30 font-cyber px-8 py-4" asChild>
              <Link href="/portfolio">
                <Zap className="w-5 h-5 mr-2" />
                VIEW PORTFOLIO
              </Link>
            </Button>
          </div>

          {/* System Status */}
          <div className="glass-card border border-cyan-400/30 p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-cyber text-green-400 text-sm tracking-wider">SYSTEM STATUS: OPERATIONAL</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card bg-yellow-400/10 border border-yellow-400/30 p-6 text-center">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold font-cyber text-yellow-400 mb-1">7+</div>
                <div className="text-yellow-400/80 font-cyber text-xs tracking-wider">YEARS</div>
                <div className="text-yellow-400/60 font-cyber text-xs">EXPERIENCE</div>
              </div>
              
              <div className="glass-card bg-green-400/10 border border-green-400/30 p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold font-cyber text-green-400 mb-1">100%</div>
                <div className="text-green-400/80 font-cyber text-xs tracking-wider">SATISFACTION</div>
                <div className="text-green-400/60 font-cyber text-xs">GUARANTEED</div>
              </div>
              
              <div className="glass-card bg-purple-400/10 border border-purple-400/30 p-6 text-center">
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold font-cyber text-purple-400 mb-1">2-4</div>
                <div className="text-purple-400/80 font-cyber text-xs tracking-wider">WEEKS</div>
                <div className="text-purple-400/60 font-cyber text-xs">DELIVERY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Mobile Responsive",
                description: "Perfect display on all devices",
                icon: "📱",
                color: "cyan-400",
                bgColor: "cyan-400/10"
              },
              {
                title: "Lightning Fast",
                description: "Optimized for speed",
                icon: "⚡",
                color: "yellow-400", 
                bgColor: "yellow-400/10"
              },
              {
                title: "Custom Features",
                description: "Tailored to your needs",
                icon: "⚙️",
                color: "cyan-400",
                bgColor: "cyan-400/10"
              },
              {
                title: "Ongoing Support",
                description: "Continuous maintenance",
                icon: "🔧",
                color: "yellow-400",
                bgColor: "yellow-400/10"
              }
            ].map((feature, index) => (
              <Card key={index} className={`glass-card bg-${feature.bgColor} border border-${feature.color}/30 p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className={`font-cyber text-${feature.color} mb-3 text-sm tracking-wider`}>{feature.title}</h3>
                  <p className="text-gray-300 text-xs">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
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
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
                <li><Link href="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</Link></li>
                <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}