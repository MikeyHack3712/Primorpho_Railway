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
      const response = await apiRequest("POST", "/api/reserve-slot", data);
      return response.json();
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
      <div className="pt-16 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 rounded-xl scan-line">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              SLOT <span className="text-primary animate-glow-pulse">RESERVED</span>
            </h1>
            <p className="text-xl white-highlight mb-8 max-w-2xl mx-auto">
              Your development slot has been successfully reserved. We'll contact you within 24 hours 
              to confirm details and begin the quantum-enhanced development process.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-cyber text-primary mb-2">CONFIRMATION</h3>
                <p className="white-highlight text-sm">Check your email for detailed confirmation and next steps.</p>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-cyber text-yellow-400 mb-2">TIMELINE</h3>
                <p className="white-highlight text-sm">Project kickoff within 48 hours of slot confirmation.</p>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-cyber text-purple-400 mb-2">CONTACT</h3>
                <p className="white-highlight text-sm">Direct line: +1 (555) 123-4567 for urgent matters.</p>
              </div>
            </div>
            <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
              RETURN TO HOME
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              RESERVE.<span className="text-primary animate-glow-pulse">SLOT</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Secure your quantum-enhanced development slot. Limited availability - only 2 spots remaining this month.
            </p>
          </div>
        </div>
      </section>

      {/* Urgency Alert */}
      <section className="py-8 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-6 rounded-xl border-2 border-yellow-400/50 scan-line">
            <div className="flex items-center justify-center gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <div className="text-center">
                <Badge className="mb-2 bg-yellow-400/20 text-yellow-400 border-yellow-400/50">
                  HIGH DEMAND ALERT
                </Badge>
                <p className="white-highlight font-cyber">
                  <span className="text-yellow-400 font-bold">2 SLOTS REMAINING</span> - Reserve now to secure January/February development window
                </p>
              </div>
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 relative">
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
            <h2 className="text-2xl font-cyber white-highlight mb-2">
              {currentStep === 1 && "CONTACT INFORMATION"}
              {currentStep === 2 && "PROJECT SELECTION"}  
              {currentStep === 3 && "PROJECT DETAILS"}
            </h2>
            <p className="white-highlight text-sm">
              Step {currentStep} of 3 - Quantum slot reservation protocol
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-card border-primary/30">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-cyber white-highlight mb-2 block">
                          FULL NAME *
                        </Label>
                        <Input
                          id="name"
                          {...form.register("name")}
                          placeholder="Your Full Name"
                          className="bg-transparent border-primary/30 text-white"
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-cyber white-highlight mb-2 block">
                          EMAIL ADDRESS *
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
                          BUSINESS/ORGANIZATION
                        </Label>
                        <Input
                          id="business"
                          {...form.register("business")}
                          placeholder="Your Business Name"
                          className="bg-transparent border-primary/30 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-cyber white-highlight mb-2 block">
                          PHONE NUMBER
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
                  </div>
                )}

                {/* Step 2: Project Selection */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="package" className="text-sm font-cyber white-highlight mb-2 block">
                        SELECT PACKAGE *
                      </Label>
                      <Select onValueChange={(value) => form.setValue("package", value)}>
                        <SelectTrigger className="bg-transparent border-primary/30 text-white">
                          <SelectValue placeholder="Choose your quantum enhancement level" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-primary/30">
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
                      <Label htmlFor="preferredSlot" className="text-sm font-cyber white-highlight mb-2 block">
                        PREFERRED DEVELOPMENT SLOT *
                      </Label>
                      <Select onValueChange={(value) => form.setValue("preferredSlot", value)}>
                        <SelectTrigger className="bg-transparent border-primary/30 text-white">
                          <SelectValue placeholder="Select your preferred timeline" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-primary/30">
                          {availableSlots.map((slot) => (
                            <SelectItem 
                              key={slot.id} 
                              value={slot.id}
                              disabled={!slot.available}
                              className={!slot.available ? "opacity-50" : ""}
                            >
                              {slot.label} {!slot.available && "(FULLY BOOKED)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.preferredSlot && (
                        <p className="text-red-400 text-xs mt-1">{form.formState.errors.preferredSlot.message}</p>
                      )}
                    </div>

                    <div className="glass-card p-6 rounded-xl border-yellow-400/30">
                      <h3 className="text-lg font-cyber text-yellow-400 mb-4">SLOT AVAILABILITY</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {availableSlots.map((slot) => (
                          <div key={slot.id} className="flex items-center justify-between">
                            <span className="white-highlight text-sm">{slot.label}</span>
                            <Badge className={slot.available 
                              ? "bg-primary/20 text-primary border-primary/30" 
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                            }>
                              {slot.available ? "AVAILABLE" : "BOOKED"}
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
                      <Label htmlFor="projectDetails" className="text-sm font-cyber white-highlight mb-2 block">
                        PROJECT DETAILS *
                      </Label>
                      <Textarea
                        id="projectDetails"
                        {...form.register("projectDetails")}
                        rows={6}
                        placeholder="Describe your project goals, target audience, required features, design preferences, and any specific requirements..."
                        className="bg-transparent border-primary/30 text-white"
                      />
                      {form.formState.errors.projectDetails && (
                        <p className="text-red-400 text-xs mt-1">{form.formState.errors.projectDetails.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="budget" className="text-sm font-cyber white-highlight mb-2 block">
                          TOTAL BUDGET RANGE
                        </Label>
                        <Select onValueChange={(value) => form.setValue("budget", value)}>
                          <SelectTrigger className="bg-transparent border-primary/30 text-white">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent className="glass-card border-primary/30">
                            <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                            <SelectItem value="20000+">$20,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline" className="text-sm font-cyber white-highlight mb-2 block">
                          LAUNCH URGENCY
                        </Label>
                        <Select onValueChange={(value) => form.setValue("timeline", value)}>
                          <SelectTrigger className="bg-transparent border-primary/30 text-white">
                            <SelectValue placeholder="Select timeline urgency" />
                          </SelectTrigger>
                          <SelectContent className="glass-card border-primary/30">
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
                      className="cyber-button-hover px-8 py-3 rounded-lg font-cyber font-semibold bg-transparent border border-gray-600 text-white hover:bg-gray-600/10"
                    >
                      PREVIOUS
                    </Button>
                  )}
                  
                  <div className="flex-1" />
                  
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="cyber-button-hover px-8 py-3 rounded-lg font-cyber font-semibold bg-transparent border border-primary text-white hover:bg-primary/10"
                    >
                      NEXT STEP
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={reservationMutation.isPending}
                      className="cyber-button-hover px-8 py-3 rounded-lg font-cyber font-semibold bg-transparent border border-primary text-white hover:bg-primary/10"
                    >
                      {reservationMutation.isPending ? (
                        "RESERVING SLOT..."
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          RESERVE SLOT
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
