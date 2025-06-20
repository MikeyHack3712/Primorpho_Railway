import { ArrowRight, CheckCircle, Clock, Shield, Star, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HomeConservative() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Professional Web Development Services
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your 
              <span className="text-blue-600"> Digital Presence</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              From concept to launch, we deliver professional websites that drive results. 
              Modern design, robust functionality, and exceptional performance guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/services">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Start Your Project
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Track Record</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-gray-600 font-medium">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600 font-medium">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24h</div>
                <div className="text-gray-600 font-medium">Average Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">5★</div>
                <div className="text-gray-600 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive web development solutions designed to elevate your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Development</h3>
              <p className="text-gray-600 mb-4">
                Tailored solutions built with modern technologies to meet your specific business requirements.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm text-gray-500 mt-2 block">95% Success Rate</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Optimization</h3>
              <p className="text-gray-600 mb-4">
                Lightning-fast loading speeds and optimized user experiences across all devices.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-sm text-gray-500 mt-2 block">90% Performance Improvement</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">SEO & Marketing</h3>
              <p className="text-gray-600 mb-4">
                Search engine optimization and digital marketing integration for maximum visibility.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
              <span className="text-sm text-gray-500 mt-2 block">88% Ranking Improvement</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Responsive</h3>
              <p className="text-gray-600 mb-4">
                Perfect functionality and beautiful design across desktop, tablet, and mobile devices.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <span className="text-sm text-gray-500 mt-2 block">98% Cross-Device Compatibility</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security & Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Enterprise-grade security measures and ongoing maintenance to keep your site protected.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-sm text-gray-500 mt-2 block">92% Security Score</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">User Experience</h3>
              <p className="text-gray-600 mb-4">
                Intuitive interfaces and seamless interactions that convert visitors into customers.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <span className="text-sm text-gray-500 mt-2 block">94% User Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your project and create something exceptional together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white px-8 py-4 text-lg font-semibold">
                Get Started Today
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