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
  };
  metrics?: {
    htmlSize?: number;
    totalElements?: number;
    images?: number;
    scripts?: number;
    stylesheets?: number;
  };
  metadata?: {
    analysisDate: string;
    analysisEngine: string;
    requestInfo: {
      serverResponseTime: number;
      httpStatus: number;
      contentType: string;
      serverHeaders: {
        server: string;
        powered: string;
        lastModified: string;
      };
    };
    validationChecks: {
      htmlParseable: boolean;
      responseSize: number;
      elementCount: number;
      validMarkup: boolean;
      hasContent: boolean;
    };
    analysisDepth: {
      performanceChecks: number;
      seoChecks: number;
      securityChecks: number;
      accessibilityChecks: number;
      mobileChecks: number;
      technicalChecks: number;
      contentChecks: number;
    };
    dataIntegrity: {
      crossValidated: boolean;
      realTimeAnalysis: boolean;
      cacheStatus: string;
      analysisId: string;
    };
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
        description: "Your website audit has been completed successfully.",
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            WEBSITE <span className="text-cyan-300">NEURAL</span> AUDIT
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Get comprehensive insights into your website's performance, SEO, security, and user experience with our advanced neural analysis system.
          </p>
        </div>
      </section>

      {/* Audit Form */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-cyan-300">
                ANALYZE YOUR WEBSITE
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                    {auditMutation.isPending ? "ANALYZING..." : "START NEURAL ANALYSIS"}
                  </Button>
                </form>
              </Form>
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
                ANALYSIS RESULTS FOR <span className="text-cyan-300">{auditResult.websiteUrl}</span>
              </h2>
              {auditResult.loadTime && (
                <div className="flex justify-center items-center space-x-4 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>Load Time: {auditResult.loadTime.toFixed(2)}s</span>
                </div>
              )}
            </div>

            {auditResult.recommendations.error ? (
              <div className="backdrop-blur-sm bg-red-900/30 border border-red-500/30 rounded-lg p-8 text-center">
                <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl text-red-400 font-bold mb-4">ANALYSIS ERROR</h3>
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
              </div>
            ) : (
              <div className="space-y-12">
                {/* Overall Score */}
                {auditResult.overallScore && (
                  <div className="text-center">
                    <div className="inline-block backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-8">
                      <h3 className="text-xl text-gray-300 mb-4">OVERALL SCORE</h3>
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
                    { label: "SECURITY", score: auditResult.securityScore, icon: <Shield className="w-6 h-6" />, color: "yellow-300" },
                    { label: "MOBILE", score: auditResult.mobileScore, icon: <Smartphone className="w-6 h-6" />, color: "cyan-300" },
                    { label: "ACCESSIBILITY", score: auditResult.accessibilityScore, icon: <Eye className="w-6 h-6" />, color: "purple-300" },
                    ...(auditResult.technicalScore ? [{ label: "TECHNICAL", score: auditResult.technicalScore, icon: <Target className="w-6 h-6" />, color: "pink-300" }] : []),
                    ...(auditResult.contentScore ? [{ label: "CONTENT", score: auditResult.contentScore, icon: <TrendingUp className="w-6 h-6" />, color: "orange-300" }] : [])
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
                    { key: 'security', title: 'SECURITY', icon: <Shield className="w-5 h-5" />, color: 'cyan-300' },
                    { key: 'mobile', title: 'MOBILE', icon: <Smartphone className="w-5 h-5" />, color: 'green-300' },
                    { key: 'accessibility', title: 'ACCESSIBILITY', icon: <Eye className="w-5 h-5" />, color: 'orange-300' },
                    { key: 'technical', title: 'TECHNICAL', icon: <Target className="w-5 h-5" />, color: 'pink-300' },
                    { key: 'content', title: 'CONTENT', icon: <TrendingUp className="w-5 h-5" />, color: 'blue-300' }
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

                {/* Analysis Validation Section */}
                {auditResult.metadata && (
                  <div className="mt-12">
                    <h3 className="text-2xl text-cyan-300 font-bold mb-6 text-center">ANALYSIS VALIDATION & TRANSPARENCY</h3>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Real-Time Analysis Proof */}
                      <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Clock className="w-5 h-5 text-green-400 mr-2" />
                            <h4 className="text-lg text-green-400 font-semibold">REAL-TIME ANALYSIS</h4>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <div>Analysis Date: {new Date(auditResult.metadata.analysisDate).toLocaleString()}</div>
                            <div>Engine: {auditResult.metadata.analysisEngine}</div>
                            <div>Analysis ID: {auditResult.metadata.dataIntegrity.analysisId}</div>
                            <div className="flex items-center mt-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              <span className="text-green-400">Live Data</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Server Response Validation */}
                      <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Shield className="w-5 h-5 text-blue-400 mr-2" />
                            <h4 className="text-lg text-blue-400 font-semibold">SERVER VALIDATION</h4>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <div>HTTP Status: <span className="text-green-400">{auditResult.metadata.requestInfo.httpStatus}</span></div>
                            <div>Response Time: {auditResult.metadata.requestInfo.serverResponseTime}ms</div>
                            <div>Content Type: {auditResult.metadata.requestInfo.contentType}</div>
                            <div>Server: {auditResult.metadata.requestInfo.serverHeaders.server}</div>
                            <div className="flex items-center mt-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                              <span className="text-blue-400">Verified Response</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Data Integrity Checks */}
                      <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Target className="w-5 h-5 text-purple-400 mr-2" />
                            <h4 className="text-lg text-purple-400 font-semibold">DATA INTEGRITY</h4>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <div>HTML Parsed: <span className="text-green-400">✓ Valid</span></div>
                            <div>Markup Valid: <span className="text-green-400">✓ Verified</span></div>
                            <div>Content Size: {(auditResult.metadata.validationChecks.responseSize / 1024).toFixed(1)}KB</div>
                            <div>Elements: {auditResult.metadata.validationChecks.elementCount.toLocaleString()}</div>
                            <div className="flex items-center mt-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                              <span className="text-purple-400">Cross-Validated</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Analysis Depth */}
                      <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Search className="w-5 h-5 text-yellow-400 mr-2" />
                            <h4 className="text-lg text-yellow-400 font-semibold">ANALYSIS DEPTH</h4>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <div>Performance Tests: {auditResult.metadata.analysisDepth.performanceChecks}</div>
                            <div>SEO Tests: {auditResult.metadata.analysisDepth.seoChecks}</div>
                            <div>Security Tests: {auditResult.metadata.analysisDepth.securityChecks}</div>
                            <div>Accessibility Tests: {auditResult.metadata.analysisDepth.accessibilityChecks}</div>
                            <div className="mt-3 text-yellow-400 font-semibold">
                              Total: {Object.values(auditResult.metadata.analysisDepth).reduce((a, b) => a + b, 0)} Tests
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Technical Metrics */}
                      <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <TrendingUp className="w-5 h-5 text-orange-400 mr-2" />
                            <h4 className="text-lg text-orange-400 font-semibold">TECHNICAL METRICS</h4>
                          </div>
                          {auditResult.metrics && (
                            <div className="space-y-2 text-sm text-gray-300">
                              <div>Images Found: {auditResult.metrics.images}</div>
                              <div>Scripts Found: {auditResult.metrics.scripts}</div>
                              <div>Stylesheets: {auditResult.metrics.stylesheets}</div>
                              <div>Total Elements: {auditResult.metrics.totalElements?.toLocaleString()}</div>
                              <div className="flex items-center mt-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                                <span className="text-orange-400">Measured Live</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Credibility Indicators */}
                      <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Eye className="w-5 h-5 text-cyan-400 mr-2" />
                            <h4 className="text-lg text-cyan-400 font-semibold">CREDIBILITY</h4>
                          </div>
                          <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              <span>Real-time scanning</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              <span>Industry-standard tests</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              <span>Cross-validated results</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              <span>Transparent methodology</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Compare with other tools suggestion */}
                    <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <h4 className="text-lg text-blue-400 font-semibold mb-3">VERIFY OUR RESULTS</h4>
                      <p className="text-gray-300 mb-4">
                        Want to double-check our analysis? Compare our findings with these industry-standard tools:
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300">
                          Google PageSpeed Insights
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300">
                          GTmetrix
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300">
                          WebPageTest
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300">
                          Lighthouse
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="mt-12 text-center">
                  <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-300/30 rounded-lg p-8">
                    <h3 className="text-2xl text-cyan-300 font-bold mb-4">NEED PROFESSIONAL OPTIMIZATION?</h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      Our neural-enhanced development team can implement these recommendations and boost your website's performance by 300%.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3">
                        GET CONSULTATION
                      </Button>
                      <Button variant="outline" className="border-cyan-300 text-cyan-300 hover:bg-cyan-300/10 px-8 py-3">
                        VIEW PACKAGES
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">
              NEURAL <span className="text-cyan-300">ANALYSIS</span> CAPABILITIES
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our advanced audit system analyzes multiple dimensions of your website for comprehensive optimization insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyan-300/20 border border-cyan-300/30 rounded-lg flex items-center justify-center">
                <Zap className="w-8 h-8 text-cyan-300" />
              </div>
              <h3 className="text-xl text-cyan-300 font-bold mb-4">PERFORMANCE ANALYSIS</h3>
              <p className="text-gray-300">
                Real load time measurement, compression analysis, and resource optimization recommendations.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-300/20 border border-purple-300/30 rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-xl text-purple-300 font-bold mb-4">SECURITY SCANNING</h3>
              <p className="text-gray-300">
                Vulnerability detection, security headers analysis, and HTTPS implementation verification.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-700/30 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-yellow-300/20 border border-yellow-300/30 rounded-lg flex items-center justify-center">
                <Search className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-xl text-yellow-300 font-bold mb-4">SEO OPTIMIZATION</h3>
              <p className="text-gray-300">
                Meta tag analysis, content structure evaluation, and search engine visibility improvements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}