import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ExternalLink, Code, TrendingUp, Zap } from "lucide-react";
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

export default function Portfolio() {
  const projects = [
    {
      title: "TECHCORP SOLUTIONS",
      category: "E-COMMERCE",
      description: "Complete digital transformation with 300% conversion increase",
      metrics: { visitors: "+150%", sales: "+300%", speed: "0.8s" },
      tech: ["React", "Node.js", "PostgreSQL"],
      color: "cyan-400"
    },
    {
      title: "NEXUS FINANCE",
      category: "FINTECH",
      description: "Secure financial platform with real-time analytics",
      metrics: { users: "+250%", uptime: "99.9%", speed: "0.6s" },
      tech: ["Vue.js", "Express", "MongoDB"],
      color: "purple-400"
    },
    {
      title: "QUANTUM LOGISTICS",
      category: "LOGISTICS",
      description: "AI-powered supply chain management system",
      metrics: { efficiency: "+180%", costs: "-40%", speed: "0.9s" },
      tech: ["Angular", "Python", "Redis"],
      color: "yellow-400"
    },
    {
      title: "BIOTECH INNOVATIONS",
      category: "HEALTHCARE",
      description: "Medical research portal with advanced data visualization",
      metrics: { research: "+200%", access: "+120%", speed: "0.7s" },
      tech: ["React", "GraphQL", "AWS"],
      color: "cyan-400"
    },
    {
      title: "NEURAL NETWORKS",
      category: "AI/ML",
      description: "Machine learning platform for predictive analytics",
      metrics: { accuracy: "+95%", speed: "+300%", load: "0.5s" },
      tech: ["Python", "TensorFlow", "Docker"],
      color: "purple-400"
    },
    {
      title: "CRYPTO EXCHANGE",
      category: "BLOCKCHAIN",
      description: "Secure cryptocurrency trading platform",
      metrics: { trades: "+400%", security: "100%", speed: "0.4s" },
      tech: ["Next.js", "Solidity", "Web3"],
      color: "yellow-400"
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
            <span className="text-glow-primary block">PROJECT</span>
            <span className="text-glow-accent block">PORTFOLIO</span>
          </h1>
          
          <div className="max-w-3xl mx-auto glass-card p-8 mb-16 border border-cyan-400/30">
            <p className="text-xl text-gray-300 leading-relaxed">
              Showcasing our latest <span className="text-cyan-400 font-cyber">digital transformations</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.title} 
                className={`glass-card border border-${project.color}/30 bg-${project.color}/5 hover:scale-105 transition-all duration-300 group`}
              >
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <div className={`text-xs font-cyber text-${project.color} tracking-wider`}>
                      {project.category}
                    </div>
                    <h3 className={`text-xl font-bold font-cyber text-${project.color} tracking-wider`}>
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                      <div key={key} className={`glass-card bg-${project.color}/10 border border-${project.color}/20 p-3 text-center`}>
                        <div className={`text-lg font-bold font-cyber text-${project.color}`}>
                          {value}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 font-cyber tracking-wider">TECH STACK</div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={tech} 
                          className={`text-xs px-2 py-1 bg-${project.color}/20 border border-${project.color}/30 text-${project.color} font-cyber tracking-wider rounded`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      className={`flex-1 cyber-button bg-${project.color}/20 border-${project.color} text-${project.color} hover:bg-${project.color}/30 font-cyber text-xs`}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      VIEW LIVE
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className={`cyber-button border-${project.color}/50 text-${project.color} hover:bg-${project.color}/10 font-cyber text-xs`}
                    >
                      <Code className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-cyber text-glow-primary">
              MEASURABLE RESULTS
            </h2>
            <p className="text-gray-300">
              Every project delivers <span className="text-cyan-400">real impact</span> for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
                metric: "250%",
                label: "AVERAGE GROWTH",
                description: "Revenue increase for clients",
                color: "cyan-400"
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                metric: "0.6s",
                label: "LOAD TIMES",
                description: "Average page speed",
                color: "yellow-400"
              },
              {
                icon: <Code className="w-8 h-8 text-purple-400" />,
                metric: "99.9%",
                label: "UPTIME",
                description: "System reliability",
                color: "purple-400"
              }
            ].map((result, index) => (
              <Card key={index} className={`glass-card bg-${result.color}/10 border border-${result.color}/30 p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {result.icon}
                  </div>
                  <div className={`text-4xl font-bold font-cyber text-${result.color} mb-2`}>
                    {result.metric}
                  </div>
                  <div className={`text-${result.color}/80 font-cyber text-xs tracking-wider mb-1`}>
                    {result.label}
                  </div>
                  <div className="text-gray-300 text-xs">
                    {result.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center glass-card border border-cyan-400/30 p-12">
          <h2 className="text-4xl font-bold mb-6 font-cyber text-glow-primary">
            READY FOR YOUR PROJECT?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create something <span className="text-cyan-400">extraordinary</span> for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="cyber-button glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-8 py-4" asChild>
              <Link href="/contact">
                <ArrowRight className="w-5 h-5 mr-2" />
                START PROJECT
              </Link>
            </Button>
            <Button size="lg" className="cyber-button bg-purple-500/20 border-purple-500 text-purple-400 hover:bg-purple-500/30 font-cyber px-8 py-4" asChild>
              <Link href="/services">VIEW PACKAGES</Link>
            </Button>
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