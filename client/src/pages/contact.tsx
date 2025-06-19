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
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
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
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              INITIATE.<span className="text-primary animate-glow-pulse">CONTACT</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Ready to quantum-enhance your digital presence? Let's build something extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl border-2 border-yellow-400/50 scan-line">
            <div className="text-center">
              <Badge className="mb-4 bg-yellow-400/20 text-yellow-400 border-yellow-400/50 text-lg px-4 py-2">
                ⚡ LIMITED AVAILABILITY ⚡
              </Badge>
              <h2 className="text-2xl md:text-3xl font-cyber font-bold mb-4 white-highlight">
                ONLY <span className="text-yellow-400 animate-glow-pulse">2 SLOTS</span> REMAINING THIS MONTH
              </h2>
              <p className="white-highlight mb-6">
                High demand for quantum-enhanced development. Secure your project slot before they're gone.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-cyber text-primary mb-1">24H</div>
                  <div className="text-sm white-highlight">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-cyber text-yellow-400 mb-1">7</div>
                  <div className="text-sm white-highlight">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-cyber text-purple-400 mb-1">100%</div>
                  <div className="text-sm white-highlight">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-8 rounded-xl">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-cyber text-yellow-400">
                  PROJECT BRIEFING
                </CardTitle>
                <p className="white-highlight text-sm">
                  Provide your project details for accurate quantum analysis and pricing.
                </p>
              </CardHeader>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-cyber white-highlight mb-2 block">
                      NAME *
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Your Name"
                      className="bg-transparent border-primary/30 text-white"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-cyber white-highlight mb-2 block">
                      EMAIL *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="your@email.com"
                      className="bg-transparent border-primary/30 text-white"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="business" className="text-sm font-cyber white-highlight mb-2 block">
                      BUSINESS NAME
                    </Label>
                    <Input
                      id="business"
                      {...form.register("business")}
                      placeholder="Your Business"
                      className="bg-transparent border-primary/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-cyber white-highlight mb-2 block">
                      PHONE
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register("phone")}
                      placeholder="+1 (555) 123-4567"
                      className="bg-transparent border-primary/30 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="package" className="text-sm font-cyber white-highlight mb-2 block">
                    PROJECT TYPE
                  </Label>
                  <Select onValueChange={(value) => form.setValue("package", value)}>
                    <SelectTrigger className="bg-transparent border-primary/30 text-white">
                      <SelectValue placeholder="Select Package" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-primary/30">
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
                    <Label htmlFor="websiteUrl" className="text-sm font-cyber white-highlight mb-2 block">
                      WEBSITE URL *
                    </Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      {...form.register("websiteUrl")}
                      placeholder="https://your-website.com"
                      className="bg-transparent border-primary/30 text-white"
                      onChange={() => setIsAuditRequest(true)}
                    />
                    {form.formState.errors.websiteUrl && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.websiteUrl.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="details" className="text-sm font-cyber white-highlight mb-2 block">
                    PROJECT DETAILS
                  </Label>
                  <Textarea
                    id="details"
                    {...form.register("details")}
                    rows={4}
                    placeholder="Describe your project requirements, goals, and any specific features you need..."
                    className="bg-transparent border-primary/30 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="cyber-button-hover w-full py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10"
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
              <Card className="glass-card border-primary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-cyber text-purple-400 mb-4">DIRECT CHANNEL</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary mr-4" />
                      <span className="white-highlight">hello@primorpho.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-yellow-400 mr-4" />
                      <a href="tel:+15551234567" className="white-highlight hover:text-primary">
                        +1 (555) 123-4567
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-purple-400 mr-4" />
                      <span className="white-highlight">24H Response Guaranteed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-yellow-400/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-cyber text-yellow-400 mb-4">QUANTUM STATUS</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="white-highlight">Available Slots</span>
                      <span className="text-primary font-cyber">02</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="white-highlight">Response Time</span>
                      <span className="text-yellow-400 font-cyber">&lt; 24H</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="white-highlight">Next Available</span>
                      <span className="text-purple-400 font-cyber">IMMEDIATE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="white-highlight">Success Rate</span>
                      <span className="text-primary font-cyber">100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-cyber text-primary mb-4">SECURITY NOTICE</h3>
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <p className="white-highlight text-sm">
                      All communications encrypted with military-grade protocols. 
                      Project data stored in secure quantum vaults with 256-bit encryption.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-purple-400/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-cyber text-purple-400 mb-4">NEXT STEPS</h3>
                  <div className="space-y-3 text-sm white-highlight">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center mr-3 text-xs text-primary font-cyber">1</div>
                      <span>Submit your project briefing</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center mr-3 text-xs text-yellow-400 font-cyber">2</div>
                      <span>Receive detailed project analysis within 24 hours</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400 flex items-center justify-center mr-3 text-xs text-purple-400 font-cyber">3</div>
                      <span>Schedule consultation call to discuss requirements</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center mr-3 text-xs text-primary font-cyber">4</div>
                      <span>Begin quantum-enhanced development</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
