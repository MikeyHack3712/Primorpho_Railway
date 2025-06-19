import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Code, Database, Cloud, Cpu, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              ORIGIN.<span className="text-primary animate-glow-pulse">STORY</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              The neural pathways behind quantum-enhanced digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-cyber font-bold mb-8 white-highlight">
                THE <span className="text-primary animate-glow-pulse">DEVELOPER</span>
              </h2>
              <div className="space-y-6 text-lg white-highlight font-futura">
                <p>
                  7 years of crafting digital experiences. Background in Intel partnership programs, 
                  bringing enterprise-level precision to every project.
                </p>
                <p>
                  No templates. No shortcuts. Every website is hand-coded with neural-enhanced 
                  optimization for maximum performance and conversion.
                </p>
                <p className="text-purple-400 font-semibold">
                  "I don't just build websites. I engineer quantum-optimized digital ecosystems 
                  that grow with your business."
                </p>
              </div>
              <div className="mt-8">
                <Link href="/book-consultation">
                  <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold bg-transparent border border-primary text-white hover:bg-primary/10">
                    <Calendar className="w-5 h-5 mr-2" />
                    SCHEDULE CONSULTATION
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-2xl font-cyber text-yellow-400 mb-6">TECH STACK</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg border border-primary/30">
                  <Code className="w-8 h-8 text-primary mb-2 mx-auto" />
                  <div className="white-highlight font-cyber text-sm">REACT</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-yellow-400/30">
                  <Cpu className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
                  <div className="white-highlight font-cyber text-sm">NODE.JS</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-purple-400/30">
                  <Database className="w-8 h-8 text-purple-400 mb-2 mx-auto" />
                  <div className="white-highlight font-cyber text-sm">POSTGRESQL</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-pink-400/30">
                  <Cloud className="w-8 h-8 text-pink-400 mb-2 mx-auto" />
                  <div className="white-highlight font-cyber text-sm">CLOUD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              INTEL.<span className="text-yellow-400 animate-glow-pulse">PARTNERSHIP</span>
            </h2>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Enterprise-level expertise applied to every project, regardless of size.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-primary/30 hover:animate-neural-pulse">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-cyber text-primary mb-4">7</div>
                <div className="white-highlight font-cyber">YEARS EXPERIENCE</div>
                <div className="text-sm text-yellow-400 mt-2">Building digital solutions</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-yellow-400/30 hover:animate-neural-pulse">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-cyber text-yellow-400 mb-4">7</div>
                <div className="white-highlight font-cyber">WEBSITES DELIVERED</div>
                <div className="text-sm text-primary mt-2">Successful projects</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-purple-400/30 hover:animate-neural-pulse">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-cyber text-purple-400 mb-4">100%</div>
                <div className="white-highlight font-cyber">CLIENT SATISFACTION</div>
                <div className="text-sm text-yellow-400 mt-2">Project success rate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 rounded-xl scan-line">
            <h2 className="text-3xl md:text-5xl font-cyber font-bold mb-8 text-center white-highlight">
              DEVELOPMENT <span className="text-primary animate-glow-pulse">PHILOSOPHY</span>
            </h2>
            
            <div className="space-y-8">
              <div className="border-l-2 border-primary pl-6">
                <h3 className="text-xl font-cyber text-primary mb-2">NO TEMPLATES</h3>
                <p className="white-highlight">
                  Every line of code is written specifically for your business needs. 
                  No cookie-cutter solutions, no bloated frameworks.
                </p>
              </div>

              <div className="border-l-2 border-yellow-400 pl-6">
                <h3 className="text-xl font-cyber text-yellow-400 mb-2">QUANTUM OPTIMIZATION</h3>
                <p className="white-highlight">
                  Performance is not negotiable. Every website is optimized at the molecular level 
                  for speed, security, and scalability.
                </p>
              </div>

              <div className="border-l-2 border-purple-400 pl-6">
                <h3 className="text-xl font-cyber text-purple-400 mb-2">GROWTH FOCUSED</h3>
                <p className="white-highlight">
                  Your website should be a business asset, not just a digital brochure. 
                  Every element is designed to drive measurable results.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/contact">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
                  DISCUSS YOUR PROJECT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
