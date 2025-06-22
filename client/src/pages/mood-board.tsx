import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { moodBoardFormSchema } from "@shared/schema";
import { z } from "zod";
import { 
  Palette, 
  Eye, 
  Lightbulb, 
  Target, 
  Zap, 
  Download,
  Share2,
  Calendar,
  Save,
  Sparkles,
  Grid3X3,
  Image as ImageIcon,
  Type,
  Layout,
  Loader2
} from "lucide-react";
import Neural3D from "@/components/ui/neural-3d";

type MoodBoardData = z.infer<typeof moodBoardFormSchema>;

interface ColorPalette {
  name: string;
  colors: string[];
  description: string;
}

interface StyleElement {
  name: string;
  description: string;
  tags: string[];
}

export default function MoodBoard() {
  const [generatedBoard, setGeneratedBoard] = useState<any>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: MoodBoardData) => {
      const response = await fetch('/api/mood-board', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate mood board: ${errorText}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedBoard(data.moodBoard);
      toast({
        title: "Mood Board Generated!",
        description: "Your custom mood board has been created successfully.",
      });
    },
    onError: (error) => {
      console.error("Error generating mood board:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate mood board. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<MoodBoardData>({
    resolver: zodResolver(moodBoardFormSchema),
    defaultValues: {
      projectName: "",
      projectType: "",
      targetAudience: "",
      businessGoals: "",
      brandPersonality: [],
      colorPreferences: [],
      stylePreferences: [],
      inspirationDescription: "",
    },
  });

  const colorPalettes: ColorPalette[] = [
    {
      name: "Cyberpunk Neon",
      colors: ["#00FFFF", "#FF00FF", "#FFFF00", "#1A1A2E"],
      description: "Electric blues, magentas, and yellows with dark backgrounds"
    },
    {
      name: "Professional Blue",
      colors: ["#2563EB", "#1E40AF", "#3B82F6", "#F8FAFC"],
      description: "Trust-building blues with clean whites"
    },
    {
      name: "Organic Earth",
      colors: ["#059669", "#10B981", "#34D399", "#F3F4F6"],
      description: "Natural greens with neutral backgrounds"
    },
    {
      name: "Warm Sunset",
      colors: ["#F59E0B", "#EF4444", "#F97316", "#FEF3C7"],
      description: "Energetic oranges and reds with warm accents"
    },
    {
      name: "Monochrome Elite",
      colors: ["#000000", "#374151", "#9CA3AF", "#F9FAFB"],
      description: "Sophisticated grayscale palette"
    },
    {
      name: "Purple Luxury",
      colors: ["#7C3AED", "#A855F7", "#C084FC", "#FAF5FF"],
      description: "Premium purples with light backgrounds"
    }
  ];

  const brandPersonalities = [
    "Professional", "Creative", "Innovative", "Trustworthy", "Bold", 
    "Elegant", "Playful", "Authoritative", "Friendly", "Cutting-edge"
  ];

  const projectTypes = [
    "E-commerce Store", "Corporate Website", "Portfolio Site", "SaaS Platform",
    "Blog/Content Site", "Restaurant/Food", "Healthcare", "Education",
    "Real Estate", "Technology Startup", "Creative Agency", "Non-profit"
  ];

  const stylePreferences = [
    "Minimalist", "Modern", "Classic", "Futuristic", "Organic", "Industrial",
    "Luxury", "Playful", "Bold", "Subtle", "Dark Theme", "Light Theme"
  ];

  const onSubmit = (data: MoodBoardData) => {
    generateMutation.mutate(data);
  };

  const handleArrayFieldChange = (fieldName: keyof MoodBoardData, value: string, currentArray: string[]) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    form.setValue(fieldName, newArray);
  };

  return (
    <div className="min-h-screen bg-background neural-bg relative">
      <Neural3D intensity="subtle" />
      
      {/* Header */}
      <section className="pt-12 md:pt-24 pb-6 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">

          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight page-title">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">DESIGN</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">IDEAS</span>
          </h1>
          
          <p className="text-xl text-readable mb-12 max-w-3xl mx-auto leading-relaxed">
            See what your website could look like.
          </p>
        </div>
      </section>

      <div className="pb-8 md:pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {!generatedBoard ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Project Information */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-cyan-300 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Project Foundation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="projectName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your project name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="z-50 max-h-60 overflow-y-auto bg-black/90 border-gray-700">
                                {projectTypes.map((type) => (
                                  <SelectItem 
                                    key={type} 
                                    value={type}
                                    className="select-item-fluorescent"
                                  >
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Audience</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your target audience (age, interests, needs)" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessGoals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Goals</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What do you want to achieve with this website?" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Visual Preferences */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-purple-300 flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Visual Identity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Brand Personality</Label>
                        <div className="flex flex-wrap gap-2">
                          {brandPersonalities.map((personality) => (
                            <Badge
                              key={personality}
                              variant={form.watch("brandPersonality")?.includes(personality) ? "default" : "outline"}
                              className="cursor-pointer hover:bg-cyan-300/20"
                              onClick={() => handleArrayFieldChange("brandPersonality", personality, form.watch("brandPersonality") || [])}
                            >
                              {personality}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">Color Preferences</Label>
                        <div className="grid grid-cols-1 gap-3">
                          {colorPalettes.map((palette) => (
                            <div
                              key={palette.name}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                form.watch("colorPreferences")?.includes(palette.name)
                                  ? "border-cyan-300 bg-cyan-300/10"
                                  : "border-gray-600 hover:border-gray-500"
                              }`}
                              onClick={() => handleArrayFieldChange("colorPreferences", palette.name, form.watch("colorPreferences") || [])}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex gap-1">
                                  {palette.colors.map((color, index) => (
                                    <div
                                      key={index}
                                      className="w-4 h-4 rounded-full"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                                <span className="font-medium text-sm">{palette.name}</span>
                              </div>
                              <p className="text-xs text-gray-400">{palette.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">Style Preferences</Label>
                        <div className="flex flex-wrap gap-2">
                          {stylePreferences.map((style) => (
                            <Badge
                              key={style}
                              variant={form.watch("stylePreferences")?.includes(style) ? "default" : "outline"}
                              className="cursor-pointer hover:bg-purple-300/20"
                              onClick={() => handleArrayFieldChange("stylePreferences", style, form.watch("stylePreferences") || [])}
                            >
                              {style}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="inspirationDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Inspiration</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe any specific inspiration, websites you like, or unique requirements" 
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value || ""}
                                name={field.name}
                                ref={field.ref}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={generateMutation.isPending}
                    className="bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-yellow-600/20 border border-cyan-300/40 text-cyan-200 hover:border-cyan-300/80 hover:text-white px-12 py-4 text-lg font-semibold tracking-wide"
                  >
                    {generateMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Vision Board...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Generate Mood Board
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-8">
              {/* Generated Mood Board */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-cyan-300 mb-4">Your Vision Board</h2>
                <p className="text-readable">Project: {generatedBoard.projectName}</p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-cyan-300">Project Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-400">Type</p>
                            <p className="text-readable">{generatedBoard.projectType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Target Audience</p>
                            <p className="text-readable">{generatedBoard.targetAudience}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Goals</p>
                            <p className="text-readable">{generatedBoard.businessGoals}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-purple-300">Brand Personality</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {generatedBoard.brandPersonality.map((trait: string) => (
                            <Badge key={trait} className="bg-purple-300/20 text-purple-300">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedBoard.generatedBoard.colorPalettes.map((palette: ColorPalette, index: number) => (
                      <Card key={index} className="glass-card">
                        <CardHeader>
                          <CardTitle className="text-cyan-300">{palette.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Large color swatches */}
                            <div className="grid grid-cols-2 gap-3">
                              {palette.colors.map((color, colorIndex) => (
                                <div key={colorIndex} className="space-y-2">
                                  <div
                                    className="w-full h-20 rounded-xl shadow-lg border border-white/10 relative overflow-hidden"
                                    style={{ backgroundColor: color }}
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs font-mono text-gray-300">{color}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Color combination preview */}
                            <div className="border border-gray-600/30 rounded-lg p-4 space-y-3">
                              <h4 className="text-sm font-semibold text-gray-300">Visual Preview</h4>
                              <div 
                                className="rounded-lg p-4 text-center"
                                style={{ 
                                  backgroundColor: palette.colors[0],
                                  color: palette.colors[palette.colors.length - 1]
                                }}
                              >
                                <div className="text-lg font-bold mb-1">Your Brand</div>
                                <div className="text-sm opacity-80">How your colors work together</div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-readable">{palette.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="typography" className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-yellow-300 flex items-center gap-2">
                        <Type className="w-5 h-5" />
                        Typography System
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Typography examples */}
                        <div className="border border-yellow-300/20 rounded-lg p-6 space-y-4 bg-gradient-to-br from-yellow-300/5 to-transparent">
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Primary Font - Headlines</p>
                            <h1 className="text-4xl font-bold text-yellow-300 mb-2" style={{ fontFamily: generatedBoard.generatedBoard.typography.primary }}>
                              {generatedBoard.projectName}
                            </h1>
                            <p className="text-sm text-gray-500">{generatedBoard.generatedBoard.typography.primary}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Secondary Font - Body Text</p>
                            <p className="text-lg text-readable mb-2" style={{ fontFamily: generatedBoard.generatedBoard.typography.secondary }}>
                              Bringing your vision to life with custom design that reflects your brand's unique personality and connects with your target audience.
                            </p>
                            <p className="text-sm text-gray-500">{generatedBoard.generatedBoard.typography.secondary}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Accent Font - Special Elements</p>
                            <p className="text-xl font-semibold text-purple-300 mb-2" style={{ fontFamily: generatedBoard.generatedBoard.typography.accent }}>
                              Get Started Today
                            </p>
                            <p className="text-sm text-gray-500">{generatedBoard.generatedBoard.typography.accent}</p>
                          </div>
                        </div>
                        
                        {/* Typography harmony example */}
                        <div className="border border-gray-600/30 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-gray-300 mb-3">Typography in Action</h4>
                          <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: generatedBoard.generatedBoard.typography.primary }}>
                              Modern Design Solutions
                            </h2>
                            <p className="text-readable" style={{ fontFamily: generatedBoard.generatedBoard.typography.secondary }}>
                              Transform your digital presence with carefully crafted typography that enhances readability and brand recognition.
                            </p>
                            <div className="inline-block px-4 py-2 bg-cyan-600/20 border border-cyan-300/40 rounded-lg">
                              <span className="text-cyan-300 font-medium" style={{ fontFamily: generatedBoard.generatedBoard.typography.accent }}>
                                Learn More
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="layout" className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-green-300 flex items-center gap-2">
                        <Layout className="w-5 h-5" />
                        Layout & Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Layout Concepts</p>
                          <div className="space-y-3">
                            {generatedBoard.generatedBoard.layoutConcepts.map((concept: any, index: number) => (
                              <div key={index} className="border border-green-300/20 rounded-lg p-3">
                                <h4 className="text-green-300 font-medium mb-2">{concept.name}</h4>
                                <p className="text-readable text-sm">{concept.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {concept.features.map((feature: string, fIndex: number) => (
                                    <Badge key={fIndex} variant="outline" className="text-green-300 border-green-300/30 text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Inspiration Notes</p>
                          <p className="text-readable">{generatedBoard.generatedBoard.inspiration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Next Steps Section */}
              <Card className="glass-card border-2 border-yellow-300/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent">
                    Ready to Bring Your Vision to Life?
                  </CardTitle>
                  <p className="text-readable">Your custom mood board is just the beginning. Let's transform this vision into a powerful digital experience.</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="glass-card border border-cyan-300/20">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-cyan-300/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="font-semibold text-cyan-300 mb-2">Strategy Session</h3>
                        <p className="text-sm text-readable">Discuss your vision and define project scope</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="glass-card border border-purple-300/20">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-purple-300/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="font-semibold text-purple-300 mb-2">Custom Development</h3>
                        <p className="text-sm text-readable">Handcrafted code tailored to your brand</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="glass-card border border-yellow-300/20">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-yellow-300/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="font-semibold text-yellow-300 mb-2">Launch & Scale</h3>
                        <p className="text-sm text-readable">Deploy and optimize for growth</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      onClick={() => window.location.href = '/book-consultation'}
                      className="bg-gradient-to-r from-cyan-600/60 to-purple-600/60 border border-cyan-300/40 text-white hover:from-cyan-500/70 hover:to-purple-500/70 flex-1 sm:flex-none"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Strategy Session
                    </Button>
                    
                    <Button 
                      onClick={() => window.location.href = '/reserve-slot'}
                      className="bg-gradient-to-r from-purple-600/60 to-yellow-600/60 border border-purple-300/40 text-white hover:from-purple-500/70 hover:to-yellow-500/70 flex-1 sm:flex-none"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Reserve Project Slot
                    </Button>
                    
                    <Button
                      onClick={() => setGeneratedBoard(null)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800/50 flex-1 sm:flex-none"
                    >
                      Create New Board
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button className="bg-cyan-600/20 border border-cyan-300/40 text-cyan-200 hover:border-cyan-300/80">
                  <Save className="w-4 h-4 mr-2" />
                  Save Vision Board
                </Button>
                <Button className="bg-purple-600/20 border border-purple-300/40 text-purple-200 hover:border-purple-300/80">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Team
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}