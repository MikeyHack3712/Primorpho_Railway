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
      const response = await apiRequest('/api/mood-board', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedBoard(data.moodBoard.generatedBoard);
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
      <Neural3D />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-sm text-cyan-300 tracking-wider border border-cyan-300/30 px-6 py-2 rounded-md bg-cyan-300/5">
              NEURAL WEB SOLUTIONS
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">VISION</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">MOOD BOARD</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 animate-gradient">GENERATOR</span>
          </h1>
          
          <p className="text-xl text-readable mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into a visual blueprint. Create a comprehensive mood board that captures your vision and guides the development process.
          </p>
        </div>
      </section>

      <div className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {!generatedBoard ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                              <SelectContent>
                                {projectTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
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
                                {...field} 
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
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-yellow-600/20 border border-cyan-300/40 text-cyan-200 hover:border-cyan-300/80 hover:text-white px-12 py-4 text-lg font-semibold tracking-wide"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
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
                <p className="text-readable">Project: {generatedBoard.projectInfo.name}</p>
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
                            <p className="text-readable">{generatedBoard.projectInfo.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Target Audience</p>
                            <p className="text-readable">{generatedBoard.projectInfo.audience}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Goals</p>
                            <p className="text-readable">{generatedBoard.projectInfo.goals}</p>
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
                    {generatedBoard.colorPalettes.map((palette: ColorPalette, index: number) => (
                      <Card key={index} className="glass-card">
                        <CardHeader>
                          <CardTitle className="text-cyan-300">{palette.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {palette.colors.map((color, colorIndex) => (
                                <div key={colorIndex} className="flex-1">
                                  <div
                                    className="w-full h-16 rounded-lg mb-2"
                                    style={{ backgroundColor: color }}
                                  />
                                  <p className="text-xs text-center text-gray-400">{color}</p>
                                </div>
                              ))}
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
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Primary Font</p>
                          <p className="text-2xl text-readable" style={{ fontFamily: generatedBoard.typography.primary }}>
                            {generatedBoard.typography.primary}
                          </p>
                          <p className="text-sm text-gray-500">Headlines and important text</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Secondary Font</p>
                          <p className="text-xl text-readable" style={{ fontFamily: generatedBoard.typography.secondary }}>
                            {generatedBoard.typography.secondary}
                          </p>
                          <p className="text-sm text-gray-500">Body text and paragraphs</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Accent Font</p>
                          <p className="text-lg text-readable" style={{ fontFamily: generatedBoard.typography.accent }}>
                            {generatedBoard.typography.accent}
                          </p>
                          <p className="text-sm text-gray-500">Special elements and highlights</p>
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
                          <p className="text-sm text-gray-400 mb-2">Overall Structure</p>
                          <p className="text-readable">{generatedBoard.layoutStyle.structure}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Style Elements</p>
                          <div className="flex flex-wrap gap-2">
                            {generatedBoard.layoutStyle.elements.map((element: string) => (
                              <Badge key={element} variant="outline" className="text-green-300 border-green-300/30">
                                {element}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Inspiration Notes</p>
                          <p className="text-readable">{generatedBoard.inspiration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setGeneratedBoard(null)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Create New Board
                </Button>
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