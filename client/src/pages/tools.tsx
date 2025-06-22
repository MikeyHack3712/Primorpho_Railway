import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { auditFormSchema } from "@shared/schema";
import { z } from "zod";
import Neural3D from "@/components/ui/neural-3d";
import { 
  Zap, 
  Search, 
  Shield, 
  Smartphone, 
  Eye, 
  AlertTriangle, 
  ArrowRight,
  Clock,
  Target,
  TrendingUp
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";

type AuditFormData = z.infer<typeof auditFormSchema>;

interface AuditResult {
  websiteUrl: string;
  loadTime?: number;
  overallScore?: number;
  performanceScore: number;
  seoScore: number;
  securityScore: number;
  mobileScore: number;
  accessibilityScore: number;
  technicalScore?: number;
  contentScore?: number;
  recommendations: {
    performance?: string[];
    seo?: string[];
    security?: string[];
    mobile?: string[];
    accessibility?: string[];
    technical?: string[];
    content?: string[];
    priority?: string[];
    error?: string;
    suggestions?: string[];
    analysis?: string[];
    status?: string[];
    timeline?: string[];
    included?: string[];
  };
}

export default function Tools() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const { toast } = useToast();
  
  const form = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      websiteUrl: "",
    },
  });

  const auditMutation = useMutation({
    mutationFn: async (data: AuditFormData) => {
      const response = await apiRequest("/api/audit", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: (data) => {
      setAuditResult(data.audit || data);
      toast({
        title: "Analysis Complete",
        description: "Google Lighthouse analysis completed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze website. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AuditFormData) => {
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
    return "NEEDS WORK";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <Neural3D />
      
      {/* Header */}
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-cyan-300/10 border border-cyan-300/30 rounded-full text-cyan-300 text-sm font-semibold mb-8">
            NEURAL WEB SOLUTIONS
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 page-title">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">INSTANT</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">WEBSITE</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">AUDIT</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Get immediate website analysis with performance scores, SEO insights, security checks, and actionable recommendations.
          </p>
        </div>
      </section>

      {/* Audit Form */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-cyan-300">
                RUN LIGHTHOUSE ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-green-400 mr-3" />
                    <h3 className="text-xl text-green-400 font-semibold">INSTANT ANALYSIS RESULTS</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Get immediate website analysis with real performance metrics, SEO evaluation, 
                    security assessment, and mobile optimization insights.
                  </p>
                  <p className="text-gray-300">
                    Comprehensive scores and actionable recommendations delivered in seconds.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="websiteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Website URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="example.com (no need to type https://)"
                              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={auditMutation.isPending}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3 text-lg font-semibold"
                    >
                      {auditMutation.isPending ? "ANALYZING WEBSITE..." : "START INSTANT AUDIT"}
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results */}
      {auditResult && (
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                ANALYSIS REQUEST FOR <span className="text-cyan-300">{auditResult.websiteUrl}</span>
              </h2>
              {auditResult.loadTime && auditResult.loadTime > 0 && (
                <div className="flex justify-center items-center space-x-4 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>Initial Response Time: {auditResult.loadTime}ms</span>
                </div>
              )}
            </div>

            {auditResult.recommendations.error ? (
              <div className="backdrop-blur-sm bg-red-900/30 border border-red-500/30 rounded-lg p-8 text-center">
                <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl text-red-400 font-bold mb-4">WEBSITE ACCESS ERROR</h3>
                <p className="text-gray-300 mb-6">{auditResult.recommendations.error}</p>
                {auditResult.recommendations.suggestions && auditResult.recommendations.suggestions.length > 0 && (
                  <div className="text-left max-w-2xl mx-auto">
                    <h4 className="text-lg text-yellow-300 mb-3">Suggestions:</h4>
                    <ul className="space-y-2">
                      {auditResult.recommendations.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-8">
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                    onClick={() => window.location.href = '/contact?service=analysis'}
                  >
                    CONTACT FOR MANUAL ANALYSIS
                  </Button>
                </div>
              </div>
            ) : auditResult.recommendations.analysis ? (
              <div className="backdrop-blur-sm bg-green-900/30 border border-green-500/30 rounded-lg p-8 text-center">
                <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl text-green-400 font-bold mb-4">ANALYSIS REQUEST SUBMITTED</h3>
                <p className="text-gray-300 mb-6">Your website analysis request has been successfully submitted for professional review.</p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8 text-left">
                  <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-6">
                    <h4 className="text-lg text-cyan-300 font-semibold mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      TIMELINE
                    </h4>
                    <ul className="space-y-2">
                      {auditResult.recommendations.timeline?.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                    <h4 className="text-lg text-purple-300 font-semibold mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      ANALYSIS SCOPE
                    </h4>
                    <ul className="space-y-2">
                      {auditResult.recommendations.included?.slice(0, 4).map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-purple-300 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                      onClick={() => window.location.href = '/contact?service=analysis'}
                    >
                      PROVIDE ADDITIONAL DETAILS
                    </Button>
                    <Button
                      variant="outline"
                      className="border-cyan-300/30 text-cyan-300 hover:bg-cyan-300/10"
                      onClick={() => window.location.href = '/reserve-slot'}
                    >
                      BOOK CONSULTATION
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Check your email for confirmation and next steps. Our team will contact you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Overall Score */}
                {auditResult.overallScore && (
                  <div className="text-center">
                    <div className="inline-block backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-8">
                      <h3 className="text-xl text-gray-300 mb-4">OVERALL LIGHTHOUSE SCORE</h3>
                      <div className={`text-6xl font-bold mb-4 ${getScoreColor(auditResult.overallScore)}`}>
                        {auditResult.overallScore}
                      </div>
                      <Badge className={`${getScoreColor(auditResult.overallScore)} bg-transparent border`}>
                        {getScoreBadge(auditResult.overallScore)}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Performance Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: "PERFORMANCE", score: auditResult.performanceScore, icon: <Zap className="w-6 h-6" />, color: "cyan-300" },
                    { label: "SEO", score: auditResult.seoScore, icon: <Search className="w-6 h-6" />, color: "purple-300" },
                    { label: "BEST PRACTICES", score: auditResult.securityScore, icon: <Shield className="w-6 h-6" />, color: "yellow-300" },
                    { label: "MOBILE", score: auditResult.mobileScore, icon: <Smartphone className="w-6 h-6" />, color: "cyan-300" },
                    { label: "ACCESSIBILITY", score: auditResult.accessibilityScore, icon: <Eye className="w-6 h-6" />, color: "purple-300" },
                    ...(auditResult.technicalScore ? [{ label: "TECHNICAL", score: auditResult.technicalScore, icon: <Target className="w-6 h-6" />, color: "pink-300" }] : [])
                  ].map((metric, index) => (
                    <Card key={index} className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 mx-auto mb-4 bg-${metric.color}/20 border border-${metric.color}/30 rounded-lg flex items-center justify-center`}>
                          <div className={`text-${metric.color}`}>
                            {metric.icon}
                          </div>
                        </div>
                        <h3 className={`text-lg text-${metric.color} mb-2`}>{metric.label}</h3>
                        <div className={`text-3xl font-bold mb-2 ${getScoreColor(metric.score)}`}>
                          {metric.score}
                        </div>
                        <Progress value={metric.score} className="mb-2" />
                        <Badge className={`${getScoreColor(metric.score)} bg-transparent border`}>
                          {getScoreBadge(metric.score)}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Priority Recommendations */}
                {auditResult.recommendations.priority && auditResult.recommendations.priority.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg text-red-400 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      PRIORITY FIXES
                    </h3>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                      <ul className="space-y-2">
                        {auditResult.recommendations.priority.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Detailed Recommendations */}
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { key: 'performance', title: 'PERFORMANCE', icon: <Zap className="w-5 h-5" />, color: 'yellow-300' },
                    { key: 'seo', title: 'SEO', icon: <Search className="w-5 h-5" />, color: 'purple-300' },
                    { key: 'security', title: 'BEST PRACTICES', icon: <Shield className="w-5 h-5" />, color: 'cyan-300' },
                    { key: 'mobile', title: 'MOBILE', icon: <Smartphone className="w-5 h-5" />, color: 'green-300' },
                    { key: 'accessibility', title: 'ACCESSIBILITY', icon: <Eye className="w-5 h-5" />, color: 'orange-300' },
                    { key: 'technical', title: 'TECHNICAL', icon: <Target className="w-5 h-5" />, color: 'pink-300' }
                  ].filter(category => {
                    const recs = auditResult.recommendations[category.key as keyof typeof auditResult.recommendations];
                    return Array.isArray(recs) && recs.length > 0;
                  }).map((category) => (
                    <div key={category.key} className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        {category.icon}
                        <h4 className={`text-lg font-semibold text-${category.color}`}>{category.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {(auditResult.recommendations[category.key as keyof typeof auditResult.recommendations] as string[])?.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ArrowRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Professional Services Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            WHY CHOOSE PROFESSIONAL ANALYSIS?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-6">
              <Shield className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
              <h3 className="text-xl text-cyan-300 mb-3">ACCURATE DATA</h3>
              <p className="text-gray-300">
                Real measurements using industry-standard tools, not estimates or automated guesses.
              </p>
            </div>
            <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-6">
              <Target className="w-12 h-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl text-purple-300 mb-3">EXPERT INSIGHTS</h3>
              <p className="text-gray-300">
                Professional developers analyze your site with years of optimization experience.
              </p>
            </div>
            <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-6">
              <TrendingUp className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl text-yellow-300 mb-3">ACTIONABLE PLAN</h3>
              <p className="text-gray-300">
                Detailed roadmap with prioritized improvements and implementation guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}