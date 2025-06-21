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
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="mb-8">
            <span className="text-sm text-cyan-300 tracking-wider border border-cyan-300/30 px-6 py-2 rounded-md bg-cyan-300/5">
              NEURAL WEB SOLUTIONS
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight page-title">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">
              TRANSFORM
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">
              YOUR DIGITAL
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">
              PRESENCE
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-readable leading-relaxed">
              From vision to velocity, we code <span className="text-cyan-300 font-semibold">TRANSFORMATION</span>.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg" 
              className="relative bg-cyan-300/10 border border-cyan-300/20 text-cyan-300 hover:bg-cyan-300/20 hover:border-cyan-300/40 hover:shadow-[0_0_20px_rgba(103,232,249,0.3)] hover:text-cyan-200 px-8 py-4 tracking-wide transition-all duration-300 group overflow-hidden"
              asChild
            >
              <Link href="/contact">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <ArrowRight className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">INITIATE PROJECT</span>
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="relative bg-purple-300/10 border border-purple-300/20 text-purple-300 hover:bg-purple-300/20 hover:border-purple-300/40 hover:shadow-[0_0_20px_rgba(196,181,253,0.3)] hover:text-purple-200 px-8 py-4 tracking-wide transition-all duration-300 group overflow-hidden"
              asChild
            >
              <Link href="/portfolio">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Zap className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">VIEW PORTFOLIO</span>
              </Link>
            </Button>
          </div>

          {/* System Status Dashboard */}
          <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full opacity-80"></div>
                <span className="text-green-400 text-sm tracking-wide opacity-90">SYSTEM STATUS: OPERATIONAL</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="w-8 h-8 text-yellow-300 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold text-yellow-300 mb-2">7+</div>
                <div className="text-yellow-300/70 text-sm tracking-wide mb-1">YEARS</div>
                <div className="text-yellow-300/50 text-xs">EXPERIENCE</div>
              </div>
              
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-300 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold text-green-300 mb-2">100%</div>
                <div className="text-green-300/70 text-sm tracking-wide mb-1">SATISFACTION</div>
                <div className="text-green-300/50 text-xs">GUARANTEED</div>
              </div>
              
              <div className="text-center">
                <Zap className="w-8 h-8 text-purple-300 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold text-purple-300 mb-2">2-4</div>
                <div className="text-purple-300/70 text-sm tracking-wide mb-1">WEEKS</div>
                <div className="text-purple-400/60 font-cyber text-xs">DELIVERY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Showcase */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-cyber text-cyan-400 text-heading">
              PREMIUM PACKAGES
            </h2>
            <p className="text-xl text-readable">
              Choose your transformation level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "LAUNCHPAD",
                price: "$2,500",
                duration: "1-2 WEEKS",
                description: "Perfect entry into the digital realm",
                color: "yellow-400"
              },
              {
                name: "PRO PRESENCE",
                price: "$5,500", 
                duration: "2-3 WEEKS",
                description: "Professional transformation package",
                popular: true,
                color: "purple-400"
              },
              {
                name: "SMART BUSINESS",
                price: "$12,000",
                monthly: "+ $800/MONTH",
                duration: "3-4 WEEKS + ONGOING",
                description: "Complete digital metamorphosis",
                color: "cyan-400"
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className={`glass-card ${service.popular ? 'ring-2 ring-purple-400' : ''}`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-black px-6 py-2 rounded-full text-sm font-cyber tracking-wider">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <CardContent className="pt-8 pb-8 text-center">
                  <h3 className={`text-2xl font-bold font-cyber text-${service.color} mb-4 tracking-wider`}>
                    {service.name}
                  </h3>
                  <div className="mb-6">
                    <div className={`text-4xl font-bold font-cyber text-${service.color} mb-2`}>
                      {service.price}
                    </div>
                    {service.monthly && (
                      <div className="text-lg text-gray-400 font-cyber mb-1">{service.monthly}</div>
                    )}
                    <div className="text-sm text-gray-500 font-cyber tracking-wider">
                      {service.duration}
                    </div>
                  </div>
                  <p className="text-readable mb-8">{service.description}</p>
                  
                  <Button 
                    className={`w-full cyber-button bg-${service.color}/20 border-${service.color} text-${service.color} font-cyber py-3 tracking-wider`}
                    asChild
                  >
                    <Link href="/services">
                      EXPLORE PACKAGE
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="glass-card p-16">
            <h2 className="text-5xl font-bold mb-8 font-cyber text-cyan-400 text-heading">
              READY TO TRANSCEND?
            </h2>
            <p className="text-xl mb-12 text-readable max-w-3xl mx-auto">
              Join the elite who chose premium digital transformation.
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