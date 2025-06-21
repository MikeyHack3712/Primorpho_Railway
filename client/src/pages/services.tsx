import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Check, Rocket, Zap, Shield } from "lucide-react";
import { useLocation } from "wouter";
import Neural3D from "@/components/ui/neural-3d";


interface Package {
  id: string;
  name: string;
  basePrice: number;
  monthlyPrice?: number;
  duration: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: "launchpad",
    name: "LAUNCHPAD",
    basePrice: 2500,
    duration: "1-2 WEEKS",
    color: "yellow-400",
    icon: <Rocket className="w-8 h-8 text-yellow-400" />,
    description: "Perfect for getting your business online quickly with professional presence.",
    features: [
      "3-5 Page Website",
      "Mobile Responsive Design", 
      "Basic SEO Optimization",
      "Contact Form Integration",
      "Social Media Links",
      "Google Analytics Setup",
      "1 Month Free Support"
    ]
  },
  {
    id: "pro-presence",
    name: "PRO PRESENCE", 
    basePrice: 5500,
    duration: "2-3 WEEKS",
    color: "purple-400",
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    description: "Comprehensive solution for established businesses seeking premium digital presence.",
    features: [
      "8-12 Page Website",
      "Custom Design System",
      "Advanced SEO Package",
      "Blog/News Section",
      "Lead Generation Forms",
      "Performance Optimization",
      "Social Media Integration",
      "3 Months Free Support"
    ],
    popular: true
  },
  {
    id: "smart-business",
    name: "SMART BUSINESS",
    basePrice: 12000,
    monthlyPrice: 800,
    duration: "3-4 WEEKS + ONGOING",
    color: "cyan-400", 
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    description: "Enterprise-level solution with AI integration and ongoing optimization.",
    features: [
      "Unlimited Pages",
      "Custom Web Application",
      "AI-Powered Features",
      "Advanced Database Design",
      "API Development",
      "Third-party Integrations",
      "Performance Monitoring",
      "Ongoing Optimization",
      "Priority Support"
    ]
  }
];

export default function Services() {
  const [, setLocation] = useLocation();

  const handlePackageSelect = (packageId: string) => {
    setLocation(`/customize-package?package=${packageId}`);
  };

  return (
    <div className="min-h-screen bg-background neural-bg relative">
      <Neural3D />
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 page-title">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">SERVICE</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">PACKAGES</span>
          </h1>
          <p className="text-xl text-readable mb-8 max-w-3xl mx-auto">
            Choose the perfect package for your digital transformation. Each solution is designed to deliver measurable results and accelerate your business growth.
          </p>
        </div>
      </section>

      {/* Package Selection */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-cyber text-purple-400 mb-4 text-subheading">
              CHOOSE YOUR TRANSFORMATION
            </h2>
            <p className="text-readable">Click on any package to customize it with powerful add-ons</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`glass-card cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-${pkg.color} ${pkg.popular ? 'ring-2 ring-purple-400' : ''}`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-cyan-400 text-black px-6 py-2 font-cyber tracking-wider">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="mb-6">{pkg.icon}</div>
                  <h3 className={`text-2xl font-bold font-cyber text-${pkg.color} mb-4 tracking-wider`}>
                    {pkg.name}
                  </h3>
                  <div className="mb-6">
                    <div className={`text-4xl font-bold font-cyber text-${pkg.color} mb-2`}>
                      ${pkg.basePrice.toLocaleString()}
                    </div>
                    {pkg.monthlyPrice && (
                      <div className="text-lg text-gray-400 font-cyber mb-1">
                        + ${pkg.monthlyPrice}/month
                      </div>
                    )}
                    <div className="text-sm text-gray-500 font-cyber tracking-wider">
                      {pkg.duration}
                    </div>
                  </div>
                  <p className="text-readable mb-8">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-readable text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full cyber-button bg-${pkg.color}/20 border-${pkg.color} text-${pkg.color} hover:bg-${pkg.color}/30 font-cyber py-3`}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    CUSTOMIZE PACKAGE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold font-cyber text-cyan-400 mb-4 text-subheading">
                NEED SOMETHING CUSTOM?
              </h3>
              <p className="text-readable mb-6">
                Every business is unique. If none of our packages fit your exact needs, 
                let's discuss a custom solution tailored specifically for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="cyber-button bg-purple-400/20 border-purple-400 text-purple-400 hover:bg-purple-400/30 font-cyber px-8 py-3"
                  asChild
                >
                  <Link href="/contact">
                    REQUEST CUSTOM QUOTE
                  </Link>
                </Button>
                <Button 
                  className="cyber-button bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-8 py-3"
                  asChild
                >
                  <Link href="/book-consultation">
                    BOOK CONSULTATION
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}