import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import Neural3D from "@/components/ui/neural-3d";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <Neural3D intensity="subtle" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-2xl mx-auto">
        <Card className="backdrop-blur-sm bg-black/30 border border-cyan-500/30">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-6">
              <AlertCircle className="h-16 w-16 text-red-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 mb-4">
              404
            </h1>
            
            <h2 className="text-xl md:text-2xl text-white font-semibold mb-4">
              Page Not Found
            </h2>

            <p className="text-gray-300 mb-8 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link href="/home">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-3">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
