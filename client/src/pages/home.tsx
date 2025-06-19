import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Clock, CheckCircle, Zap, Cpu, Shield, Globe, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

// Advanced Floating Particles Component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, size: number, color: string}>>([]);

  useEffect(() => {
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'];
    const newParticles = Array.from({length: 25}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 20px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
}

// Matrix Rain Effect
function MatrixRain() {
  const [drops, setDrops] = useState<Array<{id: number, x: number, delay: number}>>([]);

  useEffect(() => {
    const newDrops = Array.from({length: 15}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-px bg-gradient-to-b from-cyan-400 to-transparent opacity-60"
          style={{
            left: `${drop.x}%`,
            height: '200px',
            animation: `matrixDrop 4s linear infinite`,
            animationDelay: `${drop.delay}s`
          }}
        />
      ))}
    </div>
  );
}

// Holographic Text Component
function HolographicText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`holographic-text ${className}`}>
      {children}
    </span>
  );
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background neural-bg liquid-bg relative">
      <FloatingParticles />
      <MatrixRain />
      
      {/* Energy Wave Background */}
      <div className="energy-wave fixed inset-0 z-0"></div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 hologram-bg z-20">
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Morphing Blobs */}
          <div className="morphing-blob absolute top-10 left-10 w-40 h-40 z-0"></div>
          <div className="morphing-blob absolute bottom-10 right-10 w-60 h-60 z-0"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <span className="font-cyber text-sm text-cyan-400 tracking-wider border border-cyan-400/50 px-6 py-3 rounded neon-border status-online">
                NEURAL WEB SOLUTIONS • OPERATIONAL
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold mb-12 leading-tight font-cyber typewriter">
              <HolographicText>
                <span className="block">CUSTOM WEBSITES</span>
                <span className="block">BUILT FOR</span>
                <span className="block text-glow-accent">IMPACT</span>
              </HolographicText>
            </h1>
            
            <div className="max-w-4xl mx-auto premium-card p-12 mb-16 scan-lines">
              <div className="data-stream absolute inset-0"></div>
              <p className="text-2xl text-gray-300 leading-relaxed relative z-10">
                No templates. No fluff. Just sleek, powerful websites coded to <span className="text-cyan-400 font-cyber">grow your business</span>.
                <br />
                Premium digital experiences that <span className="text-glow-primary">mesmerize</span> and <span className="text-glow-accent">convert</span>.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 justify-center mb-20">
              <Button 
                size="lg" 
                className="cyber-button premium-hover glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-12 py-6 text-lg"
                asChild
              >
                <Link href="/services">
                  <Cpu className="w-6 h-6 mr-3" />
                  VIEW PACKAGES
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="cyber-button premium-hover bg-purple-500/20 border-purple-500 text-purple-400 hover:bg-purple-500/30 font-cyber px-12 py-6 text-lg"
                asChild
              >
                <Link href="/tools">
                  <Zap className="w-6 h-6 mr-3" />
                  FREE AUDIT
                </Link>
              </Button>
            </div>

            {/* System Status Dashboard */}
            <div className="premium-card p-8 max-w-6xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse status-online"></div>
                  <span className="font-cyber text-green-400 text-lg tracking-wider">SYSTEM STATUS: OPERATIONAL</span>
                  <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card bg-yellow-400/15 border-yellow-400/50 p-8 text-center premium-hover interactive-glow">
                  <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <div className="text-5xl font-bold font-cyber text-yellow-400 mb-2 text-glow-accent">7+</div>
                  <div className="text-yellow-400/80 font-cyber text-sm tracking-wider mb-1">YEARS</div>
                  <div className="text-yellow-400/60 font-cyber text-xs">EXPERIENCE</div>
                </div>
                
                <div className="glass-card bg-green-400/15 border-green-400/50 p-8 text-center premium-hover interactive-glow">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-5xl font-bold font-cyber text-green-400 mb-2">100%</div>
                  <div className="text-green-400/80 font-cyber text-sm tracking-wider mb-1">SATISFACTION</div>
                  <div className="text-green-400/60 font-cyber text-xs">GUARANTEED</div>
                </div>
                
                <div className="glass-card bg-purple-400/15 border-purple-400/50 p-8 text-center premium-hover interactive-glow pulse-glow">
                  <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-5xl font-bold font-cyber text-purple-400 mb-2 text-glow-secondary">2-4</div>
                  <div className="text-purple-400/80 font-cyber text-sm tracking-wider mb-1">WEEKS</div>
                  <div className="text-purple-400/60 font-cyber text-xs">DELIVERY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section className="py-24 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-cyber">
              <HolographicText>PREMIUM CAPABILITIES</HolographicText>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology that sets us apart from the <span className="text-cyan-400">competition</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI-Powered Design",
                description: "Neural networks optimize every pixel",
                icon: <Cpu className="w-10 h-10" />,
                color: "cyan-400",
                bgColor: "cyan-400/15"
              },
              {
                title: "Quantum Security",
                description: "Enterprise-grade protection",
                icon: <Shield className="w-10 h-10" />,
                color: "purple-400", 
                bgColor: "purple-400/15"
              },
              {
                title: "Neural Analytics",
                description: "Predictive performance insights",
                icon: <TrendingUp className="w-10 h-10" />,
                color: "yellow-400",
                bgColor: "yellow-400/15"
              },
              {
                title: "Holographic UI",
                description: "Next-generation interfaces",
                icon: <Globe className="w-10 h-10" />,
                color: "green-400",
                bgColor: "green-400/15"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className={`premium-card bg-${feature.bgColor} border-${feature.color}/50 p-8 text-center premium-hover magnetic-hover`}
                style={{
                  transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
                }}
              >
                <CardContent className="pt-6">
                  <div className={`text-${feature.color} mb-6 flex justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className={`font-cyber text-${feature.color} mb-4 text-lg tracking-wider`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                  <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-${feature.color} to-cyan-400 rounded-full`}
                      style={{ width: '100%', animation: 'fillBar 2s ease-out forwards' }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Showcase */}
      <section className="py-24 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-cyber text-glow-primary">
              PREMIUM PACKAGES
            </h2>
            <p className="text-xl text-gray-300">
              Choose your <HolographicText>transformation</HolographicText> level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "LAUNCHPAD",
                price: "$2,500",
                duration: "1-2 WEEKS",
                description: "Perfect entry into the digital realm",
                color: "yellow-400",
                glow: "glow-accent"
              },
              {
                name: "PRO PRESENCE",
                price: "$5,500", 
                duration: "2-3 WEEKS",
                description: "Professional transformation package",
                popular: true,
                color: "purple-400",
                glow: "glow-secondary"
              },
              {
                name: "SMART BUSINESS",
                price: "$12,000",
                monthly: "+ $800/MONTH",
                duration: "3-4 WEEKS + ONGOING",
                description: "Complete digital metamorphosis",
                color: "cyan-400",
                glow: "glow-primary"
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className={`premium-card ${service.glow} ${service.popular ? 'pulse-glow' : ''} premium-hover`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-black px-6 py-2 rounded-full text-sm font-cyber tracking-wider neon-border">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <CardContent className="pt-8 pb-8 text-center">
                  <h3 className={`text-3xl font-bold font-cyber text-${service.color} mb-4 tracking-wider`}>
                    {service.name}
                  </h3>
                  <div className="mb-6">
                    <div className={`text-5xl font-bold font-cyber text-${service.color} mb-2 text-glow-primary`}>
                      {service.price}
                    </div>
                    {service.monthly && (
                      <div className="text-lg text-gray-400 font-cyber mb-1">{service.monthly}</div>
                    )}
                    <div className="text-sm text-gray-500 font-cyber tracking-wider">
                      {service.duration}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-8 text-lg">{service.description}</p>
                  
                  <Button 
                    className={`w-full cyber-button premium-hover bg-${service.color}/20 border-${service.color} text-${service.color} font-cyber py-4 text-lg tracking-wider`}
                    asChild
                  >
                    <Link href="/services">
                      EXPLORE PACKAGE
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-yellow-500/20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="premium-card p-16">
            <h2 className="text-6xl font-bold mb-8 font-cyber">
              <HolographicText>READY TO SCALE?</HolographicText>
            </h2>
            <p className="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
              Let's build something that drives real <span className="text-glow-primary">results</span> for your business.
            </p>
            <div className="flex flex-col lg:flex-row gap-8 justify-center">
              <Button 
                size="lg" 
                className="cyber-button premium-hover glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-16 py-8 text-xl"
                asChild
              >
                <Link href="/contact">
                  <Cpu className="w-8 h-8 mr-3" />
                  GET STARTED
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="cyber-button premium-hover glow-accent bg-yellow-400/20 border-yellow-400 text-yellow-400 hover:bg-yellow-400/30 font-cyber px-16 py-8 text-xl"
                asChild
              >
                <Link href="/tools">
                  <Zap className="w-8 h-8 mr-3" />
                  FREE AUDIT
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Grid */}
      <section className="py-20 px-4 z-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="premium-card p-8 premium-hover">
              <h3 className="font-cyber text-cyan-400 text-2xl tracking-wider mb-6">Primorpho</h3>
              <p className="text-gray-300 mb-6">Neural web solutions for the digital elite</p>
              <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
            </div>
            
            <div className="premium-card p-8 premium-hover">
              <h3 className="font-cyber text-cyan-400 text-2xl tracking-wider mb-6">Services</h3>
              <ul className="space-y-3 text-gray-300">
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />LaunchPad - $2,500
                </Link></li>
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />Pro Presence - $5,500
                </Link></li>
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />Smart Business - $12,000
                </Link></li>
              </ul>
            </div>
            
            <div className="premium-card p-8 premium-hover">
              <h3 className="font-cyber text-yellow-400 text-2xl tracking-wider mb-6">Navigation</h3>
              <ul className="space-y-3 text-gray-300">
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />Services
                </Link></li>
                <li><Link href="/portfolio" className="hover:text-cyan-400 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />Portfolio
                </Link></li>
                <li><Link href="/about" className="hover:text-cyan-400 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />About
                </Link></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />Contact
                </Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}