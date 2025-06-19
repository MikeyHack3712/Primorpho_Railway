import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Search, Zap, Shield, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="holographic glass-card p-12 rounded-3xl mb-8 scan-line">
              <h1 className="text-5xl md:text-7xl font-cyber font-bold mb-6 white-highlight">
                NEURAL.<span className="cyber-text animate-glow-pulse">ENHANCED</span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-cyber mb-8 text-yellow-400">
                WEBSITES BUILT FOR IMPACT
              </h2>
              <p className="text-xl md:text-2xl mb-12 white-highlight max-w-4xl mx-auto font-futura">
                No templates. No fluff. Just sleek, powerful websites coded to grow your business.
                <span className="text-purple-400"> 7 years experience. Intel partnership background.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/reserve-slot">
                  <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
                    <Rocket className="w-5 h-5 mr-2" />
                    RESERVE SLOT
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10">
                    <Search className="w-5 h-5 mr-2" />
                    FREE AUDIT
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Status Panel */}
            <div className="glass-card p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-cyber text-primary mb-2">
                    <span className="animate-glow-pulse">02</span>
                  </div>
                  <div className="white-highlight">SLOTS REMAINING</div>
                  <div className="text-sm text-yellow-400">THIS MONTH</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-cyber text-purple-400 mb-2">
                    <span className="animate-glow-pulse">7</span>
                  </div>
                  <div className="white-highlight">YEARS EXPERIENCE</div>
                  <div className="text-sm text-yellow-400">INTEL BACKGROUND</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-cyber text-yellow-400 mb-2">
                    <span className="animate-glow-pulse">24H</span>
                  </div>
                  <div className="white-highlight">RESPONSE TIME</div>
                  <div className="text-sm text-primary">GUARANTEED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              QUANTUM.<span className="text-primary animate-glow-pulse">CAPABILITIES</span>
            </h2>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Advanced web technologies engineered for maximum performance and business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-primary/30 hover:animate-neural-pulse transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-purple-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-cyber text-primary mb-4">NEURAL OPTIMIZATION</h3>
                <p className="white-highlight text-sm">
                  AI-enhanced performance optimization with quantum-level speed improvements.
                  Loading times under 2 seconds guaranteed.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-purple-400/30 hover:animate-neural-pulse transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-cyber text-purple-400 mb-4">QUANTUM SECURITY</h3>
                <p className="white-highlight text-sm">
                  Military-grade security protocols with advanced threat detection and 
                  real-time monitoring systems.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-yellow-400/30 hover:animate-neural-pulse transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-primary rounded-lg flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-cyber text-yellow-400 mb-4">ADAPTIVE INTERFACE</h3>
                <p className="white-highlight text-sm">
                  Responsive design that adapts to any device with pixel-perfect precision
                  and intuitive user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 rounded-xl scan-line">
            <h2 className="text-3xl md:text-5xl font-cyber font-bold mb-6 white-highlight">
              READY TO <span className="text-primary animate-glow-pulse">EVOLVE</span>?
            </h2>
            <p className="text-xl white-highlight mb-8 max-w-2xl mx-auto">
              Join the digital evolution. Get a quantum-enhanced website that drives real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
                  START PROJECT
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-purple-400 text-white hover:bg-purple-400/10">
                  VIEW PORTFOLIO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
