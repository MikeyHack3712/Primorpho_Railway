import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, BarChart, CheckCircle, Clock, Search, Shield, Smartphone, TrendingUp } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditFormSchema } from "@shared/schema";
import type { z } from "zod";

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

export default function ToolsConservative() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const form = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      websiteUrl: ""
    }
  });

  const auditMutation = useMutation({
    mutationFn: async (data: AuditFormData) => {
      return await apiRequest("/api/audit", "POST", data);
    },
    onSuccess: (data) => {
      setAuditResult(data);
    },
    onError: (error) => {
      console.error("Audit failed:", error);
    }
  });

  const onSubmit = (data: AuditFormData) => {
    auditMutation.mutate(data);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-5 h-5" />;
    if (score >= 70) return <Clock className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      {/* Header Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <BarChart className="w-4 h-4 mr-2" />
            Free Website Analysis
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Website Performance Audit
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Get a comprehensive analysis of your website's performance, SEO, security, and mobile responsiveness. 
            Identify areas for improvement with actionable recommendations.
          </p>
        </div>
      </section>

      {/* Audit Tool */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Free Audit</h2>
              <p className="text-gray-600">
                Enter your website URL below to receive a detailed performance analysis within seconds.
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="websiteUrl" className="text-sm font-medium text-gray-700 mb-2 block">
                  Website URL
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="websiteUrl"
                    type="url"
                    {...form.register("websiteUrl")}
                    placeholder="Enter your website URL (e.g., example.com)"
                    className="pl-10 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {form.formState.errors.websiteUrl && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.websiteUrl.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={auditMutation.isPending}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
              >
                {auditMutation.isPending ? (
                  <>
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Website...
                  </>
                ) : (
                  <>
                    <BarChart className="w-5 h-5 mr-2" />
                    Run Free Audit
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Audit Results */}
      {auditResult && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Audit Results</h2>
              <p className="text-xl text-gray-600">
                Analysis for <span className="font-semibold text-blue-600">{auditResult.websiteUrl}</span>
              </p>
            </div>

            {auditResult.recommendations.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-800 mb-2">Analysis Error</h3>
                <p className="text-red-600">{auditResult.recommendations.error}</p>
                {auditResult.recommendations.suggestions && (
                  <ul className="mt-4 text-left text-red-600 space-y-1">
                    {auditResult.recommendations.suggestions.map((suggestion, index) => (
                      <li key={index}>• {suggestion}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <>
                {/* Score Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreColor(auditResult.performanceScore)}`}>
                        {getScoreIcon(auditResult.performanceScore)}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{auditResult.performanceScore}</div>
                      <div className="text-sm text-gray-600 font-medium">Performance</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreColor(auditResult.seoScore)}`}>
                        {getScoreIcon(auditResult.seoScore)}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{auditResult.seoScore}</div>
                      <div className="text-sm text-gray-600 font-medium">SEO</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreColor(auditResult.securityScore)}`}>
                        {getScoreIcon(auditResult.securityScore)}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{auditResult.securityScore}</div>
                      <div className="text-sm text-gray-600 font-medium">Security</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreColor(auditResult.mobileScore)}`}>
                        {getScoreIcon(auditResult.mobileScore)}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{auditResult.mobileScore}</div>
                      <div className="text-sm text-gray-600 font-medium">Mobile</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${getScoreColor(auditResult.accessibilityScore)}`}>
                        {getScoreIcon(auditResult.accessibilityScore)}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{auditResult.accessibilityScore}</div>
                      <div className="text-sm text-gray-600 font-medium">Accessibility</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {auditResult.recommendations.performance && auditResult.recommendations.performance.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-blue-600">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Performance Improvements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.performance.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {auditResult.recommendations.seo && auditResult.recommendations.seo.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-600">
                          <Search className="w-5 h-5 mr-2" />
                          SEO Enhancements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.seo.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {auditResult.recommendations.security && auditResult.recommendations.security.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-red-600">
                          <Shield className="w-5 h-5 mr-2" />
                          Security Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.security.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {auditResult.recommendations.mobile && auditResult.recommendations.mobile.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-purple-600">
                          <Smartphone className="w-5 h-5 mr-2" />
                          Mobile Optimization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {auditResult.recommendations.mobile.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Analyze</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive audit tool evaluates multiple aspects of your website's health and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Analysis</h3>
              <p className="text-gray-600">
                Page load speed, Core Web Vitals, and optimization opportunities for better user experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SEO Assessment</h3>
              <p className="text-gray-600">
                Meta tags, headers, content structure, and technical SEO factors affecting search rankings.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Check</h3>
              <p className="text-gray-600">
                SSL certificates, security headers, and vulnerability assessment for protected browsing.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Responsiveness</h3>
              <p className="text-gray-600">
                Mobile optimization, touch targets, and responsive design evaluation across devices.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility Review</h3>
              <p className="text-gray-600">
                WCAG compliance, keyboard navigation, and inclusive design practices assessment.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-gray-600">
                Prioritized recommendations with clear next steps to improve your website's performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Website?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get professional help implementing the recommendations from your audit and take your website to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white px-8 py-4 text-lg font-semibold">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-500 px-8 py-4 text-lg font-semibold">
              View Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}