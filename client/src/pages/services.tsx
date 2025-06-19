import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";

export default function Services() {
  const packages = [
    {
      name: "LaunchPad",
      price: "$2,500",
      duration: "1-2 weeks",
      description: "Perfect for getting your business online quickly with a professional presence.",
      features: [
        "3-5 Page Website",
        "Mobile Responsive Design",
        "Basic SEO Setup",
        "Contact Form Integration",
        "SSL Security Certificate",
        "1 Month Support"
      ],
      cta: "Get Started"
    },
    {
      name: "Pro Presence",
      price: "$5,500",
      duration: "2-3 weeks",
      description: "Comprehensive solution for businesses ready to make a serious impact online.",
      features: [
        "5-10 Page Website",
        "Custom Design System",
        "Advanced SEO & Analytics",
        "Content Management System",
        "Performance Optimization",
        "Email Marketing Setup",
        "3 Months Support & Updates"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Smart Business",
      price: "$12,000",
      monthly: "$800/month",
      duration: "3-4 weeks + ongoing",
      description: "Complete digital transformation with ongoing optimization and growth support.",
      features: [
        "Full Business Website",
        "E-commerce Integration",
        "Advanced Analytics Dashboard",
        "Marketing Automation",
        "A/B Testing & Optimization",
        "Priority Support",
        "Monthly Strategy Reviews",
        "Ongoing Updates & Maintenance"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Custom Websites Built for Impact
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            No templates. No fluff. Just sleek, powerful websites coded to grow your business.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.name} 
                className={`relative p-6 ${pkg.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{pkg.price}</span>
                      {pkg.monthly && (
                        <span className="text-sm text-muted-foreground">+ {pkg.monthly}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{pkg.description}</p>
                  
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full group" 
                    variant={pkg.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contact">
                      {pkg.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground">
              From concept to launch, we handle everything so you can focus on your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We learn about your business, goals, and target audience."
              },
              {
                step: "02",
                title: "Design",
                description: "Custom designs that reflect your brand and convert visitors."
              },
              {
                step: "03",
                title: "Development",
                description: "Clean, efficient code that's fast, secure, and scalable."
              },
              {
                step: "04",
                title: "Launch",
                description: "Go live with ongoing support and optimization."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                  {process.step}
                </div>
                <h3 className="font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Let's discuss your project and find the perfect solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}