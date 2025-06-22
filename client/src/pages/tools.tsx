import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Neural3D from "@/components/ui/neural-3d";
import { 
  Zap, 
  Search, 
  Shield, 
  Smartphone, 
  Eye, 
  AlertTriangle, 
  Target,
  TrendingUp
} from "lucide-react";

export default function Tools() {
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">PROFESSIONAL</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">WEBSITE</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">ANALYSIS</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Get a professional website evaluation from our development team. We'll provide you with a detailed analysis report within 24 hours.
          </p>
        </div>
      </section>

      {/* Analysis Request Form */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-cyan-300">
                REQUEST PROFESSIONAL ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-6">
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-yellow-400 mr-3" />
                    <h3 className="text-xl text-yellow-400 font-semibold">IMPORTANT NOTICE</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Our automated analysis tool has been temporarily disabled to ensure data accuracy. 
                    We believe in providing only the most reliable insights for our clients.
                  </p>
                  <p className="text-gray-300">
                    Instead, we offer personalized professional website evaluations conducted by our development team 
                    using industry-standard tools including Google Lighthouse, GTmetrix, and custom analysis methods.
                  </p>
                </div>

                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-6">
                  <h4 className="text-lg text-cyan-300 font-semibold mb-4">PROFESSIONAL ANALYSIS INCLUDES:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 text-yellow-300 mr-2" />
                        <span className="text-gray-300">Core Web Vitals Assessment</span>
                      </div>
                      <div className="flex items-center">
                        <Search className="w-4 h-4 text-purple-300 mr-2" />
                        <span className="text-gray-300">SEO Optimization Review</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-cyan-300 mr-2" />
                        <span className="text-gray-300">Security Vulnerability Scan</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 text-green-300 mr-2" />
                        <span className="text-gray-300">Mobile Responsiveness</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-orange-300 mr-2" />
                        <span className="text-gray-300">Accessibility Compliance</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 text-pink-300 mr-2" />
                        <span className="text-gray-300">Conversion Optimization</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3 text-lg font-semibold"
                    onClick={() => window.location.href = '/contact?service=analysis'}
                  >
                    REQUEST PROFESSIONAL ANALYSIS
                  </Button>
                  <p className="text-sm text-gray-400">
                    Detailed report delivered within 24 hours • No automated estimates • Real professional insights
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

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