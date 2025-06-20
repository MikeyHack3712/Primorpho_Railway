import { ArrowRight, BarChart, Clock, ExternalLink, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PortfolioConservative() {
  const projects = [
    {
      id: 1,
      title: "TechFlow Solutions",
      category: "SaaS Platform",
      description: "Complete redesign and development of a B2B workflow automation platform serving over 5,000 users.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=800&q=80",
      results: {
        performance: "+85% page speed",
        conversion: "+125% user signups",
        engagement: "+67% session duration"
      },
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      timeline: "8 weeks",
      package: "Smart Business"
    },
    {
      id: 2,
      title: "Meridian Healthcare",
      category: "Healthcare Website",
      description: "Professional medical practice website with patient portal integration and appointment scheduling.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&w=800&q=80",
      results: {
        performance: "+92% mobile performance",
        conversion: "+156% appointment bookings",
        engagement: "+45% patient portal usage"
      },
      technologies: ["React", "TypeScript", "Stripe", "HIPAA Compliant"],
      timeline: "6 weeks",
      package: "Pro Presence"
    },
    {
      id: 3,
      title: "Artisan Coffee Co.",
      category: "E-commerce Store",
      description: "Custom e-commerce solution for specialty coffee retailer with subscription management and inventory tracking.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&w=800&q=80",
      results: {
        performance: "+78% site speed",
        conversion: "+203% online sales",
        engagement: "+89% return customers"
      },
      technologies: ["React", "Shopify", "Analytics", "Email Marketing"],
      timeline: "5 weeks",
      package: "Pro Presence"
    },
    {
      id: 4,
      title: "Summit Legal Group",
      category: "Professional Services",
      description: "Professional law firm website with case study showcase and client intake automation.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&w=800&q=80",
      results: {
        performance: "+95% lighthouse score",
        conversion: "+134% consultation requests",
        engagement: "+76% case study views"
      },
      technologies: ["React", "CMS", "Forms", "SEO"],
      timeline: "4 weeks",
      package: "Pro Presence"
    },
    {
      id: 5,
      title: "GreenTech Innovations",
      category: "Startup Launch",
      description: "Launch website for renewable energy startup with investor presentation and product showcase.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&w=800&q=80",
      results: {
        performance: "+88% performance score",
        conversion: "+167% investor inquiries",
        engagement: "+92% demo requests"
      },
      technologies: ["React", "Animation", "SEO", "Analytics"],
      timeline: "3 weeks",
      package: "LaunchPad"
    },
    {
      id: 6,
      title: "Metropolitan Bank",
      category: "Financial Services",
      description: "Enterprise banking website with advanced security, online banking integration, and compliance features.",
      image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?ixlib=rb-4.0.3&w=800&q=80",
      results: {
        performance: "+91% security score",
        conversion: "+145% account openings",
        engagement: "+83% mobile usage"
      },
      technologies: ["React", "Security", "API Integration", "Compliance"],
      timeline: "10 weeks",
      package: "Smart Business"
    }
  ];

  const getPackageColor = (packageName: string) => {
    switch (packageName) {
      case "LaunchPad": return "text-blue-600 bg-blue-100";
      case "Pro Presence": return "text-green-600 bg-green-100";
      case "Smart Business": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      {/* Header Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <BarChart className="w-4 h-4 mr-2" />
            Client Success Stories
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Portfolio of Success
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses across various industries 
            achieve their digital goals with measurable results.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500 font-medium">{project.category}</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.timeline}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600 mb-1">
                        {project.results.performance}
                      </div>
                      <div className="text-xs text-gray-500">Performance</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600 mb-1">
                        {project.results.conversion}
                      </div>
                      <div className="text-xs text-gray-500">Conversions</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600 mb-1">
                        {project.results.engagement}
                      </div>
                      <div className="text-xs text-gray-500">Engagement</div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-2">Technologies Used:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Package Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPackageColor(project.package)}`}>
                      {project.package}
                    </span>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our data-driven approach consistently delivers measurable improvements for our clients
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">150%</div>
              <div className="text-gray-600 font-medium">Average Conversion Increase</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
              <div className="text-gray-600 font-medium">Performance Improvement</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction Rate</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-gray-600 font-medium">Average Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from the businesses we've helped transform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm">
              <div className="text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 mb-6 italic">
                "The team delivered exactly what we needed. Our new website has increased our lead 
                generation by over 200% and the performance is outstanding."
              </p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-500">CEO, TechFlow Solutions</div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm">
              <div className="text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 mb-6 italic">
                "Professional, efficient, and results-driven. They understood our healthcare 
                compliance needs and delivered a solution that exceeded expectations."
              </p>
              <div className="font-semibold text-gray-900">Dr. Michael Chen</div>
              <div className="text-sm text-gray-500">Medical Director, Meridian Healthcare</div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm">
              <div className="text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 mb-6 italic">
                "Our online sales have tripled since the new website launched. The e-commerce 
                integration is seamless and our customers love the user experience."
              </p>
              <div className="font-semibold text-gray-900">Emma Rodriguez</div>
              <div className="text-sm text-gray-500">Owner, Artisan Coffee Co.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how we can help your business achieve similar results with a custom web solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white px-8 py-4 text-lg font-semibold">
                <ArrowRight className="w-5 h-5 mr-2" />
                Start Your Project
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-500 px-8 py-4 text-lg font-semibold">
                View Our Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}