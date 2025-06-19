import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Mail, 
  Phone, 
  Eye, 
  Rocket, 
  Calendar, 
  User, 
  Building, 
  Package, 
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  Search
} from "lucide-react";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  business?: string;
  phone?: string;
  package?: string;
  details?: string;
  isAuditRequest: boolean;
  websiteUrl?: string;
  priority: string;
  status: string;
  createdAt: string;
}

interface SlotReservation {
  id: number;
  name: string;
  email: string;
  business?: string;
  phone?: string;
  package: string;
  preferredSlot: string;
  projectDetails?: string;
  budget?: string;
  timeline?: string;
  status: string;
  createdAt: string;
}

interface AuditResult {
  id: number;
  websiteUrl: string;
  performanceScore: number;
  seoScore: number;
  securityScore: number;
  mobileScore: number;
  accessibilityScore: number;
  createdAt: string;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect to login if unauthorized
  useEffect(() => {
    const handleUnauthorized = () => {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, [toast]);

  // Fetch contact submissions
  const { data: submissions = [], isLoading: submissionsLoading, error: submissionsError } = useQuery({
    queryKey: ["/api/admin/submissions"],
    retry: false,
  });

  // Fetch slot reservations
  const { data: reservations = [], isLoading: reservationsLoading, error: reservationsError } = useQuery({
    queryKey: ["/api/admin/reservations"],
    retry: false,
  });

  // Fetch audit results
  const { data: audits = [], isLoading: auditsLoading, error: auditsError } = useQuery({
    queryKey: ["/api/admin/audits"],
    retry: false,
  });

  // Handle unauthorized errors
  useEffect(() => {
    const errors = [submissionsError, reservationsError, auditsError].filter(Boolean);
    errors.forEach(error => {
      if (error && isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
      }
    });
  }, [submissionsError, reservationsError, auditsError, toast]);

  // Update submission status
  const updateSubmissionStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/admin/submission/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/submissions"] });
      toast({
        title: "Status Updated",
        description: "Submission status has been updated successfully.",
        className: "glass-card border-primary/30 text-white",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update status",
        variant: "destructive",
        className: "glass-card border-red-500/30 text-white",
      });
    },
  });

  // Update reservation status
  const updateReservationStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/admin/reservation/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reservations"] });
      toast({
        title: "Status Updated",
        description: "Reservation status has been updated successfully.",
        className: "glass-card border-primary/30 text-white",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update status",
        variant: "destructive",
        className: "glass-card border-red-500/30 text-white",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-primary/20 text-primary border-primary/30";
      case "contacted": return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "in-progress": return "bg-purple-400/20 text-purple-400 border-purple-400/30";
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "closed": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "normal": return "bg-primary/20 text-primary border-primary/30";
      case "low": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalSubmissions = submissions.length;
  const totalReservations = reservations.length;
  const totalAudits = audits.length;
  const highPrioritySubmissions = submissions.filter((s: ContactSubmission) => s.priority === "high").length;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              ADMIN.<span className="text-purple-400 animate-glow-pulse">CONTROL</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Quantum command center for monitoring submissions, reservations, and system analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-primary/30 hover:animate-neural-pulse">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-cyber text-primary mb-2">{totalSubmissions}</div>
                <div className="white-highlight">TOTAL SUBMISSIONS</div>
                <div className="text-sm text-yellow-400">All contact forms</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-yellow-400/30 hover:animate-neural-pulse">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-cyber text-yellow-400 mb-2">{totalReservations}</div>
                <div className="white-highlight">SLOT RESERVATIONS</div>
                <div className="text-sm text-primary">Development slots</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-purple-400/30 hover:animate-neural-pulse">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-cyber text-purple-400 mb-2">{totalAudits}</div>
                <div className="white-highlight">AUDIT SCANS</div>
                <div className="text-sm text-yellow-400">Website analyses</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-red-500/30 hover:animate-neural-pulse">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-cyber text-red-400 mb-2">{highPrioritySubmissions}</div>
                <div className="white-highlight">HIGH PRIORITY</div>
                <div className="text-sm text-red-400">Urgent requests</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="submissions" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 glass-card border-primary/30">
              <TabsTrigger value="submissions" className="cyber-button-hover font-cyber">
                SUBMISSIONS
              </TabsTrigger>
              <TabsTrigger value="reservations" className="cyber-button-hover font-cyber">
                RESERVATIONS
              </TabsTrigger>
              <TabsTrigger value="audits" className="cyber-button-hover font-cyber">
                AUDITS
              </TabsTrigger>
            </TabsList>

            {/* Contact Submissions */}
            <TabsContent value="submissions">
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-cyber text-primary">
                    CONTACT SUBMISSIONS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submissionsLoading ? (
                    <div className="text-center py-8">
                      <div className="white-highlight">Loading submissions...</div>
                    </div>
                  ) : submissions.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <div className="white-highlight">No submissions yet</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.map((submission: ContactSubmission) => (
                        <Card key={submission.id} className="glass-card border-primary/30">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <h3 className="text-lg font-cyber white-highlight">{submission.name}</h3>
                                  <Badge className={getPriorityColor(submission.priority)}>
                                    {submission.priority.toUpperCase()}
                                  </Badge>
                                  <Badge className={getStatusColor(submission.status)}>
                                    {submission.status.toUpperCase().replace('-', ' ')}
                                  </Badge>
                                  {submission.isAuditRequest && (
                                    <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                                      AUDIT REQUEST
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4 text-primary" />
                                      <span className="white-highlight text-sm">{submission.email}</span>
                                    </div>
                                    {submission.phone && (
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-yellow-400" />
                                        <span className="white-highlight text-sm">{submission.phone}</span>
                                      </div>
                                    )}
                                    {submission.business && (
                                      <div className="flex items-center gap-2">
                                        <Building className="w-4 h-4 text-purple-400" />
                                        <span className="white-highlight text-sm">{submission.business}</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-2">
                                    {submission.package && (
                                      <div className="flex items-center gap-2">
                                        <Package className="w-4 h-4 text-primary" />
                                        <span className="white-highlight text-sm">{submission.package}</span>
                                      </div>
                                    )}
                                    {submission.websiteUrl && (
                                      <div className="flex items-center gap-2">
                                        <Search className="w-4 h-4 text-yellow-400" />
                                        <span className="white-highlight text-sm break-all">{submission.websiteUrl}</span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-purple-400" />
                                      <span className="white-highlight text-sm">{formatDate(submission.createdAt)}</span>
                                    </div>
                                  </div>
                                </div>

                                {submission.details && (
                                  <div className="glass-card p-4 rounded-lg mb-4">
                                    <h4 className="text-sm font-cyber text-yellow-400 mb-2">PROJECT DETAILS</h4>
                                    <p className="white-highlight text-sm">{submission.details}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => updateSubmissionStatus.mutate({ id: submission.id, status: "contacted" })}
                                disabled={updateSubmissionStatus.isPending}
                                className="cyber-button-hover bg-transparent border border-primary text-white hover:bg-primary/10"
                              >
                                <Mail className="w-4 h-4 mr-1" />
                                MARK CONTACTED
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateSubmissionStatus.mutate({ id: submission.id, status: "in-progress" })}
                                disabled={updateSubmissionStatus.isPending}
                                className="cyber-button-hover bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10"
                              >
                                <Rocket className="w-4 h-4 mr-1" />
                                IN PROGRESS
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateSubmissionStatus.mutate({ id: submission.id, status: "completed" })}
                                disabled={updateSubmissionStatus.isPending}
                                className="cyber-button-hover bg-transparent border border-green-500 text-white hover:bg-green-500/10"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                COMPLETE
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Slot Reservations */}
            <TabsContent value="reservations">
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-cyber text-purple-400">
                    SLOT RESERVATIONS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reservationsLoading ? (
                    <div className="text-center py-8">
                      <div className="white-highlight">Loading reservations...</div>
                    </div>
                  ) : reservations.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <div className="white-highlight">No reservations yet</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reservations.map((reservation: SlotReservation) => (
                        <Card key={reservation.id} className="glass-card border-purple-400/30">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <h3 className="text-lg font-cyber white-highlight">{reservation.name}</h3>
                                  <Badge className={getStatusColor(reservation.status)}>
                                    {reservation.status.toUpperCase().replace('-', ' ')}
                                  </Badge>
                                  <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">
                                    {reservation.preferredSlot.toUpperCase().replace('-', ' ')}
                                  </Badge>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4 text-primary" />
                                      <span className="white-highlight text-sm">{reservation.email}</span>
                                    </div>
                                    {reservation.phone && (
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-yellow-400" />
                                        <span className="white-highlight text-sm">{reservation.phone}</span>
                                      </div>
                                    )}
                                    {reservation.business && (
                                      <div className="flex items-center gap-2">
                                        <Building className="w-4 h-4 text-purple-400" />
                                        <span className="white-highlight text-sm">{reservation.business}</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Package className="w-4 h-4 text-primary" />
                                      <span className="white-highlight text-sm">{reservation.package}</span>
                                    </div>
                                    {reservation.budget && (
                                      <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 text-yellow-400">$</span>
                                        <span className="white-highlight text-sm">{reservation.budget}</span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-purple-400" />
                                      <span className="white-highlight text-sm">{formatDate(reservation.createdAt)}</span>
                                    </div>
                                  </div>
                                </div>

                                {reservation.projectDetails && (
                                  <div className="glass-card p-4 rounded-lg mb-4">
                                    <h4 className="text-sm font-cyber text-yellow-400 mb-2">PROJECT DETAILS</h4>
                                    <p className="white-highlight text-sm">{reservation.projectDetails}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => updateReservationStatus.mutate({ id: reservation.id, status: "confirmed" })}
                                disabled={updateReservationStatus.isPending}
                                className="cyber-button-hover bg-transparent border border-primary text-white hover:bg-primary/10"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                CONFIRM
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateReservationStatus.mutate({ id: reservation.id, status: "in-progress" })}
                                disabled={updateReservationStatus.isPending}
                                className="cyber-button-hover bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10"
                              >
                                <Rocket className="w-4 h-4 mr-1" />
                                START PROJECT
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateReservationStatus.mutate({ id: reservation.id, status: "completed" })}
                                disabled={updateReservationStatus.isPending}
                                className="cyber-button-hover bg-transparent border border-green-500 text-white hover:bg-green-500/10"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                DELIVERED
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit Results */}
            <TabsContent value="audits">
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-cyber text-yellow-400">
                    WEBSITE AUDITS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {auditsLoading ? (
                    <div className="text-center py-8">
                      <div className="white-highlight">Loading audit results...</div>
                    </div>
                  ) : audits.length === 0 ? (
                    <div className="text-center py-8">
                      <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <div className="white-highlight">No audit results yet</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {audits.map((audit: AuditResult) => (
                        <Card key={audit.id} className="glass-card border-yellow-400/30">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                  <h3 className="text-lg font-cyber white-highlight break-all">{audit.websiteUrl}</h3>
                                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                                    ANALYZED
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                                  <div className="text-center glass-card p-4 rounded-lg">
                                    <div className="text-2xl font-cyber text-primary mb-1">{audit.performanceScore}%</div>
                                    <div className="text-xs white-highlight">PERFORMANCE</div>
                                  </div>
                                  <div className="text-center glass-card p-4 rounded-lg">
                                    <div className="text-2xl font-cyber text-yellow-400 mb-1">{audit.seoScore}%</div>
                                    <div className="text-xs white-highlight">SEO</div>
                                  </div>
                                  <div className="text-center glass-card p-4 rounded-lg">
                                    <div className="text-2xl font-cyber text-purple-400 mb-1">{audit.securityScore}%</div>
                                    <div className="text-xs white-highlight">SECURITY</div>
                                  </div>
                                  <div className="text-center glass-card p-4 rounded-lg">
                                    <div className="text-2xl font-cyber text-primary mb-1">{audit.mobileScore}%</div>
                                    <div className="text-xs white-highlight">MOBILE</div>
                                  </div>
                                  <div className="text-center glass-card p-4 rounded-lg">
                                    <div className="text-2xl font-cyber text-yellow-400 mb-1">{audit.accessibilityScore}%</div>
                                    <div className="text-xs white-highlight">ACCESSIBILITY</div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-purple-400" />
                                  <span className="white-highlight text-sm">{formatDate(audit.createdAt)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="cyber-button-hover bg-transparent border border-primary text-white hover:bg-primary/10"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                VIEW DETAILS
                              </Button>
                              <Button
                                size="sm"
                                className="cyber-button-hover bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10"
                              >
                                <Mail className="w-4 h-4 mr-1" />
                                SEND REPORT
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
