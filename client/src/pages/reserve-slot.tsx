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
import { slotReservationFormSchema } from "@shared/schema";
import { z } from "zod";
import { Calendar, CheckCircle, Clock, Zap, ArrowRight, AlertTriangle } from "lucide-react";
import Neural3D from "@/components/ui/neural-3d";

type SlotReservationData = z.infer<typeof slotReservationFormSchema>;

export default function ReserveSlot() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<SlotReservationData>({
    resolver: zodResolver(slotReservationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      phone: "",
      package: "",
      preferredSlot: "",
      projectDetails: "",
      budget: "",
      timeline: "",
    },
  });

  const reservationMutation = useMutation({
    mutationFn: async (data: SlotReservationData) => {
      const response = await fetch("/api/reserve-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to reserve slot");
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Slot Reserved Successfully!",
        description: data.message,
        className: "glass-card border-primary/30 text-white",
      });
      setCurrentStep(4);
    },
    onError: (error) => {
      toast({
        title: "Reservation Failed",
        description: error.message || "Failed to reserve slot. Please try again.",
        variant: "destructive",
        className: "glass-card border-red-500/30 text-white",
      });
    },
  });

  const onSubmit = (data: SlotReservationData) => {
    reservationMutation.mutate(data);
  };

  const nextStep = () => {
    const currentFields = getCurrentStepFields();
    form.trigger(currentFields).then((isValid) => {
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
    });
  };

  const getCurrentStepFields = () => {
    switch (currentStep) {
      case 1:
        return ["name", "email", "business", "phone"] as const;
      case 2:
        return ["package", "preferredSlot"] as const;
      case 3:
        return ["projectDetails", "budget", "timeline"] as const;
      default:
        return [] as const;
    }
  };

  const availableSlots = [
    { id: "jan-early", label: "January Early (Jan 1-15)", available: false },
    { id: "jan-mid", label: "January Mid (Jan 16-31)", available: true },
    { id: "feb-early", label: "February Early (Feb 1-15)", available: true },
    { id: "feb-mid", label: "February Mid (Feb 16-28)", available: true },
    { id: "mar-early", label: "March Early (Mar 1-15)", available: true },
    { id: "mar-mid", label: "March Mid (Mar 16-31)", available: true },
  ];

  if (currentStep === 4) {
    return (
      <div className="pt-16 min-h-screen flex items-center relative">
        <Neural3D intensity="subtle" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-12">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent">
              SLOT BOOKED
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your project slot has been successfully reserved. We'll contact you within 24 hours 
              to confirm details and begin your website development.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-6">
                <h3 className="text-lg text-cyan-400 mb-2">CONFIRMATION</h3>
                <p className="text-gray-300 text-sm">Check your email for detailed confirmation and next steps.</p>
              </div>
              <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-6">
                <h3 className="text-lg text-yellow-400 mb-2">TIMELINE</h3>
                <p className="text-gray-300 text-sm">Project kickoff within 48 hours of slot confirmation.</p>
              </div>
              <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-6">
                <h3 className="text-lg text-purple-400 mb-2">CONTACT</h3>
                <p className="text-gray-300 text-sm">We'll call you using the number you provided.</p>
              </div>
            </div>
            <Button 
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white transition-colors"
              onClick={() => window.location.href = '/home'}
            >
              RETURN TO HOME
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 relative">
      <Neural3D intensity="subtle" />
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent animate-pulse">
              BOOK PROJECT SLOT
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Strategic project planning and development partnership for businesses seeking premium digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-8 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-sm bg-gray-900/50 border border-cyan-400/50 rounded-lg p-6">
            <div className="flex items-center justify-center gap-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <div className="text-center">
                <Badge className="mb-2 bg-cyan-400/20 text-cyan-400 border-cyan-400/50">
                  STRATEGIC PARTNERSHIP
                </Badge>
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-bold">PREMIUM DEVELOPMENT</span> - Tailored solutions for business growth
                </p>
              </div>
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-cyber font-bold border-2 transition-all duration-300 ${
                  currentStep >= step 
                    ? "bg-primary/20 border-primary text-primary" 
                    : "border-gray-600 text-gray-400"
                }`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                    currentStep > step ? "bg-primary" : "bg-gray-600"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-cyber text-gray-300 mb-2">
              {currentStep === 1 && "CONTACT INFORMATION"}
              {currentStep === 2 && "PROJECT SELECTION"}  
              {currentStep === 3 && "PROJECT DETAILS"}
            </h2>
            <p className="text-gray-400 text-sm">
              Step {currentStep} of 3 - Project booking process
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm text-gray-300 mb-2 block">
                          FULL NAME *
                        </Label>
                        <Input
                          id="name"
                          {...form.register("name")}
                          placeholder="Your Full Name"
                          className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400"
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm text-gray-300 mb-2 block">
                          EMAIL ADDRESS *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          placeholder="your@email.com"
                          className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400"
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="business" className="text-sm text-gray-300 mb-2 block">
                          BUSINESS/ORGANIZATION
                        </Label>
                        <Input
                          id="business"
                          {...form.register("business")}
                          placeholder="Your Business Name"
                          className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm text-gray-300 mb-2 block">
                          PHONE NUMBER
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...form.register("phone")}
                          placeholder="+1 (555) 123-4567"
                          className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Project Selection */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="package" className="text-sm text-gray-300 mb-2 block">
                        SELECT PACKAGE *
                      </Label>
                      <Select onValueChange={(value) => form.setValue("package", value)}>
                        <SelectTrigger className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400">
                          <SelectValue placeholder="Choose your package" />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-sm bg-gray-900/90 border border-gray-600/50">
                          <SelectItem value="launchpad">LaunchPad - $2,500 (1-2 weeks)</SelectItem>
                          <SelectItem value="pro-presence">Pro Presence - $5,500 (2-3 weeks)</SelectItem>
                          <SelectItem value="smart-business">Smart Business - $12,000 + $800/month (3-4 weeks)</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.package && (
                        <p className="text-red-400 text-xs mt-1">{form.formState.errors.package.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="preferredSlot" className="text-sm text-gray-300 mb-2 block">
                        PREFERRED DEVELOPMENT SLOT *
                      </Label>
                      <Select onValueChange={(value) => form.setValue("preferredSlot", value)}>
                        <SelectTrigger className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400">
                          <SelectValue placeholder="Select your preferred timeline" />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-sm bg-gray-900/90 border border-gray-600/50">
                          {availableSlots.map((slot) => (
                            <SelectItem 
                              key={slot.id} 
                              value={slot.id}
                              disabled={!slot.available}
                              className={!slot.available ? "opacity-50" : ""}
                            >
                              {slot.label} {!slot.available && "(RESERVED)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.preferredSlot && (
                        <p className="text-red-400 text-xs mt-1">{form.formState.errors.preferredSlot.message}</p>
                      )}
                    </div>

                    <div className="backdrop-blur-sm bg-gray-900/50 border border-cyan-400/30 rounded-lg p-6">
                      <h3 className="text-lg text-cyan-400 mb-4">DEVELOPMENT SCHEDULING</h3>
                      <p className="text-gray-300 text-sm mb-4">Choose your preferred project timeline based on your strategic objectives and launch goals.</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {availableSlots.map((slot) => (
                          <div key={slot.id} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{slot.label}</span>
                            <Badge className={slot.available 
                              ? "bg-cyan-400/20 text-cyan-400 border-cyan-400/30" 
                              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }>
                              {slot.available ? "OPEN" : "RESERVED"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Project Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="projectDetails" className="text-sm text-gray-300 mb-2 block">
                        PROJECT DETAILS *
                      </Label>
                      <Textarea
                        id="projectDetails"
                        {...form.register("projectDetails")}
                        rows={6}
                        placeholder="Describe your project goals, target audience, required features, design preferences, and any specific requirements..."
                        className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400"
                      />
                      {form.formState.errors.projectDetails && (
                        <p className="text-red-400 text-xs mt-1">{form.formState.errors.projectDetails.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="budget" className="text-sm text-gray-300 mb-2 block">
                          TOTAL BUDGET RANGE
                        </Label>
                        <Select onValueChange={(value) => form.setValue("budget", value)}>
                          <SelectTrigger className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-sm bg-gray-900/90 border border-gray-600/50">
                            <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                            <SelectItem value="20000+">$20,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline" className="text-sm text-gray-300 mb-2 block">
                          LAUNCH URGENCY
                        </Label>
                        <Select onValueChange={(value) => form.setValue("timeline", value)}>
                          <SelectTrigger className="bg-transparent border-gray-600/50 text-white focus:border-cyan-400">
                            <SelectValue placeholder="Select timeline urgency" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-sm bg-gray-900/90 border border-gray-600/50">
                            <SelectItem value="flexible">Flexible Timeline</SelectItem>
                            <SelectItem value="moderate">Moderate Urgency</SelectItem>
                            <SelectItem value="urgent">High Priority</SelectItem>
                            <SelectItem value="critical">Critical/Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-8 py-3 rounded-lg bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-600/10 hover:text-white transition-colors"
                    >
                      PREVIOUS
                    </Button>
                  )}
                  
                  <div className="flex-1" />
                  
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 rounded-lg bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:text-white transition-colors"
                    >
                      NEXT STEP
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={reservationMutation.isPending}
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white transition-colors"
                    >
                      {reservationMutation.isPending ? (
                        "BOOKING SLOT..."
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          BOOK SLOT
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
