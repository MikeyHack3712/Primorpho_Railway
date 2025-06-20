import { ArrowRight, Check, Clock, DollarSign, Star, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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

export default function ServicesConservative() {
  const packages: Package[] = [
    {
      id: "launchpad",
      name: "LaunchPad",
      basePrice: 2500,
      duration: "2-3 weeks",
      color: "blue",
      icon: <Star className="w-6 h-6" />,
      description: "Perfect for small businesses and startups looking to establish their digital presence with a professional website.",
      features: [
        "5-page responsive website",
        "Mobile-optimized design",
        "Basic SEO setup",
        "Contact form integration",
        "Google Analytics setup",
        "3 months support included",
        "SSL certificate & hosting setup"
      ]
    },
    {
      id: "pro-presence",
      name: "Pro Presence",
      basePrice: 5500,
      duration: "4-6 weeks",
      color: "green",
      icon: <Users className="w-6 h-6" />,
      description: "Comprehensive solution for growing businesses that need advanced features and professional polish.",
      features: [
        "10-page custom website",
        "Advanced responsive design",
        "Complete SEO optimization",
        "CMS integration",
        "E-commerce capability",
        "Performance optimization",
        "6 months support included",
        "Training & documentation"
      ],
      popular: true
    },
    {
      id: "smart-business",
      name: "Smart Business",
      basePrice: 12000,
      monthlyPrice: 800,
      duration: "6-8 weeks",
      color: "purple",
      icon: <DollarSign className="w-6 h-6" />,
      description: "Enterprise-level solution with ongoing support for businesses requiring continuous digital growth.",
      features: [
        "Unlimited pages & sections",
        "Custom web application",
        "Advanced integrations",
        "Marketing automation",
        "Analytics & reporting",
        "Priority support",
        "Monthly updates & optimization",
        "Dedicated account manager"
      ]
    }
  ];

  const getColorClasses = (color: string, isPopular?: boolean) => {
    const colors = {
      blue: {
        border: "border-blue-200",
        bg: "bg-blue-50",
        text: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      green: {
        border: "border-green-200",
        bg: "bg-green-50", 
        text: "text-green-600",
        button: "bg-green-600 hover:bg-green-700"
      },
      purple: {
        border: "border-purple-200",
        bg: "bg-purple-50",
        text: "text-purple-600", 
        button: "bg-purple-600 hover:bg-purple-700"
      }
    };
    
    if (isPopular) {
      return {
        border: "border-orange-300 ring-2 ring-orange-100",
        bg: "bg-orange-50",
        text: "text-orange-600",
        button: "bg-orange-600 hover:bg-orange-700"
      };
    }
    
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      {/* Header Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            Professional Web Development Services
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect Package
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            From startup launches to enterprise solutions, our packages are designed to meet 
            your specific business needs and budget requirements.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const colorClasses = getColorClasses(pkg.color, pkg.popular);
              
              return (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-xl p-8 border-2 ${colorClasses.border} shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-6`}>
                    <div className={colorClasses.text}>
                      {pkg.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">
                        ${pkg.basePrice.toLocaleString()}
                      </span>
                      {pkg.monthlyPrice && (
                        <span className="ml-2 text-lg text-gray-600">
                          + ${pkg.monthlyPrice}/mo
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/customize-package?package=${pkg.id}`}>
                    <Button 
                      className={`w-full py-3 text-white font-semibold transition-colors ${colorClasses.button}`}
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Customize Package
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures quality results and keeps you informed every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discovery</h3>
              <p className="text-gray-600">
                We start by understanding your business goals, target audience, and technical requirements through detailed consultation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600">
                Detailed project planning, wireframes, and technical architecture design to ensure smooth development.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Development</h3>
              <p className="text-gray-600">
                Agile development with regular updates and previews, ensuring you're involved throughout the process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Launch</h3>
              <p className="text-gray-600">
                Thorough testing, training, and smooth deployment with ongoing support to ensure your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All packages include our essential features with additional capabilities as you scale up
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-200">
              <div className="font-semibold text-gray-900">Features</div>
              <div className="text-center font-semibold text-blue-600">LaunchPad</div>
              <div className="text-center font-semibold text-green-600">Pro Presence</div>
              <div className="text-center font-semibold text-purple-600">Smart Business</div>
            </div>

            {[
              { feature: "Responsive Design", launchpad: true, pro: true, smart: true },
              { feature: "SEO Optimization", launchpad: "Basic", pro: "Advanced", smart: "Enterprise" },
              { feature: "Content Management", launchpad: false, pro: true, smart: true },
              { feature: "E-commerce Ready", launchpad: false, pro: true, smart: true },
              { feature: "Custom Integrations", launchpad: false, pro: "Limited", smart: "Unlimited" },
              { feature: "Performance Monitoring", launchpad: false, pro: false, smart: true },
              { feature: "Monthly Updates", launchpad: false, pro: false, smart: true },
              { feature: "Priority Support", launchpad: false, pro: false, smart: true }
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-6 border-b border-slate-100 last:border-b-0">
                <div className="font-medium text-gray-900">{row.feature}</div>
                <div className="text-center">
                  {typeof row.launchpad === 'boolean' ? (
                    row.launchpad ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : "—"
                  ) : (
                    <span className="text-blue-600">{row.launchpad}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof row.pro === 'boolean' ? (
                    row.pro ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : "—"
                  ) : (
                    <span className="text-green-600">{row.pro}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof row.smart === 'boolean' ? (
                    row.smart ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : "—"
                  ) : (
                    <span className="text-purple-600">{row.smart}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Not Sure Which Package is Right?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule a free consultation and we'll help you choose the perfect solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white px-8 py-4 text-lg font-semibold">
                Free Consultation
              </Button>
            </Link>
            <Link href="/tools">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-500 px-8 py-4 text-lg font-semibold">
                Free Website Audit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}