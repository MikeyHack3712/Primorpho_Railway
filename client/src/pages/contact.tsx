import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";
import { Mail, Phone, Clock, Shield, Zap, ArrowRight } from "lucide-react";
import Neural3D from "@/components/ui/neural-3d";


type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isAuditRequest, setIsAuditRequest] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      phone: "",
      package: "",
      details: "",
      websiteUrl: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Transmission Successful!",
        description: data.message,
        className: "glass-card border-primary/30 text-white",
      });
      form.reset();
      setIsAuditRequest(false);
    },
    onError: (error) => {
      toast({
        title: "Transmission Failed",
        description: error.message || "Failed to submit contact form. Please try again.",
        variant: "destructive",
        className: "glass-card border-red-500/30 text-white",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background neural-bg relative">
      <Neural3D intensity="subtle" />
      {/* Header Section */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">

          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight page-title">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">GET IN</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">TOUCH</span>
          </h1>
          
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-6 md:p-8 mb-12 md:mb-16">
            <p className="text-lg md:text-xl text-readable leading-relaxed">
              Ready to upgrade your <span className="text-cyan-300 font-semibold">website</span>?
            </p>
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="pb-6 md:pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm bg-gray-900/30 border border-cyan-300/20 rounded-lg p-4 md:p-6 mb-6 md:mb-12">
            <div className="text-center">
              <Badge className="mb-3 md:mb-4 bg-cyan-300/20 text-cyan-300 border-cyan-300/50 text-sm md:text-lg px-3 md:px-4 py-1 md:py-2">
                PREMIUM PARTNERSHIP
              </Badge>
              <h2 className="text-cyan-300 text-xl md:text-2xl tracking-wide mb-4 md:mb-6 text-subheading">
                STRATEGIC DEVELOPMENT FOR <span className="text-yellow-300">GROWTH-FOCUSED</span> BUSINESSES
              </h2>
              <p className="text-readable mb-4 md:mb-6 text-sm md:text-base">
                Dedicated expertise for leaders who value measurable results and competitive advantage.
              </p>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-cyan-300 mb-1">24H</div>
                  <div className="text-xs md:text-sm text-readable">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-yellow-300 mb-1">7</div>
                  <div className="text-xs md:text-sm text-readable">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-purple-300 mb-1">100%</div>
                  <div className="text-xs md:text-sm text-readable">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="backdrop-blur-sm bg-gray-900/30 border border-cyan-300/20 rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-cyan-300 text-2xl tracking-wide mb-4 text-subheading">
                  PROJECT BRIEFING
                </h2>
                <p className="text-readable text-sm">
                  Provide your project details for accurate neural analysis and pricing.
                </p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm text-readable mb-2 block">
                      NAME *
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Your Name"
                      className="bg-gray-900/50 border-gray-600/50 text-white focus:border-cyan-300/50"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm text-readable mb-2 block">
                      EMAIL *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="your@email.com"
                      className="bg-gray-900/50 border-gray-600/50 text-white focus:border-cyan-300/50"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="business" className="text-sm text-readable mb-2 block">
                      BUSINESS NAME
                    </Label>
                    <Input
                      id="business"
                      {...form.register("business")}
                      placeholder="Your Business"
                      className="bg-gray-900/50 border-gray-600/50 text-white focus:border-cyan-300/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm text-readable mb-2 block">
                      PHONE
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register("phone")}
                      placeholder="+1 (555) 123-4567"
                      className="bg-gray-900/50 border-gray-600/50 text-white focus:border-cyan-300/50"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="package" className="text-sm text-readable mb-2 block">
                    PROJECT TYPE
                  </Label>
                  <Select onValueChange={(value) => form.setValue("package", value)}>
                    <SelectTrigger className="bg-gray-900/50 border-gray-600/50 text-white focus:border-cyan-300/50">
                      <SelectValue placeholder="Select Package" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/90 border-gray-600/50">
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
                    <Label htmlFor="websiteUrl" className="text-sm text-readable mb-2 block">
                      WEBSITE URL *
                    </Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      {...form.register("websiteUrl")}
                      placeholder="https://your-website.com"
                      className="bg-gray-900/50 border-gray-600/50 text-white focus:border-cyan-300/50"
                      onChange={() => setIsAuditRequest(true)}
                    />
                    {form.formState.errors.websiteUrl && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.websiteUrl.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="details" className="text-sm text-readable mb-2 block">
                    PROJECT DETAILS
                  </Label>
                  <Textarea
                    id="details"
                    {...form.register("details")}
                    rows={4}
                    placeholder="Describe your project requirements, goals, and any specific features you need..."
                    className="bg-gray-900/50 border-gray-600/50 text-white focus:border-cyan-300/50"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full py-4 rounded-lg font-semibold text-lg bg-cyan-400/20 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/30 transition-all duration-300"
                >
                  {contactMutation.isPending ? (
                    "TRANSMITTING..."
                  ) : isAuditRequest ? (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      REQUEST PRIORITY AUDIT
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5 mr-2" />
                      TRANSMIT PROJECT DATA
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-gray-900/30 border border-purple-300/20 rounded-lg p-8">
                <h3 className="text-purple-300 text-2xl tracking-wide mb-6 text-subheading">DIRECT CHANNEL</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-cyan-300 mr-4" />
                    <span className="text-readable">hello@primorpho.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-yellow-300 mr-4" />
                    <a href="tel:+15551234567" className="text-readable hover:text-cyan-300 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-purple-300 mr-4" />
                    <span className="text-readable">24H Response Guaranteed</span>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-gray-900/30 border border-cyan-300/20 rounded-lg p-8">
                <h3 className="text-cyan-300 text-2xl tracking-wide mb-6 text-subheading">STRATEGIC METRICS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-readable">Average ROI Increase</span>
                    <span className="text-green-300 font-semibold">247%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-readable">Project Success Rate</span>
                    <span className="text-cyan-300 font-semibold">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-readable">Client Retention</span>
                    <span className="text-purple-300 font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-readable">Response Time</span>
                    <span className="text-yellow-300 font-semibold">&lt; 4H</span>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-gray-900/30 border border-cyan-300/20 rounded-lg p-8">
                <h3 className="text-cyan-300 text-2xl tracking-wide mb-6 text-subheading">SECURITY NOTICE</h3>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-cyan-300 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-readable text-sm">
                    All communications encrypted with military-grade protocols. 
                    Project data stored in secure neural vaults with 256-bit encryption.
                  </p>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-gray-900/30 border border-purple-300/20 rounded-lg p-8">
                <h3 className="text-purple-300 text-2xl tracking-wide mb-6 text-subheading">NEXT STEPS</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-cyan-300/20 border border-cyan-300 flex items-center justify-center mr-3 text-xs text-cyan-300 font-semibold">1</div>
                    <span className="text-readable">Submit your project briefing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-yellow-300/20 border border-yellow-300 flex items-center justify-center mr-3 text-xs text-yellow-300 font-semibold">2</div>
                    <span className="text-readable">Receive detailed project analysis within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-300/20 border border-purple-300 flex items-center justify-center mr-3 text-xs text-purple-300 font-semibold">3</div>
                    <span className="text-readable">Schedule consultation call to discuss requirements</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-cyan-300/20 border border-cyan-300 flex items-center justify-center mr-3 text-xs text-cyan-300 font-semibold">4</div>
                    <span className="text-readable">Begin neural-enhanced development</span>
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
