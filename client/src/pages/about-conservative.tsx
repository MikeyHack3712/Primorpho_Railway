import { Award, BookOpen, Code, Lightbulb, Target, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AboutConservative() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      {/* Header Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <Users className="w-4 h-4 mr-2" />
            Professional Web Development
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Building Digital Excellence
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            With over a decade of experience in web development, we combine technical expertise 
            with strategic thinking to deliver websites that drive real business results.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe every business deserves a professional digital presence that reflects 
                their values and drives growth. Our mission is to bridge the gap between complex 
                technology and simple, effective solutions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By focusing on performance, security, and user experience, we ensure your website 
                becomes a powerful tool for business success rather than just an online brochure.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Values</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Results-Driven</h4>
                    <p className="text-gray-600">Every decision is made with your business goals in mind</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Technical Excellence</h4>
                    <p className="text-gray-600">Clean, maintainable code built with modern best practices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Innovation</h4>
                    <p className="text-gray-600">Staying ahead of trends to keep your business competitive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive web development services covering every aspect of your digital presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Full-Stack Development</h3>
              <p className="text-gray-600 mb-4">
                Modern web applications built with React, Node.js, and cloud technologies for scalability and performance.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• React & TypeScript</li>
                <li>• Node.js & Express</li>
                <li>• PostgreSQL & MongoDB</li>
                <li>• AWS & Cloud Deployment</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Optimization</h3>
              <p className="text-gray-600 mb-4">
                Speed optimization and Core Web Vitals improvement to enhance user experience and search rankings.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Page Speed Optimization</li>
                <li>• Core Web Vitals</li>
                <li>• Image & Asset Optimization</li>
                <li>• Caching Strategies</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">SEO & Digital Marketing</h3>
              <p className="text-gray-600 mb-4">
                Search engine optimization and digital marketing integration to maximize your online visibility.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Technical SEO</li>
                <li>• Analytics Integration</li>
                <li>• Conversion Optimization</li>
                <li>• Schema Markup</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">User Experience Design</h3>
              <p className="text-gray-600 mb-4">
                Intuitive interfaces and user-centered design that converts visitors into customers.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• UI/UX Design</li>
                <li>• Responsive Design</li>
                <li>• Accessibility (WCAG)</li>
                <li>• User Testing</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security & Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Enterprise-grade security measures and ongoing maintenance to protect your digital assets.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• SSL Certificates</li>
                <li>• Security Audits</li>
                <li>• Regular Updates</li>
                <li>• Backup Solutions</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Consulting & Strategy</h3>
              <p className="text-gray-600 mb-4">
                Strategic guidance and technical consulting to align your digital presence with business objectives.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Digital Strategy</li>
                <li>• Technology Planning</li>
                <li>• Performance Audits</li>
                <li>• Growth Optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience & Results</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proven track record of delivering successful projects across various industries
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600 font-medium">Projects Delivered</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-gray-600 font-medium">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's explore how we can help transform your digital presence and drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white px-8 py-4 text-lg font-semibold">
                Start a Conversation
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-500 px-8 py-4 text-lg font-semibold">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}