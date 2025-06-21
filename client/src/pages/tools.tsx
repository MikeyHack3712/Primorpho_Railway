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
import Neural3D from "@/components/ui/neural-3d";

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
      const result = await response.json();
      return result;
    },
    onSuccess: (data) => {
      // Handle successful audit with results or error state
      if (data.success && data.audit) {
        setAuditResult(data.audit);
        toast({
          title: "Neural Scan Complete!",
          description: data.cached ? "Retrieved from quantum cache" : "Fresh analysis completed",
          className: "bg-gray-900/90 border-cyan-300/30 text-white",
        });
      } else if (data.audit && data.audit.recommendations && data.audit.recommendations.error) {
        // Handle audit that completed but found an error (invalid/unreachable website)
        setAuditResult(data.audit);
        toast({
          title: "Website Issue Detected",
          description: data.audit.recommendations.error,
          variant: "destructive",
          className: "bg-gray-900/90 border-red-500/30 text-white",
        });
      }
      setIsAnalyzing(false);
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
    <div className="min-h-screen bg-background neural-bg relative">
      <Neural3D />
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
                    type="text"
                    {...form.register("websiteUrl")}
                    placeholder="example.com (no need for https://)"
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
                  <div>
                    {/* Overall Score Display */}
                    {auditResult.overallScore && (
                      <div className="text-center mb-12">
                        <div className="relative inline-block">
                          <div className="w-32 h-32 rounded-full border-4 border-gray-600 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                            <div className="text-center">
                              <div className={`text-4xl font-bold ${getScoreColor(auditResult.overallScore)}`}>
                                {auditResult.overallScore}
                              </div>
                              <div className="text-xs text-gray-300">OVERALL</div>
                            </div>
                          </div>
                          <Badge className={`${getScoreColor(auditResult.overallScore)} bg-transparent border`}>
                            {getScoreBadge(auditResult.overallScore)}
                          </Badge>
                        </div>
                        {auditResult.loadTime && (
                          <p className="text-sm text-gray-300 mt-4">
                            Load Time: <span className={`font-bold ${auditResult.loadTime > 3000 ? 'text-red-400' : auditResult.loadTime > 2000 ? 'text-yellow-400' : 'text-green-400'}`}>
                              {(auditResult.loadTime / 1000).toFixed(1)}s
                            </span>
                          </p>
                        )}
                      </div>
                    )}

                    {/* Enhanced Metrics Display */}
                    {auditResult.metrics && (
                      <div className="mb-8">
                        <h3 className="text-lg text-cyan-300 mb-4">TECHNICAL METRICS</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 text-center">
                            <div className="text-2xl text-yellow-300 font-bold">{auditResult.metrics.htmlSize ? Math.round(auditResult.metrics.htmlSize / 1024) : 0}KB</div>
                            <div className="text-xs text-gray-300">HTML Size</div>
                          </div>
                          <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 text-center">
                            <div className="text-2xl text-purple-300 font-bold">{auditResult.metrics.images || 0}</div>
                            <div className="text-xs text-gray-300">Images</div>
                          </div>
                          <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 text-center">
                            <div className="text-2xl text-cyan-300 font-bold">{auditResult.metrics.scripts || 0}</div>
                            <div className="text-xs text-gray-300">Scripts</div>
                          </div>
                          <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 text-center">
                            <div className="text-2xl text-green-300 font-bold">{auditResult.metrics.stylesheets || 0}</div>
                            <div className="text-xs text-gray-300">Stylesheets</div>
                          </div>
                          <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 text-center">
                            <div className="text-2xl text-orange-300 font-bold">{auditResult.metrics.totalElements || 0}</div>
                            <div className="text-xs text-gray-300">Elements</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Score Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <Card className="bg-gray-800/30 border-gray-600/30">
                        <CardHeader className="text-center pb-4">
                          <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                          <CardTitle className="text-yellow-300">PERFORMANCE</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(auditResult.performanceScore)}`}>
                            {auditResult.performanceScore}
                          </div>
                          <Progress value={auditResult.performanceScore} className="mb-2" />
                          <Badge className={`${getScoreColor(auditResult.performanceScore)} bg-transparent border`}>
                            {getScoreBadge(auditResult.performanceScore)}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/30 border-gray-600/30">
                        <CardHeader className="text-center pb-4">
                          <Search className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                          <CardTitle className="text-purple-300">SEO</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(auditResult.seoScore)}`}>
                            {auditResult.seoScore}
                          </div>
                          <Progress value={auditResult.seoScore} className="mb-2" />
                          <Badge className={`${getScoreColor(auditResult.seoScore)} bg-transparent border`}>
                            {getScoreBadge(auditResult.seoScore)}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/30 border-gray-600/30">
                        <CardHeader className="text-center pb-4">
                          <Shield className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
                          <CardTitle className="text-cyan-300">SECURITY</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(auditResult.securityScore)}`}>
                            {auditResult.securityScore}
                          </div>
                          <Progress value={auditResult.securityScore} className="mb-2" />
                          <Badge className={`${getScoreColor(auditResult.securityScore)} bg-transparent border`}>
                            {getScoreBadge(auditResult.securityScore)}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/30 border-gray-600/30">
                        <CardHeader className="text-center pb-4">
                          <Smartphone className="w-8 h-8 text-green-300 mx-auto mb-2" />
                          <CardTitle className="text-green-300">MOBILE</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(auditResult.mobileScore)}`}>
                            {auditResult.mobileScore}
                          </div>
                          <Progress value={auditResult.mobileScore} className="mb-2" />
                          <Badge className={`${getScoreColor(auditResult.mobileScore)} bg-transparent border`}>
                            {getScoreBadge(auditResult.mobileScore)}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-800/30 border-gray-600/30">
                        <CardHeader className="text-center pb-4">
                          <Eye className="w-8 h-8 text-orange-300 mx-auto mb-2" />
                          <CardTitle className="text-orange-300">ACCESSIBILITY</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(auditResult.accessibilityScore)}`}>
                            {auditResult.accessibilityScore}
                          </div>
                          <Progress value={auditResult.accessibilityScore} className="mb-2" />
                          <Badge className={`${getScoreColor(auditResult.accessibilityScore)} bg-transparent border`}>
                            {getScoreBadge(auditResult.accessibilityScore)}
                          </Badge>
                        </CardContent>
                      </Card>

                      {auditResult.technicalScore && (
                        <Card className="bg-gray-800/30 border-gray-600/30">
                          <CardHeader className="text-center pb-4">
                            <div className="w-8 h-8 text-pink-300 mx-auto mb-2 flex items-center justify-center">⚡</div>
                            <CardTitle className="text-pink-300">TECHNICAL</CardTitle>
                          </CardHeader>
                          <CardContent className="text-center">
                            <div className={`text-3xl font-bold mb-2 ${getScoreColor(auditResult.technicalScore)}`}>
                              {auditResult.technicalScore}
                            </div>
                            <Progress value={auditResult.technicalScore} className="mb-2" />
                            <Badge className={`${getScoreColor(auditResult.technicalScore)} bg-transparent border`}>
                              {getScoreBadge(auditResult.technicalScore)}
                            </Badge>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Priority Recommendations */}
                    {auditResult.recommendations.priority && auditResult.recommendations.priority.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg text-red-400 mb-4">🚨 PRIORITY FIXES</h3>
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
                        { key: 'technical', title: 'TECHNICAL', icon: <div className="w-5 h-5 flex items-center justify-center text-pink-300">⚡</div>, color: 'pink-300' },
                        { key: 'content', title: 'CONTENT', icon: <div className="w-5 h-5 flex items-center justify-center text-blue-300">📝</div>, color: 'blue-300' }
                      ].filter(category => auditResult.recommendations[category.key] && auditResult.recommendations[category.key].length > 0).map((category) => (
                        <div key={category.key} className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-6">
                          <div className="flex items-center space-x-2 mb-4">
                            {category.icon}
                            <h4 className={`text-lg font-semibold text-${category.color}`}>{category.title}</h4>
                          </div>
                          <ul className="space-y-2">
                            {auditResult.recommendations[category.key].map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <ArrowRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

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
            </div>
          )}
        </div>
      </section>

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