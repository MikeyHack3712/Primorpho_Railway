import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check, Rocket, Zap, Shield } from "lucide-react";
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

export default function Services() {
  const packages = [
    {
      name: "LAUNCHPAD",
      price: "$2,500",
      duration: "1-2 WEEKS",
      color: "yellow-400",
      icon: <Rocket className="w-8 h-8 text-yellow-400" />,
      description: "Perfect for getting your business online quickly with professional presence.",
      features: [
        "3-5 Page Website",
        "Mobile Responsive Design",
        "Basic SEO Optimization",
        "Contact Form Integration",
        "SSL Security Certificate",
        "1 Month Support"
      ]
    },
    {
      name: "PRO PRESENCE",
      price: "$5,500",
      duration: "2-3 WEEKS",
      color: "purple-400",
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      popular: true,
      description: "Comprehensive solution for businesses ready to make serious impact online.",
      features: [
        "5-10 Page Website",
        "Custom Design System",
        "Advanced SEO & Analytics",
        "Content Management System",
        "Performance Optimization",
        "3 Months Support & Updates"
      ]
    },
    {
      name: "SMART BUSINESS",
      price: "$12,000",
      duration: "3-4 WEEKS + ONGOING",
      color: "cyan-400",
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      monthly: "+ $800/MONTH",
      description: "Complete digital transformation with ongoing optimization support.",
      features: [
        "Full Business Website",
        "E-commerce Integration",
        "Marketing Automation",
        "A/B Testing & Optimization",
        "Priority Support & Maintenance",
        "Monthly Strategy Reviews"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background neural-bg">
      <FloatingParticles />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="font-cyber text-sm text-cyan-400 tracking-wider border border-cyan-400/30 px-4 py-2 rounded">
              NEURAL WEB SOLUTIONS
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-glow-primary block">SERVICE</span>
            <span className="text-glow-accent block">PACKAGES</span>
          </h1>
          
          <div className="max-w-3xl mx-auto glass-card p-8 mb-16 border border-cyan-400/30">
            <p className="text-xl text-gray-300 leading-relaxed">
              Choose the perfect package for your <span className="text-cyan-400 font-cyber">business needs</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.name} 
                className={`glass-card p-6 border border-${pkg.color}/30 ${pkg.popular ? 'ring-2 ring-purple-400 bg-purple-400/5' : `bg-${pkg.color}/5`} hover:scale-105 transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-400 text-black px-3 py-1 rounded text-xs font-cyber tracking-wider">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <CardContent className="pt-6 space-y-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {pkg.icon}
                    </div>
                    <h3 className={`text-2xl font-bold font-cyber text-${pkg.color} mb-2 tracking-wider`}>
                      {pkg.name}
                    </h3>
                    <div className="space-y-1">
                      <div className={`text-4xl font-bold font-cyber text-${pkg.color}`}>
                        {pkg.price}
                      </div>
                      {pkg.monthly && (
                        <div className="text-sm text-gray-400 font-cyber">{pkg.monthly}</div>
                      )}
                      <div className="text-xs text-gray-500 font-cyber tracking-wider">
                        {pkg.duration}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-center text-sm">
                    {pkg.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 text-${pkg.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full cyber-button font-cyber bg-${pkg.color}/20 border-${pkg.color} text-${pkg.color} hover:bg-${pkg.color}/30 tracking-wider`}
                    asChild
                  >
                    <Link href="/contact">
                      SELECT PACKAGE
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
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
                <li>LaunchPad - $2,500</li>
                <li>Pro Presence - $5,500</li>
                <li>Smart Business - $12,000</li>
              </ul>
            </div>
            
            <div className="glass-card border border-cyan-400/30 p-6">
              <h3 className="font-cyber text-yellow-400 text-lg tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
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