import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Check, ArrowRight, Star, Zap, Shield, Rocket, Code, Globe, Cpu, Database } from "lucide-react";

export default function Services() {
  const packages = [
    {
      name: "LAUNCHPAD",
      price: "$2,500",
      duration: "1-2 WEEKS",
      color: "yellow-400",
      icon: <Rocket className="w-8 h-8" />,
      description: "Perfect for getting your business online quickly with a professional presence.",
      features: [
        "3-5 Page Website",
        "Mobile Responsive Design",
        "Basic SEO Optimization",
        "Contact Form Integration",
        "SSL Security Certificate",
        "1 Month Support",
        "Performance Optimization",
        "Social Media Integration"
      ],
      glow: "glow-accent"
    },
    {
      name: "PRO PRESENCE",
      price: "$5,500",
      duration: "2-3 WEEKS",
      color: "purple-400",
      icon: <Zap className="w-8 h-8" />,
      popular: true,
      description: "Comprehensive solution for businesses ready to make a serious impact online.",
      features: [
        "5-10 Page Website",
        "Custom Design System",
        "Advanced SEO & Analytics",
        "Content Management System",
        "Performance Optimization",
        "Email Marketing Setup",
        "E-commerce Ready",
        "3 Months Support & Updates"
      ],
      glow: "glow-secondary"
    },
    {
      name: "SMART BUSINESS",
      price: "$12,000",
      duration: "3-4 WEEKS + MAINTENANCE",
      color: "cyan-400",
      icon: <Shield className="w-8 h-8" />,
      monthly: "+ $800/MONTH",
      description: "Complete digital transformation with ongoing optimization and growth support.",
      features: [
        "Full Business Website",
        "E-commerce Capabilities",
        "Advanced Analytics Dashboard",
        "Marketing Automation",
        "A/B Testing & Optimization",
        "Priority Support & Maintenance",
        "Monthly Strategy Reviews",
        "Ongoing Updates & Enhancements"
      ],
      glow: "glow-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background neural-bg">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 relative grid-bg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="font-cyber text-sm text-cyan-400 tracking-wider">NEURAL WEB SOLUTIONS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-cyber">
            <span className="text-glow-primary">CUSTOM WEBSITES</span>
            <br />
            <span className="text-glow-accent">BUILT FOR IMPACT</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            No templates. No fluff. Just sleek, powerful websites coded to <span className="text-cyan-400">grow your business</span>.
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
                className={`glass-card p-6 ${pkg.glow} ${pkg.popular ? 'ring-2 ring-purple-500 pulse-glow' : ''} hover:scale-105 transition-all duration-300`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white font-cyber pulse-glow">
                    MOST POPULAR
                  </Badge>
                )}
                
                <CardHeader className="pb-4 text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`text-${pkg.color}`}>
                      {pkg.icon}
                    </div>
                  </div>
                  <CardTitle className={`text-2xl font-bold font-cyber text-${pkg.color}`}>{pkg.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className={`text-4xl font-bold font-cyber text-${pkg.color}`}>{pkg.price}</span>
                    </div>
                    {pkg.monthly && (
                      <div className="text-sm text-gray-400 font-cyber">{pkg.monthly}</div>
                    )}
                    <p className="text-xs text-gray-500 font-cyber">{pkg.duration}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-gray-300 text-center">{pkg.description}</p>
                  
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 text-${pkg.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full cyber-button font-cyber ${pkg.popular ? 'glow-secondary bg-purple-500/20 border-purple-500 text-purple-400' : `${pkg.glow} bg-${pkg.color}/20 border-${pkg.color} text-${pkg.color}`}`}
                    asChild
                  >
                    <Link href="/contact">
                      GET STARTED
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-cyber">
              <span className="text-glow-secondary">OUR PROCESS</span>
            </h2>
            <p className="text-gray-300">
              From concept to launch, we handle everything so you can focus on your <span className="text-cyan-400">business</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "DISCOVERY",
                description: "We learn about your business, goals, and target audience.",
                icon: <Database className="w-6 h-6 text-cyan-400" />,
                color: "cyan-400"
              },
              {
                step: "02",
                title: "DESIGN",
                description: "Custom designs that reflect your brand and convert visitors.",
                icon: <Code className="w-6 h-6 text-purple-400" />,
                color: "purple-400"
              },
              {
                step: "03",
                title: "DEVELOPMENT",
                description: "Clean, efficient code that's fast, secure, and scalable.",
                icon: <Cpu className="w-6 h-6 text-yellow-400" />,
                color: "yellow-400"
              },
              {
                step: "04",
                title: "LAUNCH",
                description: "Go live with ongoing support and optimization.",
                icon: <Globe className="w-6 h-6 text-cyan-400" />,
                color: "cyan-400"
              }
            ].map((process, index) => (
              <div key={index} className="text-center glass-card p-6 hover:scale-105 transition-transform">
                <div className={`w-12 h-12 rounded-full bg-${process.color}/20 border border-${process.color} flex items-center justify-center font-bold text-lg mb-4 mx-auto font-cyber text-${process.color}`}>
                  {process.step}
                </div>
                <div className="flex justify-center mb-3">
                  {process.icon}
                </div>
                <h3 className={`font-semibold mb-2 font-cyber text-${process.color}`}>{process.title}</h3>
                <p className="text-sm text-gray-300">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-cyber">
              <span className="text-glow-primary">ADVANCED FEATURES</span>
            </h2>
            <p className="text-gray-300">
              Cutting-edge technology for <span className="text-cyan-400">maximum impact</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "LIGHTNING FAST", description: "Optimized for speed and performance", color: "cyan-400" },
              { title: "MOBILE FIRST", description: "Perfect on every device", color: "purple-400" },
              { title: "SEO OPTIMIZED", description: "Built to rank higher", color: "yellow-400" },
              { title: "SECURE BY DEFAULT", description: "Enterprise-grade security", color: "cyan-400" },
              { title: "SCALABLE ARCHITECTURE", description: "Grows with your business", color: "purple-400" },
              { title: "24/7 MONITORING", description: "Always online, always fast", color: "yellow-400" }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-4 text-center hover:scale-105 transition-transform">
                <h3 className={`font-cyber text-${feature.color} mb-2`}>{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-yellow-500/10"></div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 font-cyber">
            <span className="text-glow-primary">READY TO GET STARTED?</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Let's discuss your project and find the perfect <span className="text-cyan-400">solution</span> for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="cyber-button glow-primary bg-cyan-400/20 border-cyan-400 text-cyan-400 font-cyber" asChild>
              <Link href="/contact">START YOUR PROJECT</Link>
            </Button>
            <Button size="lg" className="cyber-button glow-secondary bg-purple-500/20 border-purple-500 text-purple-400 font-cyber" asChild>
              <Link href="/portfolio">VIEW OUR WORK</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}