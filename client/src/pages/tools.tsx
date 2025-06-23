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
      setIsAnalyzing(true);
      const response = await apiRequest("/api/audit", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: (data) => {
      setIsAnalyzing(false);
      setAuditResult(data.audit || data);
      toast({
        title: "Analysis Complete",
        description: "Google Lighthouse analysis completed successfully.",
      });
    },
    onError: (error: any) => {
      setIsAnalyzing(false);
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
      <Neural3D intensity="subtle" />
      
      {/* Header */}
      <section className="relative z-10 pt-20 md:pt-20 pb-6 md:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 page-title leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">WEBSITE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">CHECKER</span>
          </h1>
          <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            <span className="text-yellow-300 font-semibold">Already have a website?</span> Analyze your existing site's performance, SEO, and mobile optimization to identify improvement opportunities.
          </p>
        </div>
      </section>

      {/* Audit Form */}
      <section className="relative z-10 py-6 md:py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="text-lg md:text-2xl text-center text-cyan-300">
                CHECK YOUR WEBSITE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 md:space-y-6">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 md:p-6">
                  <div className="flex items-center justify-center mb-3 md:mb-4">
                    <Zap className="w-6 md:w-8 h-6 md:h-8 text-green-400 mr-2 md:mr-3" />
                    <h3 className="text-lg md:text-xl text-green-400 font-semibold">QUICK CHECK</h3>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base">
                    <span className="text-cyan-300 font-medium">For existing websites:</span> See how fast your site loads, how well it shows up in Google, and if it works on phones.
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

      {/* Loading Indicator */}
      {isAnalyzing && (
        <section className="relative z-10 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-sm bg-gray-900/50 border-cyan-500/30">
              <CardContent className="pt-8 pb-8">
                <div className="text-center">
                  {/* Animated Loading Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-cyan-500/20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
                      <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                    </div>
                  </div>
                  
                  {/* Loading Text */}
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 mb-4">
                    ANALYZING WEBSITE...
                  </h3>
                  
                  <p className="text-gray-300 mb-6 text-lg">
                    Checking your website with Google's tools to see how it's performing
                  </p>
                  
                  {/* Progress Steps */}
                  <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                      <h4 className="text-cyan-300 font-semibold text-sm">Speed Test</h4>
                      <p className="text-gray-400 text-xs mt-1">How fast your website loads</p>
                    </div>
                    
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      </div>
                      <h4 className="text-purple-300 font-semibold text-sm">Google Ranking</h4>
                      <p className="text-gray-400 text-xs mt-1">How well you show up in search</p>
                    </div>
                    
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      </div>
                      <h4 className="text-yellow-300 font-semibold text-sm">Mobile & Security</h4>
                      <p className="text-gray-400 text-xs mt-1">Phone compatibility and safety</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-sm text-gray-400">
                    <p>This usually takes 10-20 seconds. Please wait while we get real data from Google's testing tools.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

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
                {/* Google Lighthouse Results Header */}
                <div className="text-center backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-6">
                  <h3 className="text-xl text-gray-300 mb-4">YOUR WEBSITE REPORT</h3>
                  <p className="text-gray-400 text-sm">Powered by Google's website testing tools</p>
                </div>

                {/* Core Web Vitals */}
                {(auditResult as any).lighthouseData && (
                  <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 md:p-8">
                    <h3 className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6 text-center">SPEED METRICS</h3>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-cyan-300 mb-2">
                          {(auditResult as any).lighthouseData.fcp ? `${((auditResult as any).lighthouseData.fcp / 1000).toFixed(1)}s` : 'N/A'}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400 break-words">First Content Shows</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-purple-300 mb-2">
                          {(auditResult as any).lighthouseData.lcp ? `${((auditResult as any).lighthouseData.lcp / 1000).toFixed(1)}s` : 'N/A'}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400 break-words">Main Content Loads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-yellow-300 mb-2">
                          {(auditResult as any).lighthouseData.cls ? (auditResult as any).lighthouseData.cls.toFixed(3) : 'N/A'}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400 break-words">Page Stability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-green-300 mb-2">
                          {(auditResult as any).lighthouseData.tbt ? `${(auditResult as any).lighthouseData.tbt}ms` : 'N/A'}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400 break-words">Response Speed</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overall Score */}
                {auditResult.overallScore && (
                  <div className="text-center">
                    <div className="inline-block backdrop-blur-sm bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 md:p-8 w-full sm:w-auto">
                      <h3 className="text-lg md:text-xl text-gray-300 mb-3 md:mb-4">OVERALL WEBSITE SCORE</h3>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { label: "SPEED", mobileLabel: "SPEED", score: auditResult.performanceScore, icon: <Zap className="w-5 md:w-6 h-5 md:h-6" />, color: "cyan-300" },
                    { label: "GOOGLE RANKING", mobileLabel: "GOOGLE", score: auditResult.seoScore, icon: <Search className="w-5 md:w-6 h-5 md:h-6" />, color: "purple-300" },
                    { label: "SECURITY", mobileLabel: "SECURE", score: auditResult.securityScore, icon: <Shield className="w-5 md:w-6 h-5 md:h-6" />, color: "yellow-300" },
                    { label: "MOBILE FRIENDLY", mobileLabel: "MOBILE", score: auditResult.mobileScore, icon: <Smartphone className="w-5 md:w-6 h-5 md:h-6" />, color: "cyan-300" },
                    { label: "ACCESSIBILITY", mobileLabel: "ACCESS", score: auditResult.accessibilityScore, icon: <Eye className="w-5 md:w-6 h-5 md:h-6" />, color: "purple-300" },
                    ...(auditResult.technicalScore ? [{ label: "TECHNICAL", mobileLabel: "TECH", score: auditResult.technicalScore, icon: <Target className="w-5 md:w-6 h-5 md:h-6" />, color: "pink-300" }] : [])
                  ].map((metric, index) => (
                    <Card key={index} className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
                      <CardContent className="p-3 md:p-6 text-center">
                        <div className={`w-10 md:w-12 h-10 md:h-12 mx-auto mb-2 md:mb-4 bg-${metric.color}/20 border border-${metric.color}/30 rounded-lg flex items-center justify-center`}>
                          <div className={`text-${metric.color}`}>
                            {metric.icon}
                          </div>
                        </div>
                        <h3 className={`text-xs md:text-lg text-${metric.color} mb-2 font-semibold break-words leading-tight`}>
                          <span className="md:hidden">{metric.mobileLabel}</span>
                          <span className="hidden md:inline">{metric.label}</span>
                        </h3>
                        <div className={`text-xl md:text-3xl font-bold mb-2 ${getScoreColor(metric.score)}`}>
                          {metric.score}
                        </div>
                        <Progress value={metric.score} className="mb-2 h-2" />
                        <Badge className={`${getScoreColor(metric.score)} bg-transparent border text-xs`}>
                          {getScoreBadge(metric.score)}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Priority Recommendations */}
                {auditResult.recommendations.priority && auditResult.recommendations.priority.length > 0 && (
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-base md:text-lg text-red-400 mb-3 md:mb-4 flex items-center">
                      <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                      MOST IMPORTANT ISSUES
                    </h3>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 md:p-6">
                      <ul className="space-y-2 md:space-y-3">
                        {auditResult.recommendations.priority.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2 md:space-x-3">
                            <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm md:text-base leading-relaxed audit-text">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Detailed Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-fr">
                  {[
                    { key: 'performance', title: 'PERFORMANCE', mobileTitle: 'PERF', icon: <Zap className="w-4 md:w-5 h-4 md:h-5" />, color: 'yellow-300' },
                    { key: 'seo', title: 'SEO', mobileTitle: 'SEO', icon: <Search className="w-4 md:w-5 h-4 md:h-5" />, color: 'purple-300' },
                    { key: 'security', title: 'BEST PRACTICES', mobileTitle: 'PRACTICES', icon: <Shield className="w-4 md:w-5 h-4 md:h-5" />, color: 'cyan-300' },
                    { key: 'mobile', title: 'MOBILE', mobileTitle: 'MOBILE', icon: <Smartphone className="w-4 md:w-5 h-4 md:h-5" />, color: 'green-300' },
                    { key: 'accessibility', title: 'ACCESSIBILITY', mobileTitle: 'ACCESS', icon: <Eye className="w-4 md:w-5 h-4 md:h-5" />, color: 'orange-300' },
                    { key: 'technical', title: 'TECHNICAL', mobileTitle: 'TECH', icon: <Target className="w-4 md:w-5 h-4 md:h-5" />, color: 'pink-300' }
                  ].filter(category => {
                    const recs = auditResult.recommendations[category.key as keyof typeof auditResult.recommendations];
                    return Array.isArray(recs) && recs.length > 0;
                  }).map((category) => (
                    <div key={category.key} className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 md:p-6 min-w-0 overflow-hidden">
                      <div className="flex items-center space-x-2 mb-3 md:mb-4">
                        {category.icon}
                        <h4 className={`text-base md:text-lg font-semibold text-${category.color} break-words`}>
                          <span className="md:hidden">{category.mobileTitle}</span>
                          <span className="hidden md:inline">{category.title}</span>
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {(auditResult.recommendations[category.key as keyof typeof auditResult.recommendations] as string[])?.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ArrowRight className="w-3 md:w-4 h-3 md:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-xs md:text-sm leading-relaxed audit-text">{rec}</span>
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