import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Neural3D from "@/components/ui/neural-3d";

export default function BookConsultation() {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [consultationType, setConsultationType] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    { id: "9am", label: "9:00 AM EST", available: true },
    { id: "10am", label: "10:00 AM EST", available: false },
    { id: "11am", label: "11:00 AM EST", available: true },
    { id: "2pm", label: "2:00 PM EST", available: true },
    { id: "3pm", label: "3:00 PM EST", available: true },
    { id: "4pm", label: "4:00 PM EST", available: false },
  ];

  const consultationTypes = [
    {
      id: "project-consultation",
      name: "PROJECT CONSULTATION",
      duration: "30 minutes",
      description: "Discuss your project requirements and get detailed technical analysis",
      color: "primary",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: "technical-review",
      name: "TECHNICAL REVIEW",
      duration: "45 minutes", 
      description: "In-depth technical discussion about architecture and implementation",
      color: "purple-400",
      icon: <Video className="w-5 h-5" />,
    },
    {
      id: "strategy-session",
      name: "STRATEGY SESSION",
      duration: "60 minutes",
      description: "Comprehensive business strategy and digital transformation planning",
      color: "yellow-400",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const handleBooking = async () => {
    if (!consultationType || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both a consultation type and time slot.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    
    try {
      const selectedConsultation = consultationTypes.find(t => t.id === consultationType);
      const selectedSlot = timeSlots.find(t => t.id === selectedTime);
      
      // Here you would typically make an API call to book the consultation
      // For now, we'll simulate a successful booking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Booking Confirmed!",
        description: `Your ${selectedConsultation?.name} for ${selectedSlot?.label} has been booked. You'll receive a confirmation email shortly.`,
      });
      
      // Reset the form
      setConsultationType("");
      setSelectedTime("");
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your consultation. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background neural-bg relative pt-16">
      <Neural3D intensity="subtle" />
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent">
              BOOK CONSULTATION
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Schedule a direct call with our development team. 
              Get expert insights and detailed project analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-8">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-yellow-400/20 text-yellow-400 border-yellow-400/30 text-lg px-4 py-2">
                ⚡ FREE CONSULTATION ⚡
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-300">
                GET EXPERT <span className="text-cyan-400">ANALYSIS</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-purple-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg text-cyan-400 mb-2">PROJECT ANALYSIS</h3>
                <p className="text-gray-300 text-sm">
                  Detailed assessment of your requirements and technical optimization opportunities
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-yellow-400 rounded-lg flex items-center justify-center">
                  <Video className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg text-purple-400 mb-2">TECHNICAL STRATEGY</h3>
                <p className="text-gray-300 text-sm">
                  Custom technology stack recommendations and performance optimization strategies
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-primary rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg text-yellow-400 mb-2">GROWTH ROADMAP</h3>
                <p className="text-gray-300 text-sm">
                  Comprehensive digital transformation plan with measurable milestones
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Interface */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Consultation Types */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-300">
                SELECT <span className="text-yellow-400">CONSULTATION TYPE</span>
              </h2>
              
              <div className="space-y-6">
                {consultationTypes.map((type) => (
                  <Card 
                    key={type.id}
                    className={`backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg cursor-pointer transition-all duration-300 hover:border-cyan-400/50 ${
                      consultationType === type.id 
                        ? `border-2 border-cyan-400` 
                        : "border-gray-700/50"
                    }`}
                    onClick={() => setConsultationType(type.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${type.color} to-primary rounded-lg flex items-center justify-center flex-shrink-0`}>
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg text-cyan-400">
                              {type.name}
                            </h3>
                            <Badge className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30">
                              {type.duration}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Calendar & Time Slots */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-300">
                AVAILABLE <span className="text-cyan-400">TIME SLOTS</span>
              </h2>

              {/* Calendar Widget */}
              <Card className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-cyan-400 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    TODAY - JUNE 22, 2025
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedTime(slot.id)}
                        disabled={!slot.available}
                        className={`p-4 rounded-lg transition-all duration-300 ${
                          selectedTime === slot.id
                            ? "bg-cyan-400/20 border-2 border-cyan-400 text-white"
                            : slot.available
                            ? "bg-transparent border border-gray-600/50 text-gray-300 hover:bg-cyan-400/10 hover:border-cyan-400/50"
                            : "bg-gray-600/20 border border-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg">{slot.label}</div>
                          <div className="text-xs">
                            {slot.available ? "AVAILABLE" : "BOOKED"}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alternative Contact Methods */}
              <Card className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg text-yellow-400 mb-4">ALTERNATIVE CONTACT</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-cyan-400 mr-3" />
                      <div>
                        <div className="text-gray-300 font-semibold">Direct Call</div>
                        <div className="text-sm text-gray-400">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-purple-400 mr-3" />
                      <div>
                        <div className="text-gray-300 font-semibold">Emergency Session</div>
                        <div className="text-sm text-gray-400">Same-day availability for urgent projects</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Confirmation */}
          {consultationType && selectedTime && (
            <div className="mt-12">
              <Card className="backdrop-blur-sm bg-gray-900/50 border-2 border-cyan-400/50 rounded-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-300">
                    CONFIRM <span className="text-cyan-400">CONSULTATION</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <h4 className="text-lg text-cyan-400 mb-2">TYPE</h4>
                      <p className="text-gray-300">
                        {consultationTypes.find(t => t.id === consultationType)?.name}
                      </p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg text-yellow-400 mb-2">TIME</h4>
                      <p className="text-gray-300">
                        {timeSlots.find(t => t.id === selectedTime)?.label}
                      </p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg text-purple-400 mb-2">DURATION</h4>
                      <p className="text-gray-300">
                        {consultationTypes.find(t => t.id === consultationType)?.duration}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button 
                      onClick={handleBooking}
                      disabled={isBooking}
                      className="px-12 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-black transition-all duration-300 disabled:opacity-50"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {isBooking ? "BOOKING..." : "CONFIRM BOOKING"}
                    </Button>
                    <p className="text-gray-400 text-sm mt-4">
                      Confirmation details will be sent to your email immediately
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-300">
              WHAT TO <span className="text-cyan-400">EXPECT</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl text-cyan-400 mb-4">BEFORE THE CALL</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Receive detailed preparation checklist</li>
                  <li>• Get secure video conferencing link</li>
                  <li>• Optional: Submit project brief for analysis</li>
                  <li>• Technical requirements assessment form</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl text-yellow-400 mb-4">DURING THE SESSION</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Live project requirements analysis</li>
                  <li>• Custom technology stack recommendations</li>
                  <li>• Real-time cost and timeline estimates</li>
                  <li>• Q&A with development team</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl text-purple-400 mb-4">AFTER THE CALL</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Detailed project proposal within 24 hours</li>
                  <li>• Custom roadmap and milestone breakdown</li>
                  <li>• Pricing options and package recommendations</li>
                  <li>• Direct line for follow-up questions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl text-cyan-400 mb-4">NO OBLIGATIONS</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Completely free consultation</li>
                  <li>• No pressure sales tactics</li>
                  <li>• Take time to consider options</li>
                  <li>• Expert insights regardless of decision</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
