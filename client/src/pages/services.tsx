import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { ArrowRight, Check, Rocket, Zap, Shield, Clock, Star, Globe, Search, Code, Database, Palette, Users, ShoppingCart, Mail, Phone, BarChart3 } from "lucide-react";
import { useState } from "react";

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ReactNode;
  category: string;
}

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
  availableAddOns: string[];
}

const allAddOns: AddOn[] = [
  // Design & Branding
  { id: "logo", name: "Custom Logo Design", price: 350, description: "Professional logo with 3 concepts", icon: <Palette className="w-4 h-4" />, category: "Design" },
  { id: "branding", name: "Brand Identity Kit", price: 750, description: "Complete brand guidelines and assets", icon: <Star className="w-4 h-4" />, category: "Design" },
  { id: "ui-upgrade", name: "Premium UI Components", price: 500, description: "Advanced animations and interactions", icon: <Code className="w-4 h-4" />, category: "Design" },
  
  // Content & SEO
  { id: "copywriting", name: "Professional Copywriting", price: 450, description: "SEO-optimized content for all pages", icon: <Search className="w-4 h-4" />, category: "Content" },
  { id: "seo-premium", name: "Advanced SEO Package", price: 650, description: "Technical SEO + keyword research", icon: <BarChart3 className="w-4 h-4" />, category: "SEO" },
  { id: "blog-setup", name: "Blog System Setup", price: 400, description: "CMS integration with 5 starter posts", icon: <Globe className="w-4 h-4" />, category: "Content" },
  
  // Functionality
  { id: "contact-forms", name: "Advanced Contact Forms", price: 300, description: "Multi-step forms with validation", icon: <Mail className="w-4 h-4" />, category: "Features" },
  { id: "booking-system", name: "Appointment Booking", price: 800, description: "Calendar integration and scheduling", icon: <Clock className="w-4 h-4" />, category: "Features" },
  { id: "user-accounts", name: "User Account System", price: 950, description: "Registration, login, and profiles", icon: <Users className="w-4 h-4" />, category: "Features" },
  { id: "ecommerce", name: "E-commerce Integration", price: 1200, description: "Shopping cart and payment processing", icon: <ShoppingCart className="w-4 h-4" />, category: "Features" },
  
  // Technical
  { id: "database", name: "Custom Database", price: 600, description: "Tailored data management system", icon: <Database className="w-4 h-4" />, category: "Technical" },
  { id: "api-integration", name: "Third-party API Integration", price: 700, description: "Connect external services", icon: <Code className="w-4 h-4" />, category: "Technical" },
  { id: "analytics", name: "Advanced Analytics Setup", price: 250, description: "Detailed tracking and reporting", icon: <BarChart3 className="w-4 h-4" />, category: "Technical" },
  
  // Support & Maintenance
  { id: "priority-support", name: "Priority Support (3 months)", price: 400, description: "24/7 priority assistance", icon: <Phone className="w-4 h-4" />, category: "Support" },
  { id: "training", name: "Team Training Session", price: 350, description: "2-hour comprehensive training", icon: <Users className="w-4 h-4" />, category: "Support" },
];

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
    ],
    availableAddOns: ["logo", "copywriting", "contact-forms", "analytics", "priority-support", "training"]
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
    popular: true,
    availableAddOns: ["logo", "branding", "ui-upgrade", "copywriting", "seo-premium", "blog-setup", "booking-system", "user-accounts", "database", "api-integration", "analytics", "priority-support", "training"]
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
    ],
    availableAddOns: ["logo", "branding", "ui-upgrade", "copywriting", "seo-premium", "blog-setup", "booking-system", "user-accounts", "ecommerce", "database", "api-integration", "analytics", "priority-support", "training"]
  }
];

