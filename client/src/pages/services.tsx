import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Check, Star, Zap, Shield, Rocket } from "lucide-react";

export default function Services() {
  const packages = [
    {
      name: "LAUNCHPAD",
      price: "$2,500",
      duration: "1-2 WEEKS",
      color: "yellow-400",
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "3-5 Page Website",
        "Mobile Responsive",
        "Basic SEO Optimization",
        "Contact Form Integration",
        "SSL Security Certificate",
        "1 Month Support",
      ],
    },
    {
      name: "PRO PRESENCE",
      price: "$5,500",
      duration: "2-3 WEEKS",
      color: "purple-400",
      icon: <Zap className="w-6 h-6" />,
      popular: true,
      features: [
        "5-10 Page Website",
        "Custom Design System",
        "Advanced SEO & Analytics",
        "Content Management",
        "Performance Optimization",
        "Email Marketing Setup",
        "3 Months Support",
      ],
    },
    {
      name: "SMART BUSINESS",
      price: "$12,000",
      duration: "3-4 WEEKS + MAINTENANCE",
      color: "primary",
      icon: <Shield className="w-6 h-6" />,
      monthly: "+ $800/MONTH",
      features: [
        "Full Business Website",
        "E-commerce Capabilities",
        "Advanced Features",
        "Monthly Maintenance",
        "Performance Monitoring",
        "Priority Support",
        "Unlimited Updates",
      ],
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              SERVICE.<span className="text-primary animate-glow-pulse">PACKAGES</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Choose your quantum optimization level. All packages include mobile-responsive design, 
              security protocols, and performance enhancement.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`glass-card hover:animate-neural-pulse transition-all duration-300 relative overflow-hidden ${
                  pkg.popular ? "border-2 border-purple-400" : "border-primary/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-purple-400 text-black px-3 py-1 rounded text-sm font-cyber font-bold">
                    POPULAR
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-${pkg.color} to-primary rounded-lg flex items-center justify-center`}>
                    {pkg.icon}
                  </div>
                  <CardTitle className={`text-2xl font-cyber text-${pkg.color} mb-2`}>
                    {pkg.name}
                  </CardTitle>
                  <div className="text-4xl font-cyber white-highlight mb-2">{pkg.price}</div>
                  <div className="text-sm text-primary">{pkg.duration}</div>
                  {pkg.monthly && (
                    <div className="text-lg font-cyber text-purple-400 mt-2">{pkg.monthly}</div>
                  )}
                </CardHeader>

                <CardContent className="scan-line">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center white-highlight">
                        <Check className={`w-4 h-4 text-${pkg.color} mr-3 flex-shrink-0`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/reserve-slot">
                    <Button
                      className={`cyber-button-hover w-full py-3 rounded-lg font-cyber font-semibold bg-transparent border border-${pkg.color} text-white hover:bg-${pkg.color}/10`}
                    >
                      SELECT PACKAGE
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              DEVELOPMENT.<span className="text-yellow-400 animate-glow-pulse">PROCESS</span>
            </h2>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Streamlined workflow engineered for maximum efficiency and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "BRIEFING",
                description: "Project analysis and requirement gathering",
                color: "primary",
              },
              {
                step: "02",
                title: "DESIGN",
                description: "Custom interface and user experience design",
                color: "yellow-400",
              },
              {
                step: "03",
                title: "DEVELOPMENT",
                description: "Hand-coded implementation with optimization",
                color: "purple-400",
              },
              {
                step: "04",
                title: "DEPLOYMENT",
                description: "Launch and performance monitoring setup",
                color: "primary",
              },
            ].map((step, index) => (
              <Card key={index} className="glass-card border-primary/30 hover:animate-neural-pulse">
                <CardContent className="p-8 text-center">
                  <div className={`text-6xl font-cyber text-${step.color} mb-4 animate-glow-pulse`}>
                    {step.step}
                  </div>
                  <h3 className={`text-xl font-cyber text-${step.color} mb-4`}>{step.title}</h3>
                  <p className="white-highlight text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              NEURAL.<span className="text-primary animate-glow-pulse">FAQ</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does development take?",
                answer: "LaunchPad: 1-2 weeks, Pro Presence: 2-3 weeks, Smart Business: 3-4 weeks. All timelines include regular communication and updates.",
              },
              {
                question: "Do you use templates?",
                answer: "Never. Every website is hand-coded from scratch, optimized for your specific business needs and target audience.",
              },
              {
                question: "What's included in maintenance?",
                answer: "Security updates, performance monitoring, content updates, backup management, and priority support for any issues.",
              },
              {
                question: "Can I upgrade my package later?",
                answer: "Absolutely. You can upgrade at any time during development or after launch. We'll apply the cost difference.",
              },
            ].map((faq, index) => (
              <Card key={index} className="glass-card border-primary/30">
                <CardContent className="p-8">
                  <h3 className="text-xl font-cyber text-primary mb-4">{faq.question}</h3>
                  <p className="white-highlight">{faq.answer}</p>
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
              READY TO <span className="text-primary animate-glow-pulse">START</span>?
            </h2>
            <p className="text-xl white-highlight mb-8 max-w-2xl mx-auto">
              Reserve your development slot today. Only 2 spots remaining this month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reserve-slot">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
                  RESERVE SLOT
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10">
                  ASK QUESTIONS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
