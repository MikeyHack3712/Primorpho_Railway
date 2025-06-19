import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Zap, Shield, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Custom Websites Built for Impact
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            No templates. No fluff. Just sleek, powerful websites coded to grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/services">
                View Packages
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/portfolio">See Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Primorpho?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We build websites that don't just look good—they deliver results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="w-8 h-8 text-primary" />,
                title: "Fast & Reliable",
                description: "Lightning-fast websites built with modern technology and optimized for performance."
              },
              {
                icon: <Shield className="w-8 h-8 text-primary" />,
                title: "Secure & Scalable",
                description: "Enterprise-grade security and infrastructure that grows with your business."
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Results-Driven",
                description: "Every element is designed to convert visitors into customers and drive growth."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Service Packages</h2>
            <p className="text-muted-foreground">
              Choose the perfect package for your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "LaunchPad",
                price: "$2,500",
                description: "Perfect for getting your business online quickly.",
                features: ["3-5 Page Website", "Mobile Responsive", "Basic SEO"]
              },
              {
                name: "Pro Presence",
                price: "$5,500",
                description: "Comprehensive solution for serious businesses.",
                features: ["5-10 Page Website", "Custom Design", "Advanced SEO"],
                popular: true
              },
              {
                name: "Smart Business",
                price: "$12,000",
                description: "Complete digital transformation solution.",
                features: ["Full Website", "E-commerce", "Marketing Automation"]
              }
            ].map((service, index) => (
              <Card key={index} className={`p-6 ${service.popular ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-4">{service.price}</div>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={service.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/services">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's build something amazing together. Get started with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/tools">Free Website Audit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}