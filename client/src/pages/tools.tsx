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
        className: "bg-gray-900/90 border-cyan-300/30 text-white",
      });
    },
    onError: (error) => {
      setIsAnalyzing(false);
      toast({
        title: "Scan Failed",
        description: error.message || "Failed to analyze website. Please check the URL and try again.",
        variant: "destructive",
        className: "bg-gray-900/90 border-red-500/30 text-white",
      });
    },
  });

  const onSubmit = (data: AuditFormData) => {
    setIsAnalyzing(true);
    setAuditResult(null);
    auditMutation.mutate(data);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
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
    <div className="min-h-screen bg-background neural-bg">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-sm text-cyan-300 tracking-wider border border-cyan-300/30 px-6 py-2 rounded-md bg-cyan-300/5">
              NEURAL WEB SOLUTIONS
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-cyan-300 block">NEURAL</span>
            <span className="text-yellow-300 block">AUDIT</span>
          </h1>
          
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-8 mb-16">
            <p className="text-xl text-gray-300 leading-relaxed">
              Get instant analysis of your website's <span className="text-cyan-300">performance</span>, <span className="text-purple-300">SEO</span>, and <span className="text-yellow-300">optimization</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Audit Tool */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl text-cyan-300 font-bold mb-4">
                WEBSITE NEURAL SCANNER
              </h2>
              <p className="text-gray-300">
                Advanced analysis using authentic data extraction and performance metrics
              </p>
            </div>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="websiteUrl" className="text-sm text-gray-300 mb-2 block">
                  WEBSITE URL *
                </Label>
                <div className="flex gap-4">
                  <Input
                    id="websiteUrl"
                    type="url"
                    {...form.register("websiteUrl")}
                    placeholder="https://your-website.com"
                    className="flex-1 bg-gray-800/50 border-gray-600/30 text-white placeholder-gray-400"
                    disabled={isAnalyzing}
                  />
                  <Button
                    type="submit"
                    disabled={isAnalyzing || auditMutation.isPending}
                    className="px-8 py-3 bg-cyan-300/10 border border-cyan-300/30 text-cyan-300 hover:bg-cyan-300/20 transition-all duration-300"
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
              <div className="mt-8 p-8 backdrop-blur-sm bg-gray-800/50 border border-gray-600/30 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-300 to-yellow-300 rounded-lg flex items-center justify-center animate-pulse">
                    <Zap className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl text-cyan-300 mb-4">NEURAL ANALYSIS IN PROGRESS</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Fetching website data...</span>
                      <span className="text-cyan-300 text-sm">█████████████████████</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Analyzing performance metrics...</span>
                      <span className="text-yellow-300 text-sm">█████████████████</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Scanning security protocols...</span>
                      <span className="text-purple-300 text-sm">███████████</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Processing optimization opportunities...</span>
                      <span className="text-cyan-300 text-sm">███████</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Audit Results */}
          {auditResult && (
            <div className="space-y-8">
              <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl text-cyan-300 font-bold mb-4">
                    NEURAL ANALYSIS RESULTS
                  </h2>
                  <p className="text-gray-300">
                    Website: <span className="text-cyan-300">{auditResult.websiteUrl}</span>
                  </p>
                </div>
                
                {auditResult.recommendations.error ? (
                  <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl text-red-400 mb-4">SCAN ERROR</h3>
                    <p className="text-gray-300 mb-4">{auditResult.recommendations.error}</p>
                    {auditResult.recommendations.suggestions && (
                      <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
                        <h4 className="text-lg text-yellow-300 mb-2">SUGGESTIONS</h4>
                        <ul className="text-gray-300 text-sm text-left">
                          {auditResult.recommendations.suggestions.map((suggestion, index) => (
                            <li key={index} className="mb-1">• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Score Grid */}
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                      {[
                        { label: "PERFORMANCE", score: auditResult.performanceScore, icon: <Zap className="w-6 h-6" />, color: "cyan-300" },
                        { label: "SEO", score: auditResult.seoScore, icon: <Search className="w-6 h-6" />, color: "purple-300" },
                        { label: "SECURITY", score: auditResult.securityScore, icon: <Shield className="w-6 h-6" />, color: "yellow-300" },
                        { label: "MOBILE", score: auditResult.mobileScore, icon: <Smartphone className="w-6 h-6" />, color: "cyan-300" },
                        { label: "ACCESSIBILITY", score: auditResult.accessibilityScore, icon: <Eye className="w-6 h-6" />, color: "purple-300" },
                      ].map((metric, index) => (
                        <div key={index} className="text-center bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
                          <div className={`w-12 h-12 mx-auto mb-4 bg-${metric.color}/20 border border-${metric.color}/30 rounded-lg flex items-center justify-center`}>
                            <div className={`text-${metric.color}`}>
                              {metric.icon}
                            </div>
                          </div>
                          <h3 className={`text-lg text-${metric.color} mb-2`}>{metric.label}</h3>
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(metric.score)}`}>
                            {metric.score}%
                          </div>
                          <Badge className={`mb-3 ${
                            metric.score >= 80 ? "bg-green-500/20 text-green-400 border-green-500/30" :
                            metric.score >= 60 ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30" :
                            "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}>
                            {getScoreBadge(metric.score)}
                          </Badge>
                          <Progress 
                            value={metric.score} 
                            className="h-2 bg-gray-700"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Recommendations */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {auditResult?.recommendations?.priority && auditResult.recommendations.priority.length > 0 && (
                        <div className="bg-gray-800/50 border border-red-400/30 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                            <h3 className="text-xl text-red-400 font-bold">PRIORITY ISSUES</h3>
                          </div>
                          <ul className="space-y-2">
                            {auditResult.recommendations.priority.map((issue, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                {issue}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {auditResult.recommendations.performance && auditResult.recommendations.performance.length > 0 && (
                        <div className="bg-gray-800/50 border border-cyan-300/30 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Zap className="w-5 h-5 text-cyan-300 mr-2" />
                            <h3 className="text-xl text-cyan-300 font-bold">PERFORMANCE</h3>
                          </div>
                          <ul className="space-y-2">
                            {auditResult.recommendations.performance.map((rec, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-start">
                                <span className="text-cyan-300 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {auditResult.recommendations.seo && auditResult.recommendations.seo.length > 0 && (
                        <div className="bg-gray-800/50 border border-purple-300/30 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Search className="w-5 h-5 text-purple-300 mr-2" />
                            <h3 className="text-xl text-purple-300 font-bold">SEO</h3>
                          </div>
                          <ul className="space-y-2">
                            {auditResult.recommendations.seo.map((rec, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-start">
                                <span className="text-purple-300 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {auditResult.recommendations.security && auditResult.recommendations.security.length > 0 && (
                        <div className="bg-gray-800/50 border border-yellow-300/30 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Shield className="w-5 h-5 text-yellow-300 mr-2" />
                            <h3 className="text-xl text-yellow-300 font-bold">SECURITY</h3>
                          </div>
                          <ul className="space-y-2">
                            {auditResult.recommendations.security.map((rec, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-start">
                                <span className="text-yellow-300 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-300">
              AUDIT <span className="text-cyan-300">FEATURES</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced website analysis using authentic data extraction and neural-enhanced algorithms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-sm bg-gray-900/30 border border-cyan-300/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyan-300/20 border border-cyan-300/30 rounded-lg flex items-center justify-center">
                <Zap className="w-8 h-8 text-cyan-300" />
              </div>
              <h3 className="text-xl text-cyan-300 mb-4">REAL-TIME ANALYSIS</h3>
              <p className="text-gray-300 text-sm">
                Live website scanning using Cheerio HTML parsing for authentic performance, 
                SEO, and security assessments.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-gray-900/30 border border-yellow-300/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-yellow-300/20 border border-yellow-300/30 rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-xl text-yellow-300 mb-4">COMPREHENSIVE SCAN</h3>
              <p className="text-gray-300 text-sm">
                Multi-layer analysis covering performance, SEO, security, mobile responsiveness, 
                and accessibility standards.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-gray-900/30 border border-purple-300/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-300/20 border border-purple-300/30 rounded-lg flex items-center justify-center">
                <Eye className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-xl text-purple-300 mb-4">ACTIONABLE INSIGHTS</h3>
              <p className="text-gray-300 text-sm">
                Detailed recommendations with priority levels and specific implementation 
                guidance for immediate improvements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}