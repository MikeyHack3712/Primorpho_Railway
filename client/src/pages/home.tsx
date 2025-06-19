import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Zap, Shield, Rocket, Star, Code, Globe } from "lucide-react";
import { useEffect, useState } from "react";

// Floating Particles Component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({length: 15}, (_, i) => ({
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
      <section className="relative pt-32 pb-20 px-4 grid-bg">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <span className="font-cyber text-sm text-cyan-400 tracking-wider">NEURAL WEB SOLUTIONS</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-glow-primary">CUSTOM WEBSITES</span>
            <br />
            <span className="text-white">BUILT FOR</span>
            <br />
            <span className="text-glow-accent">IMPACT</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            No templates. No fluff. Just sleek, powerful websites coded to <span className="text-cyan-400">grow your business</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="cyber-button glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber" asChild>
              <Link href="/services">
                VIEW PACKAGES
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" className="cyber-button bg-purple-500/20 border-purple-500 text-purple-400 hover:bg-purple-500/30" asChild>
              <Link href="/tools">FREE AUDIT</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-cyber">
              <span className="text-glow-secondary">WHY CHOOSE</span> <span className="text-cyan-400">PRIMORPHO?</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We build websites that don't just look good—they deliver <span className="text-yellow-400">results</span> for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="w-8 h-8 text-cyan-400" />,
                title: "FAST & RELIABLE",
                description: "Lightning-fast websites built with modern technology and optimized for maximum performance.",
                glow: "glow-primary"
              },
              {
                icon: <Shield className="w-8 h-8 text-purple-400" />,
                title: "SECURE & SCALABLE", 
                description: "Enterprise-grade security and infrastructure that grows with your business needs.",
                glow: "glow-secondary"
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                title: "RESULTS-DRIVEN",
                description: "Every element is designed to convert visitors into customers and drive growth.",
                glow: "glow-accent"
              }
            ].map((feature, index) => (
              <Card key={index} className={`glass-card p-6 text-center ${feature.glow} hover:scale-105 transition-transform duration-300`}>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 font-cyber text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-cyber">
              <span className="text-glow-primary">SERVICE PACKAGES</span>
            </h2>
            <p className="text-gray-300">
              Choose the perfect package for your <span className="text-cyan-400">business needs</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "LAUNCHPAD",
                price: "$2,500",
                duration: "1-2 WEEKS",
                description: "Perfect for getting your business online quickly with professional presence.",
                features: ["3-5 Page Website", "Mobile Responsive", "Basic SEO Setup"],
                color: "yellow-400",
                glow: "glow-accent"
              },
              {
                name: "PRO PRESENCE",
                price: "$5,500", 
                duration: "2-3 WEEKS",
                description: "Comprehensive solution for businesses ready to make serious impact online.",
                features: ["5-10 Page Website", "Custom Design System", "Advanced SEO & Analytics"],
                popular: true,
                color: "purple-400",
                glow: "glow-secondary"
              },
              {
                name: "SMART BUSINESS",
                price: "$12,000",
                monthly: "+ $800/MONTH",
                duration: "3-4 WEEKS + ONGOING",
                description: "Complete digital transformation with ongoing optimization support.",
                features: ["Full Business Website", "E-commerce Integration", "Marketing Automation"],
                color: "cyan-400",
                glow: "glow-primary"
              }
            ].map((service, index) => (
              <Card key={index} className={`glass-card p-6 ${service.glow} ${service.popular ? 'ring-2 ring-purple-500 pulse-glow' : ''} hover:scale-105 transition-all duration-300`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-cyber">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <Star className={`w-6 h-6 text-${service.color} mx-auto mb-2`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 font-cyber text-${service.color}`}>{service.name}</h3>
                  <div className="mb-4">
                    <div className={`text-3xl font-bold text-${service.color} mb-1`}>{service.price}</div>
                    {service.monthly && (
                      <div className="text-sm text-gray-400">{service.monthly}</div>
                    )}
                    <div className="text-xs text-gray-500 font-cyber">{service.duration}</div>
                  </div>
                  <p className="text-gray-300 mb-6 text-sm">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 text-${service.color}`} />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full cyber-button ${service.popular ? 'glow-secondary bg-purple-500/20 border-purple-500 text-purple-400' : `bg-${service.color}/20 border-${service.color} text-${service.color}`} font-cyber`}
                    asChild
                  >
                    <Link href="/services">LEARN MORE</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100+", label: "PROJECTS DELIVERED", color: "cyan-400" },
              { number: "99%", label: "CLIENT SATISFACTION", color: "purple-400" },
              { number: "24H", label: "RESPONSE TIME", color: "yellow-400" },
              { number: "5★", label: "AVERAGE RATING", color: "cyan-400" }
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 hover:scale-105 transition-transform">
                <div className={`text-3xl font-bold font-cyber text-${stat.color} text-glow-primary mb-2`}>
                  {stat.number}
                </div>
                <div className="text-xs text-gray-400 font-cyber">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-yellow-500/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 font-cyber">
            <span className="text-glow-primary">READY TO TRANSFORM</span>
            <br />
            <span className="text-white">YOUR BUSINESS?</span>
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Let's build something <span className="text-cyan-400">amazing</span> together. Get started with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="cyber-button glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber" asChild>
              <Link href="/contact">GET FREE CONSULTATION</Link>
            </Button>
            <Button size="lg" className="cyber-button glow-accent bg-yellow-400/20 border-yellow-400 text-yellow-400 hover:bg-yellow-400/30 font-cyber" asChild>
              <Link href="/tools">FREE WEBSITE AUDIT</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}