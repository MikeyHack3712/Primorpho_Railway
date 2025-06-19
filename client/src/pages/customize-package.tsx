import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowLeft, Check, Rocket, Zap, Shield, Clock, Star, Globe, Search, Code, Database, Palette, Users, ShoppingCart, Mail, Phone, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

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

export default function CustomizePackage() {
  const [location] = useLocation();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Get package from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = urlParams.get('package');
  const selectedPackage = packages.find(p => p.id === packageId);
  


  // Show loading state if package not found
  if (!packageId || !selectedPackage) {
    return <div className="min-h-screen bg-background neural-bg flex items-center justify-center">
      <div className="text-center">
        <div className="text-cyan-400 font-cyber text-xl mb-4">PACKAGE NOT FOUND</div>
        <div className="text-gray-400 mb-4">The selected package could not be loaded</div>
        <Button 
          className="cyber-button bg-purple-400/20 border-purple-400 text-purple-400 hover:bg-purple-400/30 font-cyber px-6 py-3"
          asChild
        >
          <Link href="/services">
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO SERVICES
          </Link>
        </Button>
      </div>
    </div>;
  }

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = allAddOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    
    return selectedPackage.basePrice + addOnTotal;
  };

  const getAvailableAddOns = () => {
    return allAddOns.filter(addOn => selectedPackage.availableAddOns.includes(addOn.id));
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
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button 
              className="cyber-button bg-gray-600/20 border-gray-600 text-gray-400 hover:bg-gray-600/30 font-cyber px-6 py-3"
              asChild
            >
              <Link href="/services">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO PACKAGES
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 font-cyber text-cyan-400">
              CUSTOMIZE YOUR PACKAGE
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Configure your selected package with powerful add-ons
            </p>
          </div>
        </div>
      </section>

      {/* Package Overview */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="glass-card mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    {selectedPackage.icon}
                  </div>
                  <div>
                    <h2 className={`text-3xl font-bold font-cyber text-${selectedPackage.color} mb-2`}>
                      {selectedPackage.name}
                    </h2>
                    <p className="text-gray-300 mb-4">{selectedPackage.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPackage.features.map((feature, index) => (
                        <Badge key={index} className="bg-gray-800/50 text-gray-300 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold font-cyber text-${selectedPackage.color} mb-2`}>
                    ${selectedPackage.basePrice.toLocaleString()}
                  </div>
                  {selectedPackage.monthlyPrice && (
                    <div className="text-lg text-gray-400 font-cyber mb-1">
                      + ${selectedPackage.monthlyPrice}/month
                    </div>
                  )}
                  <div className="text-sm text-gray-500 font-cyber">
                    {selectedPackage.duration}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content: Add-ons and Calculator */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add-ons Selection - Left Side */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6">
                <h3 className="text-2xl font-bold font-cyber text-purple-400 mb-6 text-center">
                  AVAILABLE ADD-ONS
                </h3>
                
                {Object.entries(groupedAddOns).map(([category, addOns]) => (
                  <div key={category} className="mb-8">
                    <h4 className="text-lg font-cyber text-purple-400 mb-4 tracking-wider flex items-center">
                      <div className="w-1 h-6 bg-purple-400 mr-3"></div>
                      {category.toUpperCase()} ADD-ONS
                    </h4>
                    <div className="space-y-3">
                      {addOns.map((addOn) => (
                        <div 
                          key={addOn.id}
                          className={`p-4 rounded border cursor-pointer transition-all duration-300 ${
                            selectedAddOns.includes(addOn.id)
                              ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                              : 'border-gray-700 bg-gray-800/20 hover:border-gray-600 hover:bg-gray-700/20'
                          }`}
                          onClick={() => handleAddOnToggle(addOn.id)}
                        >
                          <div className="flex items-start space-x-4">
                            <Checkbox 
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={() => handleAddOnToggle(addOn.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  {addOn.icon}
                                  <span className="font-cyber text-sm text-cyan-400 font-semibold">
                                    {addOn.name}
                                  </span>
                                </div>
                                <span className="font-cyber text-lg text-yellow-400 font-bold">
                                  +${addOn.price}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 leading-relaxed">{addOn.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Calculator - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="glass-card p-6 border-cyan-400/30">
                  <h3 className="text-xl font-cyber text-cyan-400 mb-6 text-center">
                    PRICE CALCULATOR
                  </h3>
                  
                  {/* Selected Package Display */}
                  <div className="mb-6 p-4 bg-gray-800/30 rounded border border-gray-700">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-1">SELECTED PACKAGE</div>
                      <div className="font-cyber text-lg text-cyan-400 mb-2">
                        {selectedPackage.name}
                      </div>
                      <div className="text-2xl font-bold font-cyber text-white">
                        ${selectedPackage.basePrice.toLocaleString()}
                      </div>
                      {selectedPackage.monthlyPrice && (
                        <div className="text-sm text-gray-400 mt-1">
                          + ${selectedPackage.monthlyPrice}/month
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selected Add-ons */}
                  <div className="mb-6">
                    <div className="text-sm font-cyber text-purple-400 mb-3 tracking-wider">
                      SELECTED ADD-ONS ({selectedAddOns.length})
                    </div>
                    {selectedAddOns.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No add-ons selected
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedAddOns.map((addOnId) => {
                          const addOn = allAddOns.find(a => a.id === addOnId);
                          if (!addOn) return null;
                          return (
                            <div key={addOnId} className="flex items-center justify-between py-2 px-3 bg-gray-800/20 rounded">
                              <div className="flex items-center space-x-2">
                                {addOn.icon}
                                <span className="text-xs text-gray-300">{addOn.name}</span>
                              </div>
                              <span className="text-xs font-cyber text-yellow-400">
                                +${addOn.price}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border-t border-gray-700 pt-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Base Package:</span>
                        <span className="text-white font-cyber">
                          ${selectedPackage.basePrice.toLocaleString()}
                        </span>
                      </div>
                      {selectedAddOns.length > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Add-ons:</span>
                          <span className="text-yellow-400 font-cyber">
                            +${selectedAddOns.reduce((total, addOnId) => {
                              const addOn = allAddOns.find(a => a.id === addOnId);
                              return total + (addOn?.price || 0);
                            }, 0).toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-gray-600 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-cyber text-cyan-400">TOTAL:</span>
                          <span className="text-3xl font-bold font-cyber text-cyan-400">
                            ${calculateTotal().toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {selectedPackage.monthlyPrice && (
                        <div className="text-center text-sm text-gray-400 mt-2">
                          + ${selectedPackage.monthlyPrice}/month ongoing
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      className="w-full cyber-button bg-cyan-400/20 border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 font-cyber py-3"
                      asChild
                    >
                      <Link href="/reserve-slot">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        RESERVE SLOT
                      </Link>
                    </Button>
                    <Button 
                      className="w-full cyber-button bg-purple-400/20 border-purple-400 text-purple-400 hover:bg-purple-400/30 font-cyber py-3"
                      asChild
                    >
                      <Link href="/contact">
                        CUSTOM QUOTE
                      </Link>
                    </Button>
                    <Button 
                      className="w-full cyber-button bg-gray-600/20 border-gray-600 text-gray-400 hover:bg-gray-600/30 font-cyber py-2 text-sm"
                      asChild
                    >
                      <Link href="/services">
                        CHANGE PACKAGE
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}