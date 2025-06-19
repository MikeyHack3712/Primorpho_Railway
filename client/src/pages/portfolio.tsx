import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Portfolio() {
  const projects = [
    {
      title: "RESTAURANT ORDERING",
      description: "Advanced ordering system with real-time menu management",
      results: "+300% ONLINE ORDERS",
      color: "primary",
      icon: (
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-purple-400 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-2 bg-black rounded opacity-80"></div>
          <div className="relative z-10 grid grid-cols-3 gap-1 p-2">
            <div className="w-2 h-2 bg-primary rounded-sm animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-sm animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-sm animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-sm animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <div className="w-2 h-2 bg-primary rounded-sm animate-pulse" style={{animationDelay: '0.8s'}}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-sm animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="absolute bottom-1 left-1 right-1 h-1 bg-primary rounded-full animate-pulse"></div>
        </div>
      ),
    },
    {
      title: "HEALTHCARE PLATFORM",
      description: "Patient management with secure data protocols",
      results: "+150% PATIENT BOOKINGS",
      color: "purple-400",
      icon: (
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-2 bg-black rounded opacity-80"></div>
          <div className="relative z-10">
            <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border border-primary rounded-full animate-ping"></div>
                <div className="w-1 h-4 bg-primary mx-auto"></div>
                <div className="w-4 h-1 bg-primary absolute top-1.5 left-0"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      ),
    },
    {
      title: "E-COMMERCE HUB",
      description: "Full marketplace with payment gateway integration",
      results: "+400% REVENUE GROWTH",
      color: "yellow-400",
      icon: (
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-primary rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-2 bg-black rounded opacity-80"></div>
          <div className="relative z-10 grid grid-cols-2 gap-2 p-2">
            <div className="h-2 bg-primary rounded animate-pulse"></div>
            <div className="h-2 bg-purple-400 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="h-2 bg-yellow-400 rounded animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <div className="h-2 bg-pink-400 rounded animate-pulse" style={{animationDelay: '0.9s'}}></div>
          </div>
          <div className="absolute bottom-1 left-1 w-3 h-3 border border-primary rounded flex items-center justify-center">
            <div className="w-1 h-1 bg-primary rounded-full"></div>
          </div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      ),
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      business: "TechFlow Restaurants",
      rating: 5,
      quote: "Primorpho transformed our online presence completely. Orders increased 300% in the first month after launch.",
      package: "Pro Presence",
    },
    {
      name: "Dr. Michael Torres",
      business: "HealthCare Plus",
      rating: 5,
      quote: "The security and performance of our new platform exceeded all expectations. Patient satisfaction is at an all-time high.",
      package: "Smart Business",
    },
    {
      name: "Lisa Wang",
      business: "EcoMart Online",
      rating: 5,
      quote: "ROI was immediate. The e-commerce integration is flawless and our revenue has quadrupled since the new site went live.",
      package: "Smart Business",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              NEURAL.<span className="text-purple-400 animate-glow-pulse">PORTFOLIO</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Quantum-enhanced websites delivering measurable results for diverse business sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {projects.map((project, index) => (
              <Card key={index} className="glass-card border-primary/30 hover:animate-neural-pulse transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    {project.icon}
                  </div>
                  <h3 className={`text-xl font-cyber text-${project.color} mb-2`}>
                    {project.title}
                  </h3>
                  <p className="white-highlight text-sm mb-4">{project.description}</p>
                  <div className="text-center">
                    <div className="text-2xl font-cyber text-yellow-400 mb-1">
                      {project.results.split(' ')[0]}
                    </div>
                    <div className="text-sm white-highlight">
                      {project.results.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Results Summary */}
          <div className="glass-card p-12 rounded-xl text-center scan-line">
            <h2 className="text-3xl md:text-5xl font-cyber font-bold mb-8 white-highlight">
              PROVEN <span className="text-primary animate-glow-pulse">RESULTS</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-cyber text-primary mb-2">7</div>
                <div className="white-highlight">Websites Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-cyber text-yellow-400 mb-2">300%</div>
                <div className="white-highlight">Average Growth</div>
              </div>
              <div>
                <div className="text-4xl font-cyber text-purple-400 mb-2">100%</div>
                <div className="white-highlight">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              CLIENT.<span className="text-yellow-400 animate-glow-pulse">FEEDBACK</span>
            </h2>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Authentic testimonials from business owners who experienced quantum growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-primary/30 hover:animate-neural-pulse">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  
                  <p className="white-highlight text-sm mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="border-t border-primary/30 pt-4">
                    <div className="white-highlight font-semibold">{testimonial.name}</div>
                    <div className="text-primary text-sm">{testimonial.business}</div>
                    <Badge variant="outline" className="mt-2 border-yellow-400 text-yellow-400">
                      {testimonial.package}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 rounded-xl scan-line">
            <h2 className="text-3xl md:text-5xl font-cyber font-bold mb-6 white-highlight">
              NEXT <span className="text-primary animate-glow-pulse">SUCCESS STORY</span>?
            </h2>
            <p className="text-xl white-highlight mb-8 max-w-2xl mx-auto">
              Join these successful businesses. Get measurable results with a quantum-enhanced website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reserve-slot">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
                  START YOUR PROJECT
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10">
                  DISCUSS REQUIREMENTS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
