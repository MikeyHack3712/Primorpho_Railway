import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone, CheckCircle, Zap } from "lucide-react";
import Neural3D from "@/components/ui/neural-3d";

export default function BookConsultation() {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [consultationType, setConsultationType] = useState<string>("");

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

  return (
    <div className="pt-16 relative">
      <Neural3D intensity="subtle" />
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              BOOK.<span className="text-primary animate-glow-pulse">CONSULTATION</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Schedule a direct neural link with our development team. 
              Get expert insights and quantum-enhanced project analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl scan-line">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-lg px-4 py-2">
                ⚡ FREE CONSULTATION ⚡
              </Badge>
              <h2 className="text-2xl md:text-3xl font-cyber font-bold mb-4 white-highlight">
                GET EXPERT <span className="text-primary animate-glow-pulse">ANALYSIS</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-purple-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg font-cyber text-primary mb-2">PROJECT ANALYSIS</h3>
                <p className="white-highlight text-sm">
                  Detailed assessment of your requirements and quantum optimization opportunities
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-yellow-400 rounded-lg flex items-center justify-center">
                  <Video className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg font-cyber text-purple-400 mb-2">TECHNICAL STRATEGY</h3>
                <p className="white-highlight text-sm">
                  Custom technology stack recommendations and performance optimization strategies
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-primary rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg font-cyber text-yellow-400 mb-2">GROWTH ROADMAP</h3>
                <p className="white-highlight text-sm">
                  Comprehensive digital transformation plan with measurable milestones
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Interface */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Consultation Types */}
            <div>
              <h2 className="text-3xl font-cyber font-bold mb-8 white-highlight">
                SELECT <span className="text-yellow-400 animate-glow-pulse">CONSULTATION TYPE</span>
              </h2>
              
              <div className="space-y-6">
                {consultationTypes.map((type) => (
                  <Card 
                    key={type.id}
                    className={`glass-card cursor-pointer transition-all duration-300 hover:animate-neural-pulse ${
                      consultationType === type.id 
                        ? `border-2 border-${type.color}` 
                        : "border-primary/30"
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
                            <h3 className={`text-lg font-cyber text-${type.color}`}>
                              {type.name}
                            </h3>
                            <Badge className={`bg-${type.color}/20 text-${type.color} border-${type.color}/30`}>
                              {type.duration}
                            </Badge>
                          </div>
                          <p className="white-highlight text-sm">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Calendar & Time Slots */}
            <div>
              <h2 className="text-3xl font-cyber font-bold mb-8 white-highlight">
                AVAILABLE <span className="text-primary animate-glow-pulse">TIME SLOTS</span>
              </h2>

              {/* Calendar Widget */}
              <Card className="glass-card border-primary/30 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-cyber text-primary flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    TODAY - DECEMBER 20, 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedTime(slot.id)}
                        disabled={!slot.available}
                        className={`cyber-button-hover p-4 rounded-lg font-cyber transition-all duration-300 ${
                          selectedTime === slot.id
                            ? "bg-primary/20 border-2 border-primary text-white"
                            : slot.available
                            ? "bg-transparent border border-primary/30 text-white hover:bg-primary/10"
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
              <Card className="glass-card border-yellow-400/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-cyber text-yellow-400 mb-4">ALTERNATIVE CONTACT</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <div className="white-highlight font-semibold">Direct Call</div>
                        <div className="text-sm white-highlight">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-purple-400 mr-3" />
                      <div>
                        <div className="white-highlight font-semibold">Emergency Session</div>
                        <div className="text-sm white-highlight">Same-day availability for urgent projects</div>
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
              <Card className="glass-card border-2 border-primary/50 scan-line">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-cyber font-bold mb-6 text-center white-highlight">
                    CONFIRM <span className="text-primary animate-glow-pulse">CONSULTATION</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <h4 className="text-lg font-cyber text-primary mb-2">TYPE</h4>
                      <p className="white-highlight">
                        {consultationTypes.find(t => t.id === consultationType)?.name}
                      </p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-cyber text-yellow-400 mb-2">TIME</h4>
                      <p className="white-highlight">
                        {timeSlots.find(t => t.id === selectedTime)?.label}
                      </p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-cyber text-purple-400 mb-2">DURATION</h4>
                      <p className="white-highlight">
                        {consultationTypes.find(t => t.id === consultationType)?.duration}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button className="cyber-button-hover px-12 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
                      <Calendar className="w-5 h-5 mr-2" />
                      CONFIRM BOOKING
                    </Button>
                    <p className="white-highlight text-sm mt-4">
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
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-cyber font-bold mb-6 white-highlight">
              WHAT TO <span className="text-primary animate-glow-pulse">EXPECT</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card border-primary/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-cyber text-primary mb-4">BEFORE THE CALL</h3>
                <ul className="space-y-2 white-highlight text-sm">
                  <li>• Receive detailed preparation checklist</li>
                  <li>• Get secure video conferencing link</li>
                  <li>• Optional: Submit project brief for analysis</li>
                  <li>• Technical requirements assessment form</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-yellow-400/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-cyber text-yellow-400 mb-4">DURING THE SESSION</h3>
                <ul className="space-y-2 white-highlight text-sm">
                  <li>• Live project requirements analysis</li>
                  <li>• Custom technology stack recommendations</li>
                  <li>• Real-time cost and timeline estimates</li>
                  <li>• Q&A with development team</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-purple-400/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-cyber text-purple-400 mb-4">AFTER THE CALL</h3>
                <ul className="space-y-2 white-highlight text-sm">
                  <li>• Detailed project proposal within 24 hours</li>
                  <li>• Custom roadmap and milestone breakdown</li>
                  <li>• Pricing options and package recommendations</li>
                  <li>• Direct line for follow-up questions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-cyber text-primary mb-4">NO OBLIGATIONS</h3>
                <ul className="space-y-2 white-highlight text-sm">
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
