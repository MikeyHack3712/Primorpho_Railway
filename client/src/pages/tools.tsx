import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { auditFormSchema } from "@shared/schema";
import { z } from "zod";
import { Search, Zap, Shield, Smartphone, Eye, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

type AuditFormData = z.infer<typeof auditFormSchema>;

interface AuditResult {
  websiteUrl: string;
  performanceScore: number;
  seoScore: number;
  securityScore: number;
  mobileScore: number;
  accessibilityScore: number;
  recommendations: {
    performance?: string[];
    seo?: string[];
    security?: string[];
    mobile?: string[];
    accessibility?: string[];
    priority?: string[];
    error?: string;
    suggestions?: string[];
  };
}

export default function Tools() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const form = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      websiteUrl: "",
    },
  });

  const auditMutation = useMutation({
    mutationFn: async (data: AuditFormData) => {
      const response = await apiRequest("POST", "/api/audit", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAuditResult(data.audit);
      setIsAnalyzing(false);
      toast({
        title: "Neural Scan Complete!",
        description: data.cached ? "Retrieved from quantum cache" : "Fresh analysis completed",
        className: "glass-card border-primary/30 text-white",
      });
    },
    onError: (error) => {
      setIsAnalyzing(false);
      toast({
        title: "Scan Failed",
        description: error.message || "Failed to analyze website. Please check the URL and try again.",
        variant: "destructive",
        className: "glass-card border-red-500/30 text-white",
      });
    },
  });

  const onSubmit = (data: AuditFormData) => {
    setIsAnalyzing(true);
    setAuditResult(null);
    auditMutation.mutate(data);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "EXCELLENT";
    if (score >= 60) return "GOOD";
    if (score >= 40) return "NEEDS WORK";
    return "CRITICAL";
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              NEURAL.<span className="text-yellow-400 animate-glow-pulse">AUDIT</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Get an instant quantum analysis of your website's performance, SEO, security, and optimization protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Audit Tool */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-card border-primary/30 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-cyber text-primary text-center">
                WEBSITE QUANTUM SCANNER
              </CardTitle>
              <p className="text-center white-highlight">
                Advanced neural analysis using authentic data extraction and performance metrics
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="websiteUrl" className="text-sm font-cyber white-highlight mb-2 block">
                    WEBSITE URL *
                  </Label>
                  <div className="flex gap-4">
                    <Input
                      id="websiteUrl"
                      type="url"
                      {...form.register("websiteUrl")}
                      placeholder="https://your-website.com"
                      className="flex-1 bg-transparent border-primary/30 text-white"
                      disabled={isAnalyzing}
                    />
                    <Button
                      type="submit"
                      disabled={isAnalyzing || auditMutation.isPending}
                      className="cyber-button-hover px-8 py-3 rounded-lg font-cyber font-semibold bg-transparent border border-primary text-white hover:bg-primary/10"
                    >
                      {isAnalyzing || auditMutation.isPending ? (
                        "SCANNING..."
                      ) : (
                        <>
                          <Search className="w-5 h-5 mr-2" />
                          INITIATE SCAN
                        </>
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.websiteUrl && (
                    <p className="text-red-400 text-xs mt-1">{form.formState.errors.websiteUrl.message}</p>
                  )}
                </div>
              </form>

              {/* Scanning Animation */}
              {isAnalyzing && (
                <div className="mt-8 p-8 glass-card rounded-xl scan-line">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-yellow-400 rounded-lg flex items-center justify-center animate-pulse">
                      <Zap className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-cyber text-primary mb-4">NEURAL ANALYSIS IN PROGRESS</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="white-highlight text-sm">Fetching website data...</span>
                        <span className="text-primary text-sm">█████████████████████</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="white-highlight text-sm">Analyzing performance metrics...</span>
                        <span className="text-yellow-400 text-sm">█████████████████</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="white-highlight text-sm">Scanning security protocols...</span>
                        <span className="text-purple-400 text-sm">███████████</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="white-highlight text-sm">Processing optimization opportunities...</span>
                        <span className="text-primary text-sm">███████</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Audit Results */}
          {auditResult && (
            <div className="space-y-8">
              {/* Overall Scores */}
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-cyber text-primary text-center">
                    QUANTUM ANALYSIS RESULTS
                  </CardTitle>
                  <p className="text-center white-highlight">
                    Website: <span className="text-primary">{auditResult.websiteUrl}</span>
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  {auditResult.recommendations.error ? (
                    <div className="text-center">
                      <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                      <h3 className="text-xl font-cyber text-red-400 mb-4">SCAN ERROR</h3>
                      <p className="white-highlight mb-4">{auditResult.recommendations.error}</p>
                      {auditResult.recommendations.suggestions && (
                        <div className="glass-card p-4 rounded-lg">
                          <h4 className="text-lg font-cyber text-yellow-400 mb-2">SUGGESTIONS</h4>
                          <ul className="white-highlight text-sm">
                            {auditResult.recommendations.suggestions.map((suggestion, index) => (
                              <li key={index}>• {suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                      {[
                        { label: "PERFORMANCE", score: auditResult.performanceScore, icon: <Zap className="w-6 h-6" /> },
                        { label: "SEO", score: auditResult.seoScore, icon: <Search className="w-6 h-6" /> },
                        { label: "SECURITY", score: auditResult.securityScore, icon: <Shield className="w-6 h-6" /> },
                        { label: "MOBILE", score: auditResult.mobileScore, icon: <Smartphone className="w-6 h-6" /> },
                        { label: "ACCESSIBILITY", score: auditResult.accessibilityScore, icon: <Eye className="w-6 h-6" /> },
                      ].map((metric, index) => (
                        <div key={index} className="text-center glass-card p-6 rounded-xl">
                          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary to-purple-400 rounded-lg flex items-center justify-center">
                            {metric.icon}
                          </div>
                          <h3 className="text-lg font-cyber text-primary mb-2">{metric.label}</h3>
                          <div className={`text-3xl font-cyber mb-2 ${getScoreColor(metric.score)}`}>
                            {metric.score}%
                          </div>
                          <Badge className={`${
                            metric.score >= 80 ? "bg-primary/20 text-primary border-primary/30" :
                            metric.score >= 60 ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30" :
                            "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}>
                            {getScoreBadge(metric.score)}
                          </Badge>
                          <div className="mt-3">
                            <Progress 
                              value={metric.score} 
                              className="h-2 bg-gray-800"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Detailed Recommendations */}
              {!auditResult.recommendations.error && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Priority Issues */}
                  {auditResult.recommendations.priority && auditResult.recommendations.priority.length > 0 && (
                    <Card className="glass-card border-red-500/30">
                      <CardHeader>
                        <CardTitle className="text-xl font-cyber text-red-400 flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          PRIORITY ISSUES
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.priority.map((issue, index) => (
                            <li key={index} className="white-highlight text-sm flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Performance Recommendations */}
                  {auditResult.recommendations.performance && auditResult.recommendations.performance.length > 0 && (
                    <Card className="glass-card border-primary/30">
                      <CardHeader>
                        <CardTitle className="text-xl font-cyber text-primary flex items-center">
                          <Zap className="w-5 h-5 mr-2" />
                          PERFORMANCE
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.performance.map((rec, index) => (
                            <li key={index} className="white-highlight text-sm flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* SEO Recommendations */}
                  {auditResult.recommendations.seo && auditResult.recommendations.seo.length > 0 && (
                    <Card className="glass-card border-yellow-400/30">
                      <CardHeader>
                        <CardTitle className="text-xl font-cyber text-yellow-400 flex items-center">
                          <Search className="w-5 h-5 mr-2" />
                          SEO OPTIMIZATION
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.seo.map((rec, index) => (
                            <li key={index} className="white-highlight text-sm flex items-start">
                              <span className="text-yellow-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Security Recommendations */}
                  {auditResult.recommendations.security && auditResult.recommendations.security.length > 0 && (
                    <Card className="glass-card border-purple-400/30">
                      <CardHeader>
                        <CardTitle className="text-xl font-cyber text-purple-400 flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          SECURITY
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.security.map((rec, index) => (
                            <li key={index} className="white-highlight text-sm flex items-start">
                              <span className="text-purple-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Mobile Recommendations */}
                  {auditResult.recommendations.mobile && auditResult.recommendations.mobile.length > 0 && (
                    <Card className="glass-card border-primary/30">
                      <CardHeader>
                        <CardTitle className="text-xl font-cyber text-primary flex items-center">
                          <Smartphone className="w-5 h-5 mr-2" />
                          MOBILE OPTIMIZATION
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.mobile.map((rec, index) => (
                            <li key={index} className="white-highlight text-sm flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Accessibility Recommendations */}
                  {auditResult.recommendations.accessibility && auditResult.recommendations.accessibility.length > 0 && (
                    <Card className="glass-card border-yellow-400/30">
                      <CardHeader>
                        <CardTitle className="text-xl font-cyber text-yellow-400 flex items-center">
                          <Eye className="w-5 h-5 mr-2" />
                          ACCESSIBILITY
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.accessibility.map((rec, index) => (
                            <li key={index} className="white-highlight text-sm flex items-start">
                              <span className="text-yellow-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* CTA Section */}
              <Card className="glass-card border-2 border-primary/50 scan-line">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-cyber font-bold mb-4 white-highlight">
                    READY TO <span className="text-primary animate-glow-pulse">OPTIMIZE</span>?
                  </h3>
                  <p className="white-highlight mb-8 max-w-2xl mx-auto">
                    Get professional implementation of these recommendations. 
                    Our quantum-enhanced development team can resolve all identified issues.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      GET OPTIMIZATION QUOTE
                    </Button>
                    <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      BOOK CONSULTATION
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              AUDIT.<span className="text-primary animate-glow-pulse">FEATURES</span>
            </h2>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Advanced website analysis using authentic data extraction and quantum-enhanced algorithms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-primary/30 hover:animate-neural-pulse">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-purple-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-cyber text-primary mb-4">REAL-TIME ANALYSIS</h3>
                <p className="white-highlight text-sm">
                  Live website scanning using Cheerio HTML parsing for authentic performance, 
                  SEO, and security assessments.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-yellow-400/30 hover:animate-neural-pulse">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-cyber text-yellow-400 mb-4">COMPREHENSIVE SCAN</h3>
                <p className="white-highlight text-sm">
                  Multi-layer analysis covering performance, SEO, security, mobile responsiveness, 
                  and accessibility standards.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-purple-400/30 hover:animate-neural-pulse">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-cyber text-purple-400 mb-4">ACTIONABLE INSIGHTS</h3>
                <p className="white-highlight text-sm">
                  Detailed recommendations with priority levels and specific implementation 
                  guidance for immediate improvements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