export default function Services() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setSelectedAddOns([]);
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    if (!pkg) return 0;
    
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = allAddOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    
    return pkg.basePrice + addOnTotal;
  };

  const getAvailableAddOns = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    if (!pkg) return [];
    
    return allAddOns.filter(addOn => pkg.availableAddOns.includes(addOn.id));
  };

  const groupedAddOns = getAvailableAddOns().reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <div className="min-h-screen bg-background neural-bg">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 font-cyber text-cyan-400">
            PREMIUM PACKAGES
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose your transformation level and customize with powerful add-ons.
          </p>
          
          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              className="cyber-button bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-6 py-3"
            >
              VIEW PACKAGES
            </Button>
            <Button 
              onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })}
              className="cyber-button bg-purple-400/20 border-purple-400 text-purple-400 hover:bg-purple-400/30 font-cyber px-6 py-3"
            >
              COMPARE FEATURES
            </Button>
            {selectedPackage && (
              <Button 
                onClick={() => document.getElementById('addons')?.scrollIntoView({ behavior: 'smooth' })}
                className="cyber-button bg-yellow-400/20 border-yellow-400 text-yellow-400 hover:bg-yellow-400/30 font-cyber px-6 py-3"
              >
                CUSTOMIZE
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Package Selection */}
      <section id="packages" className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-cyber text-purple-400 mb-4">
              SELECT YOUR PACKAGE
            </h2>
            <p className="text-gray-300">Click on any package to see available customizations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`glass-card cursor-pointer transition-all duration-300 ${
                  selectedPackage === pkg.id ? 'ring-2 ring-' + pkg.color : ''
                } ${pkg.popular ? 'ring-2 ring-purple-400' : ''}`}
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
                  <p className="text-gray-300 mb-8">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400 mr-3" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full cyber-button ${
                      selectedPackage === pkg.id 
                        ? `bg-${pkg.color}/30 border-${pkg.color} text-${pkg.color}` 
                        : `bg-${pkg.color}/20 border-${pkg.color} text-${pkg.color}`
                    } font-cyber py-3 tracking-wider`}
                  >
                    {selectedPackage === pkg.id ? 'SELECTED' : 'SELECT PACKAGE'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Package Comparison Table */}
      <section id="comparison" className="py-16 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-cyber text-cyan-400 mb-4">
              COMPARE PACKAGES
            </h2>
            <p className="text-gray-300">Detailed feature comparison to help you choose</p>
          </div>
          
          <div className="glass-card p-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 font-cyber text-gray-300">FEATURES</th>
                  <th className="text-center py-4 px-4 font-cyber text-yellow-400">LAUNCHPAD</th>
                  <th className="text-center py-4 px-4 font-cyber text-purple-400">PRO PRESENCE</th>
                  <th className="text-center py-4 px-4 font-cyber text-cyan-400">SMART BUSINESS</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Pages Included</td>
                  <td className="text-center py-3 px-4">3-5</td>
                  <td className="text-center py-3 px-4">8-12</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Design Complexity</td>
                  <td className="text-center py-3 px-4">Template-based</td>
                  <td className="text-center py-3 px-4">Custom Design</td>
                  <td className="text-center py-3 px-4">Fully Custom</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">SEO Optimization</td>
                  <td className="text-center py-3 px-4">Basic</td>
                  <td className="text-center py-3 px-4">Advanced</td>
                  <td className="text-center py-3 px-4">Enterprise</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Content Management</td>
                  <td className="text-center py-3 px-4">Static</td>
                  <td className="text-center py-3 px-4">Blog/CMS</td>
                  <td className="text-center py-3 px-4">Full CMS</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Database Integration</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">Optional</td>
                  <td className="text-center py-3 px-4">Advanced</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">API Development</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">Basic</td>
                  <td className="text-center py-3 px-4">Custom APIs</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">AI Features</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">Included</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Support Duration</td>
                  <td className="text-center py-3 px-4">1 Month</td>
                  <td className="text-center py-3 px-4">3 Months</td>
                  <td className="text-center py-3 px-4">Ongoing</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Available Add-ons</td>
                  <td className="text-center py-3 px-4">6 Options</td>
                  <td className="text-center py-3 px-4">13 Options</td>
                  <td className="text-center py-3 px-4">15 Options</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-cyber">Best For</td>
                  <td className="text-center py-3 px-4 text-xs">Small businesses, startups</td>
                  <td className="text-center py-3 px-4 text-xs">Established businesses</td>
                  <td className="text-center py-3 px-4 text-xs">Enterprise, complex needs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons Selection */}
      {selectedPackage && (
        <section id="addons" className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-8 mb-8">
              <h2 className="text-3xl font-bold font-cyber text-cyan-400 mb-6 text-center">
                CUSTOMIZE YOUR PACKAGE
              </h2>
              <div className="text-center mb-8">
                <p className="text-gray-300 mb-4">
                  Selected: <span className="text-cyan-400 font-cyber">
                    {packages.find(p => p.id === selectedPackage)?.name}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  Choose add-ons to enhance your package. Prices update automatically.
                </p>
              </div>
              
              {Object.entries(groupedAddOns).map(([category, addOns]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-xl font-cyber text-purple-400 mb-4 tracking-wider">
                    {category.toUpperCase()} ADD-ONS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {addOns.map((addOn) => (
                      <div 
                        key={addOn.id}
                        className={`p-4 rounded border cursor-pointer transition-all duration-300 ${
                          selectedAddOns.includes(addOn.id)
                            ? 'border-cyan-400 bg-cyan-400/10'
                            : 'border-gray-700 bg-gray-800/20 hover:border-gray-600'
                        }`}
                        onClick={() => handleAddOnToggle(addOn.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            checked={selectedAddOns.includes(addOn.id)}
                            onChange={() => handleAddOnToggle(addOn.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {addOn.icon}
                              <span className="font-cyber text-sm text-cyan-400">
                                {addOn.name}
                              </span>
                              <span className="font-cyber text-sm text-yellow-400">
                                +${addOn.price}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">{addOn.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="glass-card p-8 text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-cyber text-cyan-400 mb-4">PACKAGE SUMMARY</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Base Package:</span>
                    <span className="text-white font-cyber">
                      ${packages.find(p => p.id === selectedPackage)?.basePrice.toLocaleString()}
                    </span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Add-ons ({selectedAddOns.length}):</span>
                      <span className="text-yellow-400 font-cyber">
                        +${selectedAddOns.reduce((total, addOnId) => {
                          const addOn = allAddOns.find(a => a.id === addOnId);
                          return total + (addOn?.price || 0);
                        }, 0).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-cyber text-cyan-400">TOTAL:</span>
                      <span className="text-3xl font-bold font-cyber text-cyan-400">
                        ${calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="cyber-button bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber px-12 py-6 text-lg"
                  asChild
                >
                  <Link href="/reserve-slot">
                    RESERVE YOUR SLOT
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="cyber-button bg-purple-400/20 border-purple-400 text-purple-400 hover:bg-purple-400/30 font-cyber px-12 py-6 text-lg"
                  asChild
                >
                  <Link href="/contact">
                    DISCUSS CUSTOM NEEDS
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      {!selectedPackage && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="glass-card p-12">
              <h2 className="text-4xl font-bold mb-6 font-cyber text-cyan-400">
                NEED SOMETHING CUSTOM?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Every business is unique. Let's discuss your specific requirements.
              </p>
              <Button 
                size="lg" 
                className="cyber-button bg-yellow-400/20 border-yellow-400 text-yellow-400 hover:bg-yellow-400/30 font-cyber px-12 py-6 text-lg"
                asChild
              >
                <Link href="/contact">
                  GET CUSTOM QUOTE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}