import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Clock, Mail, Phone, Shield, Zap } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { contactFormSchema } from "@shared/schema";
import type { z } from "zod";

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactConservative() {
  const [isAuditRequest, setIsAuditRequest] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      phone: "",
      package: "",
      details: "",
      websiteUrl: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData & { isAuditRequest?: boolean }) => {
      return await apiRequest("/api/contact", "POST", data);
    },
    onSuccess: () => {
      form.reset();
      setIsAuditRequest(false);
    },
    onError: (error) => {
      console.error("Contact form error:", error);
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate({
      ...data,
      isAuditRequest: isAuditRequest || data.package === "audit"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      {/* Header Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <Mail className="w-4 h-4 mr-2" />
            Professional Web Development Services
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Let's Start Your Project
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Ready to transform your digital presence? Get in touch with our team to discuss your project 
            requirements and receive a custom proposal tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Information</h2>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        {...form.register("name")}
                        placeholder="Your Name"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="your@email.com"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="business" className="text-sm font-medium text-gray-700 mb-2 block">
                        Business Name
                      </Label>
                      <Input
                        id="business"
                        {...form.register("business")}
                        placeholder="Your Business"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        placeholder="+1 (555) 123-4567"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="package" className="text-sm font-medium text-gray-700 mb-2 block">
                      Service Package
                    </Label>
                    <Select onValueChange={(value) => form.setValue("package", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="launchpad">LaunchPad - $2,500</SelectItem>
                        <SelectItem value="pro-presence">Pro Presence - $5,500</SelectItem>
                        <SelectItem value="smart-business">Smart Business - $12,000</SelectItem>
                        <SelectItem value="custom">Custom Quote</SelectItem>
                        <SelectItem value="audit">Website Audit Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(form.watch("package") === "audit" || isAuditRequest) && (
                    <div>
                      <Label htmlFor="websiteUrl" className="text-sm font-medium text-gray-700 mb-2 block">
                        Website URL *
                      </Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        {...form.register("websiteUrl")}
                        placeholder="https://your-website.com"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        onChange={() => setIsAuditRequest(true)}
                      />
                      {form.formState.errors.websiteUrl && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.websiteUrl.message}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="details" className="text-sm font-medium text-gray-700 mb-2 block">
                      Project Details
                    </Label>
                    <Textarea
                      id="details"
                      {...form.register("details")}
                      rows={4}
                      placeholder="Tell us about your project goals, requirements, timeline, and any specific features you need..."
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
                  >
                    {contactMutation.isPending ? (
                      "Sending..."
                    ) : isAuditRequest ? (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Request Priority Audit
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5 mr-2" />
                        Send Project Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-4" />
                    <span className="text-gray-700">hello@primorpho.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-green-600 mr-4" />
                    <a href="tel:+15551234567" className="text-gray-700 hover:text-blue-600 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-orange-600 mr-4" />
                    <span className="text-gray-700">24H Response Guaranteed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average ROI Increase</span>
                    <span className="text-green-600 font-semibold">247%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project Success Rate</span>
                    <span className="text-blue-600 font-semibold">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Client Retention</span>
                    <span className="text-purple-600 font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="text-green-600 font-semibold">&lt; 4H</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Security & Privacy</h3>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">
                    All communications are encrypted and secure. Your project information 
                    is protected with enterprise-grade security measures and strict confidentiality agreements.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Process Overview</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center mr-3 text-xs text-blue-600 font-semibold">1</div>
                    <span className="text-gray-600">Submit your project requirements</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 border border-green-300 flex items-center justify-center mr-3 text-xs text-green-600 font-semibold">2</div>
                    <span className="text-gray-600">Receive detailed analysis within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center mr-3 text-xs text-orange-600 font-semibold">3</div>
                    <span className="text-gray-600">Schedule consultation to discuss details</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center mr-3 text-xs text-purple-600 font-semibold">4</div>
                    <span className="text-gray-600">Begin professional development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Common questions about our services and process
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What information do you need to get started?</h3>
              <p className="text-gray-600">
                We need basic information about your business, project goals, target audience, and any specific 
                requirements or features you'd like included. The more details you provide, the better we can 
                tailor our proposal to your needs.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How long does a typical project take?</h3>
              <p className="text-gray-600">
                Project timelines vary based on complexity and package selection. LaunchPad projects typically 
                take 2-3 weeks, Pro Presence 4-6 weeks, and Smart Business solutions 6-8 weeks. We'll provide 
                a detailed timeline during our initial consultation.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Do you provide ongoing support after launch?</h3>
              <p className="text-gray-600">
                Yes, all packages include initial support periods (3-6 months depending on package). For Smart 
                Business clients, ongoing monthly support and optimization is included. Additional support 
                packages are available for all clients.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can you work with my existing brand guidelines?</h3>
              <p className="text-gray-600">
                Absolutely. We can work with your existing brand assets, style guides, and design requirements 
                to ensure your website aligns perfectly with your brand identity. Just share your brand materials 
                during the initial consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join over 150 satisfied clients who have transformed their digital presence with our professional web development services.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white px-8 py-4 text-lg font-semibold">
            Schedule Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}